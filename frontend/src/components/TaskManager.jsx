import { useEffect, useState } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask } from '../api/tasks'
import './TaskManager.css'

const emptyForm = { title: '', description: '', due_date: '' }

function formatDate(dateString) {
  if (!dateString) return '-'
  return dateString.substring(0, 10)
}

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadTasks() {
    const data = await fetchTasks()
    setTasks(data)
    setLoading(false)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function startEdit(task) {
    setEditingId(task.id)
    setForm({
      title: task.title,
      description: task.description ?? '',
      due_date: formatDate(task.due_date) === '-' ? '' : formatDate(task.due_date),
    })
    setErrors(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
    setErrors(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrors(null)

    const payload = {
      title: form.title,
      description: form.description || null,
      due_date: form.due_date || null,
    }

    try {
      if (editingId) {
        await updateTask(editingId, payload)
      } else {
        await createTask(payload)
      }
      cancelEdit()
      await loadTasks()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors)
      } else {
        throw error
      }
    }
  }

  async function handleToggleDone(task) {
    await updateTask(task.id, { is_done: !task.is_done })
    await loadTasks()
  }

  async function handleDelete(id) {
    if (!confirm('削除しますか？')) return
    await deleteTask(id)
    await loadTasks()
  }

  return (
    <div className="task-manager">
      <h1>タスク一覧(React版)</h1>
      <p className="task-manager__hint">
        このページはReactからLaravelの <code>/api/tasks</code> を叩いてCRUDを行います。
      </p>

      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'タスクを編集' : '新規タスク作成'}</h2>

        <label htmlFor="title">タイトル</label>
        <input id="title" name="title" type="text" value={form.title} onChange={handleChange} required />

        <label htmlFor="description">詳細</label>
        <textarea id="description" name="description" rows={3} value={form.description} onChange={handleChange} />

        <label htmlFor="due_date">期限</label>
        <input id="due_date" name="due_date" type="date" value={form.due_date} onChange={handleChange} />

        {errors && (
          <div className="task-form__errors">
            <ul>
              {Object.values(errors)
                .flat()
                .map((message) => (
                  <li key={message}>{message}</li>
                ))}
            </ul>
          </div>
        )}

        <div className="task-form__actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? '保存' : '作成'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
              キャンセル
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>読み込み中...</p>
      ) : tasks.length === 0 ? (
        <p>タスクはまだありません。</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>完了</th>
              <th>タイトル</th>
              <th>期限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <input type="checkbox" checked={task.is_done} onChange={() => handleToggleDone(task)} />
                </td>
                <td className={task.is_done ? 'task-table__done' : ''}>{task.title}</td>
                <td>{formatDate(task.due_date)}</td>
                <td>
                  <div className="task-table__actions">
                    <button type="button" className="btn btn-secondary" onClick={() => startEdit(task)}>
                      編集
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
