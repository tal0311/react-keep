import { useEffect, useState } from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import {
  loadNotes,
  addNewNote,
  removeNote,
  duplicateNote,
} from '../store/actions/tasksActions'
// COMPONENTS
import { TaskList } from '../components/TaskList'
import { AddTask } from '../components/AddTask'

export const Tasks = () => {
  const dispatch = useDispatch()
  // states
  const [pinned, setPinned] = useState(null)
  const [unPinned, setUnpinned] = useState(null)
  const [value, setValue] = useState({ type: 'txt', content: '' })
  const { notes } = useSelector((state) => state.tasksModule)

  useEffect(() => {
    dispatch(loadNotes())
  }, [])

  useEffect(() => {
    if (notes) {
      const pinned = notes.filter((note) => note.isPinned)
      console.log('notes updated');
      setPinned([...pinned])
    }
  }, [notes])

  useEffect(() => {
    if (notes) {
      const unPinned = notes.filter((note) => !note.isPinned)
      setUnpinned([...unPinned])
    }
  }, [notes])

  useEffect(() => {}, [value])
  const onChangeType = ({ target }) => {
    const type = target.name
    setValue({ ...value, type })
  }

  const handleChange = ({ target }) => {
    const content = target.value
    setValue({ ...value, content })
  }
  const addNote = () => {
    if (value.type && value.content) {
      try {
        dispatch(addNewNote(value))
        dispatch(loadNotes())
      } catch (error) {
        console.log(error)
      }
    }
  }

  const remove = (noteId) => {
    try {
      dispatch(removeNote(noteId))
      dispatch(loadNotes())
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
          <TaskList notes={pinned} remove={remove} duplicate={duplicate} />
        )}
      </section>
      <section className='all-tasks'>
        {unPinned && (
          <TaskList notes={unPinned} remove={remove} duplicate={duplicate} />
        )}
      </section>
    </>
  )
}
