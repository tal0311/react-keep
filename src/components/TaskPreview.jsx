import React from 'react'
import { useState } from 'react'
import { ColorList } from './ColorList'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const TaskPreview = ({ note, remove, duplicate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { _id, type, title, craetedAt, content, isPinned, color } = note

  let time = Date(craetedAt)
  time = time.substring(0, 15)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <section
        style={{ backgroundColor: color, backgroundImage: { content } }}
        className='task-preview'
      >
        <Link to={'/note/' + _id}>
          <h4>{title}</h4>
          <p>{content}</p>
          <p>{time}</p>
        </Link>
        <div className='actions-container'>
          <button
            className={isPinned ? 'fa-solid fa-xmark' : 'fa-solid fa-bookmark'}
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
        </div>
        {isModalOpen && <ColorList toggleModal={toggleModal} noteId={_id} />}
      </section>
    </>
  )
}
