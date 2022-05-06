import React from 'react'

export const ColorPreview = ({ color, update }) => {
  if (!color) return <div>Loading...</div>
  return (
    <>
      <div
        className='color-preview'
        onClick={() => update(color)}
        style={{ backgroundColor: color }}
      ></div>
    </>
  )
}
