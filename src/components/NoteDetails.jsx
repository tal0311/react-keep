import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskService } from '../service/tasks.service'
import { getNoteDetails } from '../store/actions/tasksActions'

export const NoteDetails = (props) => {
  const dispatch = useDispatch()
  const [note, setNote] = useState(null)

  const { _id } = props.match.params

  useEffect(() => {
    console.log(_id)
    loadNote(_id)
  }, [])

  useEffect(() => {
    if (!note) return
    dispatch(getNoteDetails(note))
  }, [note])

  const loadNote = async (noteId) => {
    try {
      const note = await taskService.getById(noteId)
      setNote(note)
    } catch (error) {}
  }

  if (!note) return <h1>Loading note...</h1>
  return (
    <>
      {note && (
        <section className='note-details'>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </section>
      )}
    </>
  )
}
