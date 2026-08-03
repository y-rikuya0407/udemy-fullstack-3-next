import client from './client'

export function fetchTasks() {
  return client.get('/tasks').then((res) => res.data)
}

export function createTask(payload) {
  return client.post('/tasks', payload).then((res) => res.data)
}

export function updateTask(id, payload) {
  return client.put(`/tasks/${id}`, payload).then((res) => res.data)
}

export function deleteTask(id) {
  return client.delete(`/tasks/${id}`)
}
