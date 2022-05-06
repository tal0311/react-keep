import React from 'react'
import { useState } from 'react'
import { ColorList } from './ColorList'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const TaskPreview = ({
  note,
  remove,
  duplicate,
  pin,
  toggleCheckBox,
  noteDetails,
}) => {
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
        className='task-preview flex'
      >
        <Link onClick={() => noteDetails(_id)} to={'/note/' + _id}>
          <h4>{title}</h4>
        </Link>
        {type === 'list' &&
          content.split(',').map((item, idx) => {
            return (
              <section className='content list flex' key={idx}>
                <label onClick={(ev) => toggleCheckBox(ev, idx)} htmlFor='task'>
                  <input type='checkbox' name='task' id='task' />
                  {item}
                </label>
              </section>
            )
          })}
        {type === 'txt' && <p className='content'>{content}</p>}
        {type === 'img' && (
          <img className='content' src={content} alt={title} />
        )}

        <p>{time}</p>
        <div className='actions-container'>
          <button
            className={isPinned ? 'fa-solid fa-xmark' : 'fa-solid fa-bookmark'}
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
        </div>
        {isModalOpen && <ColorList toggleModal={toggleModal} noteId={_id} />}
      </section>
    </>
  )
}
