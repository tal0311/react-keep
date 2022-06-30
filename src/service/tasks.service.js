import { asyncService } from './async.service'
import { utilService } from './util.service'
// import axios from 'axios'
console.log('task service')

const KEY = 'tasks'
// const TASK_URL = 'http://127.0.0.1:3030/api/task/'
const TASK_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/task'
    : '//localhost:3030/api/task/'
export const taskService = {
  query,
  getById,
  remove,
  save,
  getEmptyTask,
  duplicate,
}
createTasks()

async function query() {
  try {
    // const tasks = await axios.get(TASK_URL, { params: filterValue })
    // return tasks.data

    const tasks = await asyncService.query(KEY)
    return tasks
  } catch (error) {
    throw new Error('error on quey FE', error)
  }
}

async function getById(id) {
  try {
    // return await axios.get(TASK_URL + id).then((res) => res.data)
    console.log(id)
    const note = await asyncService.get('tasks', id)
    return note
  } catch (error) {
    throw new Error('error on getById FE', error)
  }
}

async function remove(id) {
  try {
    // return await axios.delete(`${TASK_URL}${id}/`)

    await asyncService.remove('tasks', id)
  } catch (error) {
    throw new Error('error on remove Fe', error)
  }
}

async function save(note) {
  try {
    if (note._id) {
      // return await axios.put(`${TASK_URL}`, task)
      const updated = await asyncService.put('tasks', note)
      console.log('update color:', updated)
      return updated
    }

    const newNote = await asyncService.post('tasks', note)
    return newNote
    // const addedTask = await axios.post(`${TASK_URL}`, { ...task })
    // const addedTask = await axios.post(`${TASK_URL}`, task)
    // return addedTask.data
  } catch (error) {
    throw new Error('error on save fe', error)
  }
}

async function duplicate(noteId) {
  try {
    console.log('service dup:', noteId)
    const note = await getById(noteId)
    JSON.parse(JSON.stringify(note))
    delete note._id
    const duplicated = await save(note)
    return duplicated
  } catch (error) {
    console.log('can not duplicate note:', error)
  }
}

function getEmptyTask(type, content, title = 'New task') {
  return {
    _id: '',
    type,
    content,
    title,
    color: '#fff',
    createdAt: Date.now(),
    isPinned: false,
  }
}

async function createTasks() {
  try {
    const tasks = await query()
    console.log(tasks)
    if (!tasks || !tasks.length) {
      console.log('crating tasks')
      const tasks = []
      tasks.push(
        createTask(
          'img',
          'my waterfall',
          'https://images.unsplash.com/photo-1656376406178-9b74c689bdad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        )
      )
      tasks.push(createTask('txt', 'new task', 'lorem lorem lorem'))
      tasks.push(createTask('txt', 'new task', 'lorem lorem lorem'))
      tasks.push(createTask('txt', 'new task', 'lorem lorem lorem'))
      tasks.push(createTask('list', 'new task', 'lorem, lorem, lorem'))
      tasks.push(
        createTask(
          'img',
          'Photo of the day',
          'https://images.unsplash.com/photo-1656473031961-9d5d9ee19f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        )
      )
      tasks.push(createTask('txt', 'new task', 'lorem lorem lorem'))
      tasks.push(createTask('txt', 'new task', 'lorem lorem lorem'))
      _save(KEY, tasks)
    }
    return tasks
  } catch (error) {
    console.log('failed to create tasks', error)
  }
}

function createTask(type, title, content) {
  return {
    _id: utilService.makeId(),
    createdAt: Date.now(),
    type,
    content,
    title,
    color: '#fff',
    isPinned: false,
  }
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}
