import React from 'react'

export const AddTask = ({ handleChange, onChangeType, addNote }) => {
  return (
    <>
      <section className='add-task flex '>
        <div className='add-task-container flex'>
          <div className='actions-container'>
            <button name='img' onClick={onChangeType}>
              <i className='fa-solid fa-image'></i>
            </button>
            <button name='paint' onClick={onChangeType}>
              <i className='fa-solid fa-pen'></i>
            </button>
            <button name='list' onClick={onChangeType}>
              <i className='fa-solid fa-list'></i>
            </button>
          </div>
          <input
            className='text-input'
            onBlur={addNote}
            onChange={handleChange}
            type='text'
          />
        </div>
      </section>
    </>
  )
}
