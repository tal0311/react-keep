import { useEffect, useRef, useState } from 'react'

export const DrawNote = () => {
  const [isDrawing, setIsDrawing] = useState(false)

  const [line, setLine] = useState('black')

  const contextRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    canvas.style.width = `400px`
    canvas.style.height = `400px`
    const context = canvas.getContext('2d')

    context.scale(8, 8)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  useEffect(() => {}, [])

  const onStartDraw = ({ nativeEvent }) => {
    console.log(nativeEvent)
    setIsDrawing(true)
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
  }
  const onDraw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    console.log(offsetX, offsetY)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  const onStopDraw = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  return (
    <>
      <section className='canvas-note'>
        <h1>start draw</h1>
        <canvas
          ref={canvasRef}
          onMouseDown={onStartDraw}
          onMouseMove={onDraw}
          onMouseUp={onStopDraw}
        ></canvas>
      </section>
    </>
  )
}
