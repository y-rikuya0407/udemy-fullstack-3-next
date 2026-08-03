import './bootstrap';

const API_BASE = '/api/tasks';

const taskApp = document.getElementById('task-app');
const taskForm = document.getElementById('task-form');
const formHeading = document.getElementById('form-heading');
const formSubmit = document.getElementById('form-submit');
const formCancel = document.getElementById('form-cancel');
const formErrors = document.getElementById('form-errors');

let currentTasks = [];
let editingTaskId = null;

function formatDate(dateString) {
    if (!dateString) return '-';
    return dateString.substring(0, 10);
}

function showFormErrors(errors) {
    const messages = Object.values(errors).flat();
    formErrors.innerHTML = `<ul style="margin:0; padding-left: 18px;">${messages
        .map((message) => `<li>${message}</li>`)
        .join('')}</ul>`;
    formErrors.style.display = 'block';
}

function hideFormErrors() {
    formErrors.style.display = 'none';
    formErrors.innerHTML = '';
}

function startEdit(id) {
    const task = currentTasks.find((t) => String(t.id) === String(id));
    if (!task) return;

    editingTaskId = task.id;
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description ?? '';
    document.getElementById('due_date').value = formatDate(task.due_date) === '-' ? '' : formatDate(task.due_date);

    formHeading.textContent = 'タスクを編集';
    formSubmit.textContent = '保存';
    formCancel.style.display = 'inline-block';
    hideFormErrors();
    taskForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
    editingTaskId = null;
    taskForm.reset();
    formHeading.textContent = '新規タスク作成';
    formSubmit.textContent = '作成';
    formCancel.style.display = 'none';
    hideFormErrors();
}

function renderTasks(tasks) {
    currentTasks = tasks;

    if (tasks.length === 0) {
        taskApp.innerHTML = '<p>タスクはまだありません。</p>';
        return;
    }

    const rows = tasks
        .map(
            (task) => `
        <tr>
            <td>
                <input type="checkbox" data-action="toggle" data-id="${task.id}" ${task.is_done ? 'checked' : ''}>
            </td>
            <td class="${task.is_done ? 'done' : ''}">${task.title}</td>
            <td>${formatDate(task.due_date)}</td>
            <td>
                <div class="actions">
                    <button type="button" class="btn btn-secondary" data-action="edit" data-id="${task.id}">編集</button>
                    <button type="button" class="btn btn-danger" data-action="delete" data-id="${task.id}">削除</button>
                </div>
            </td>
        </tr>
    `
        )
        .join('');

    taskApp.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>完了</th>
                    <th>タイトル</th>
                    <th>期限</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

async function fetchTasks() {
    const { data } = await axios.get(API_BASE);
    renderTasks(data);
}

async function createTask(payload) {
    await axios.post(API_BASE, payload);
    await fetchTasks();
}

async function saveTask(id, payload) {
    await axios.put(`${API_BASE}/${id}`, payload);
    await fetchTasks();
}

async function toggleDone(id, isDone) {
    await axios.put(`${API_BASE}/${id}`, { is_done: isDone });
    await fetchTasks();
}

async function deleteTask(id) {
    await axios.delete(`${API_BASE}/${id}`);
    await fetchTasks();
}

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideFormErrors();

    const payload = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        due_date: document.getElementById('due_date').value || null,
    };

    try {
        if (editingTaskId) {
            await saveTask(editingTaskId, payload);
        } else {
            await createTask(payload);
        }
        cancelEdit();
    } catch (error) {
        if (error.response && error.response.status === 422) {
            showFormErrors(error.response.data.errors);
        } else {
            throw error;
        }
    }
});

formCancel.addEventListener('click', () => {
    cancelEdit();
});

taskApp.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.dataset.action === 'delete') {
        if (confirm('削除しますか？')) {
            await deleteTask(target.dataset.id);
        }
    }
    if (target.dataset.action === 'edit') {
        startEdit(target.dataset.id);
    }
});

taskApp.addEventListener('change', async (event) => {
    const target = event.target;
    if (target.dataset.action === 'toggle') {
        await toggleDone(target.dataset.id, target.checked);
    }
});

fetchTasks();
