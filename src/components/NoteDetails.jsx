import React, { useEffect, useState } from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getNoteDetails } from '../store/actions/tasksActions'
// SERVICE
import { taskService } from '../service/tasks.service'
// COMPONENTS
import { ColorList } from './ColorList'

export const NoteDetails = (props) => {
  const dispatch = useDispatch()
  const currNote = useSelector((state) => state.tasksModule.currNote)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { title, type, content, color, craetedAt, isPinned } = currNote
  const { _id } = props.match.params


  const remove = () => {}
  const pin = () => {}
  const duplicate = () => {}
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const back = () => {
    dispatch(getNoteDetails(null))
  }
  const toggleCheckBox = () => {}

  if (!currNote) return <h1>Loading note...</h1>

  return (
    <>
      {currNote && (
        <section className='note-details flex' style={{ backgroundColor: color }}>
          <h2>{currNote.title}</h2>
          {type === 'list' &&
            content.split(',').map((item, idx) => {
              return (
                <section className='content list flex' key={idx}>
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
          {type === 'txt' && <p className='content' >{content}</p>}
          {type === 'img' && <img className='content' src={content} alt={title} />}

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
            <button onClick={back}>close</button>
          </div>
          {isModalOpen && <ColorList toggleModal={toggleModal} noteId={_id} />}
        </section>
      )}
    </>
  )
}
