import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import {
  loadNotes,
  addNewNote,
  removeNote,
  duplicateNote,
  updateNote,
  getNoteDetails,
  setUserMsg,
} from '../store/actions/tasksActions'
// COMPONENTS
import { TaskList } from '../components/TaskList'
import { AddTask } from '../components/AddTask'
import { NoteDetails } from '../components/NoteDetails'
import { UserMsg } from '../components/UserMsg'

export const Tasks = () => {
  const dispatch = useDispatch()
  // states
  const [pinned, setPinned] = useState(null)
  const [unPinned, setUnpinned] = useState(null)
  const [value, setValue] = useState({ type: 'txt', content: '' })
  const { notes, currNote } = useSelector((state) => state.tasksModule)

  useEffect(() => {
    dispatch(loadNotes())
  }, [currNote])

  // filter notes
  useEffect(() => {
    if (notes) {
      const pinned = notes.filter((note) => note.isPinned)
      setPinned([...pinned])
    }
  }, [notes])

  useEffect(() => {
    if (notes) {
      const unPinned = notes.filter((note) => !note.isPinned)
      setUnpinned([...unPinned])
    }
  }, [notes])

  // CRUD LOGIC
  const onChangeType = ({ target }) => {
    const type = target.name
    console.log(type)
    setValue((prevState) => ({ ...prevState.value, type: type }))
  }

  const handleChange = ({ target }) => {
    const content = target.value
    setValue({ ...value, content })
  }
  const addNote = () => {
    if (value.type && value.content) {
      try {
        dispatch(addNewNote(value))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const remove = (noteId) => {
    try {
      dispatch(removeNote(noteId))
    } catch (error) {
      console.log(error)
    }
  }
  const duplicate = (noteId) => {
    try {
      dispatch(duplicateNote(noteId))
    } catch (error) {
      console.log(error)
    }
  }
  const pin = (noteId) => {
    console.log(noteId)
    dispatch(updateNote('pin', noteId))
  }
  const toggleCheckBox = (ev, idx) => {
    ev.stopPropagation()
    console.log(idx)
  }
  const noteDetails = (noteId) => {
    dispatch(getNoteDetails(noteId))
  }

  if (!notes) return <h1>Loading...</h1>

  return (
    <>
      <AddTask
        handleChange={handleChange}
        onChangeType={onChangeType}
        addNote={addNote}
      />
      <section className='pinned-tasks'>
        {pinned && (
          <TaskList
            notes={pinned}
            remove={remove}
            duplicate={duplicate}
            pin={pin}
            toggleCheckBox={toggleCheckBox}
            noteDetails={noteDetails}
          />
        )}
      </section>
      <section className='all-tasks'>
        {unPinned && (
          <TaskList
            notes={unPinned}
            remove={remove}
            duplicate={duplicate}
            pin={pin}
            toggleCheckBox={toggleCheckBox}
            noteDetails={noteDetails}
          />
        )}
      </section>
      {currNote && (
        <section>
          <Route path='/note/:_id' component={NoteDetails} />
        </section>
      )}
      <UserMsg />
    </>
  )
}
