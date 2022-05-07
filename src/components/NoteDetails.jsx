import React, { useEffect, useState } from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'

import {
  removeNote,
  duplicateNote,
  updateNote,
  getNoteDetails,
  editNoteDetails,
} from '../store/actions/tasksActions'

// COMPONENTS
import { ColorList } from './ColorList'

export const NoteDetails = (props) => {
  const [isEditable, setIsEditable] = useState(false)
  const [note, setNote] = useState({ title: '', content: '' })
  const dispatch = useDispatch()
  const currNote = useSelector((state) => state.tasksModule.currNote)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { title, type, content, color, craetedAt, isPinned } = currNote
  const { _id } = props.match.params

  const remove = (noteId) => {
    try {
      dispatch(removeNote(noteId))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(note)
    if (!note.title && !note.content) return
    dispatch(editNoteDetails(note))
  }, [note])
  const pin = (noteId) => {
    console.log(noteId)
    dispatch(updateNote('pin', noteId))
  }
  const duplicate = (noteId) => {
    try {
      dispatch(duplicateNote(noteId))
    } catch (error) {
      console.log(error)
    }
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const back = () => {
    dispatch(getNoteDetails(null))
  }
  const editNote = (ev) => {
    if (ev.target.nodeName === 'H2') {
      const title = ev.target.innerText

      setNote((note) => ({ ...note, title }))
    }
    if (ev.target.nodeName === 'P') {
      const content = ev.target.innerText
      setNote((note) => ({ ...note, content }))
      dispatch(editNoteDetails(note))
    }
  }
  const toggleCheckBox = () => {}

  if (!currNote) return <h1>Loading note...</h1>

  return (
    <>
      {currNote && (
        <section
          className='note-details flex'
          style={{ backgroundColor: color }}
        >
          <h2 contentEditable={isEditable} onBlur={(ev) => editNote(ev)}>
            {currNote.title}
          </h2>
          {type === 'list' &&
            content.split(',').map((item, idx) => {
              return (
                <section
                  suppressContentEditableWarning={true}
                  className='content list flex'
                  key={idx}
                >
                  <label
                    onClick={(ev) => toggleCheckBox(ev, idx)}
                    htmlFor='task'
                  >
                    <input type='checkbox' name='task' id='task' />
                    {item}
                  </label>
                </section>
              )
            })}
          {type === 'txt' && (
            <p
              className='content'
              contentEditable={isEditable}
              onBlur={(ev) => editNote(ev)}
            >
              {content}
            </p>
          )}
          {type === 'img' && (
            <img className='content' src={content} alt={title} />
          )}

          <div className='actions-container'>
            <button
              className={
                isPinned ? 'fa-solid fa-xmark' : 'fa-solid fa-bookmark'
              }
              onClick={() => pin(_id)}
            ></button>
            <button onClick={() => remove(_id)}>
              <i className='fa-solid fa-trash-can'></i>
            </button>
            <button onClick={() => toggleModal()}>
              <i className='fa-solid fa-palette'></i>
            </button>
            <button onClick={() => duplicate(_id)}>
              <i className='fa-solid fa-clone'></i>
            </button>
            <button onClick={() => setIsEditable(!isEditable)}>
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
            <button onClick={back}>close</button>
          </div>
          {isModalOpen && <ColorList toggleModal={toggleModal} noteId={_id} />}
        </section>
      )}
    </>
  )
}
