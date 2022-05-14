import { taskService } from './../../service/tasks.service'

export function loadNotes() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().tasksModule
      const userMsg = _userSuccess('Notes loaded')
      dispatch({ type: 'SET_USER_MSG', userMsg })
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
      const userMsg = _userSuccess('Note Added')
      dispatch({ type: 'SET_USER_MSG', userMsg })
      dispatch({ type: 'ADD_NOTE', note })
    } catch (err) {
      console.log('err:', err)
      const userMsg = _userError('Try again later')
      dispatch({ type: 'SET_USER_MSG', userMsg })
    }
  }
}

export function removeNote(noteId) {
  return async (dispatch) => {
    try {
      await taskService.remove(noteId)
      dispatch({ type: 'REMOVE_NOTE', noteId })

      const userMsg = _userError('Note Removed')
      dispatch({ type: 'SET_USER_MSG', userMsg })
      dispatch({ type: 'SET_USER_MSG', userMsg })
    } catch (err) {
      console.log('err:', err)
      const userMsg = _userError('Try again later')
      dispatch({ type: 'SET_USER_MSG', userMsg })
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

          const userMsg = _userSuccess('Note color changed')
          dispatch({ type: 'SET_USER_MSG', userMsg })
          dispatch({ type: 'UPDATE_NOTE', updated })
        }
      }
      if (value === 'pin') {
        console.log('pin note')
        const note = await taskService.getById(noteId)
        note.isPinned = !note.isPinned
        const updated = await taskService.save(note)

        const msg = updated.isPinned ? 'Note pinned' : 'Note unpinned'
        const userMsg = _userSuccess(msg)
        dispatch({ type: 'SET_USER_MSG', userMsg })
        dispatch({ type: 'UPDATE_NOTE', updated })
      }
    } catch (err) {
      console.log('err:', err)
      const userMsg = _userError('Try again later')
      dispatch({ type: 'SET_USER_MSG', userMsg })
    }
  }
}

export function editNoteDetails(edited, noteId) {
  return async (dispatch, getState) => {
    try {
      const { currNote } = getState().tasksModule
      console.log(edited, currNote._id)
      const note = await taskService.getById(currNote._id)
      note.title = edited.title ? edited.title : note.title
      note.content = edited.content ? edited.content : note.content
      taskService.save(note)
      dispatch({ type: 'EDIT_NOTE', note })
    } catch (error) {
      console.log(error)
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
      const userMsg = _userError('Try again later')
      dispatch({ type: 'SET_USER_MSG', userMsg })
    }
  }
}
export function duplicateNote(noteId) {
  return async (dispatch) => {
    try {
      const note = await taskService.duplicate(noteId)
      const userMsg = _userSuccess('Note duplicated')
      dispatch({ type: 'SET_USER_MSG', userMsg })
      dispatch({ type: 'ADD_NOTE', note })
    } catch (err) {
      console.log('err:', err)
      const userMsg = _userError('Try again later')
      dispatch({ type: 'SET_USER_MSG', userMsg })
    }
  }
}
export function setUserMsg(msg, type) {
  return async (dispatch) => {
    try {
      console.log(msg, type)
      const userMsg = { msg, type }
      dispatch({ type: 'SET_USER_MSG', userMsg })
    } catch (err) {
      console.log('err:', err)
      const userMsg = _userError('something went wrong')
      dispatch({ type: 'SET_USER_MSG', userMsg })
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

function _userSuccess(msg) {
  return {
    msg,
    type: 'success',
  }
}
function _userError(msg) {
  return {
    msg,
    type: 'danger',
  }
}
