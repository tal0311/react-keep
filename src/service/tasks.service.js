import { asyncService } from './async.service'
import axios from 'axios'
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

var gTasks = [
  {
    _id: 't101',
    createdAt: 1650624148214,
    type: 'txt',
    content:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro molestias eaque magnam omnis facilis officiis suscipit, deserunt voluptatum sapiente? Quas animi deserunt quam quasi, asperiores sequi voluptatem suscipit dolor.',
  },
  {
    _id: 't102',
    createdAt: 1650624148214,
    type: 'txt',
    content:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro molestias eaque magnam omnis facilis officiis suscipit, deserunt voluptatum sapiente? Quas animi deserunt quam quasi, asperiores sequi voluptatem suscipit dolor.',
  },
  {
    _id: 't103',
    createdAt: 1650624148214,
    type: 'txt',
    content:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro molestias eaque magnam omnis facilis officiis suscipit, deserunt voluptatum sapiente? Quas animi deserunt quam quasi, asperiores sequi voluptatem suscipit dolor.',
  },
]

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
    color: '#e8525293',
    createdAt: Date.now(),
    isPinned: false,
  }
}
