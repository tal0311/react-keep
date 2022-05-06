import { taskService } from './../../service/tasks.service'

export function loadNotes() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().tasksModule

      const notes = await taskService.query()
      dispatch({ type: 'LOAD_NOTES', notes })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
export function addNewNote(value) {
  return async (dispatch) => {
    console.log(value)
    try {
      const emptyNote = taskService.getEmptyTask(value.type, value.content)
      const note = await taskService.save(emptyNote)
      console.log('tasks:', note)
      dispatch({ type: 'ADD_NOTE', note })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeNote(noteId) {
  return async (dispatch) => {
    try {
      await taskService.remove(noteId)
      dispatch({ type: 'REMOVE_NOTE', noteId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

// TODO: refactor to switch case
export function updateNote(value, noteId) {
  return async (dispatch) => {
    try {
      if (value.startsWith('#')) {
        const note = await taskService.getById(noteId)
        console.log('note:', note)
        if (note) {
          note.color = value
          const updated = await taskService.save(note)
          dispatch({ type: 'UPDATE_NOTE', updated })
        }
      }
      if (value === 'pin') {
        console.log('pin note')
        const note = await taskService.getById(noteId)
        note.isPinned = !note.isPinned
        const updated = await taskService.save(note)
        dispatch({ type: 'UPDATE_NOTE', updated })
      }
    } catch (err) {
      console.log('err:', err)
    }
  }
}
export function getNoteDetails(noteId) {
  return async (dispatch) => {
    try {
      const note = await taskService.getById(noteId)
      dispatch({ type: 'SET_CURR_NOTE', note })
    } catch (error) {
      console.log(error)
    }
  }
}
export function duplicateNote(noteId) {
  return async (dispatch) => {
    try {
      console.log('action dup note:', noteId)
      const note = await taskService.duplicate(noteId)
      dispatch({ type: 'ADD_NOTE', note })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
