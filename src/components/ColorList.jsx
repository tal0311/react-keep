import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ColorPreview } from './ColorPreview'
import { updateNote } from '../store/actions/tasksActions'

export const ColorList = ({ toggleModal, noteId }) => {
  const dispatch = useDispatch()
  const { colors } = useSelector((state) => state.tasksModule)

  const update = (color) => {
    toggleModal()
    try {
      console.log(noteId);
      dispatch(updateNote(color, noteId))
    } catch (error) {
      console.log(error)
    }
  }

  if (!colors) return <div>loading</div>
  return (
    <>
      <section className='color-list flex'>
        {colors.map((color, idx) => (
          <ColorPreview color={color} update={update} key={idx} />
        ))}
      </section>
    </>
  )
}
