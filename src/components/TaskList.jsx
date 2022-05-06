// COMPONENTS
import { TaskPreview } from './TaskPreview'

export const TaskList = ({ notes, remove, duplicate, pin, toggleCheckBox, noteDetails }) => {
  if (!notes) return <h2>Loading...</h2>
  return (
    <>
      <section className='task-list'>
        {notes &&
          notes.map((note, idx) => (
            <TaskPreview
              note={note}
              duplicate={duplicate}
              remove={remove}
              pin={pin}
              toggleCheckBox={toggleCheckBox}
              noteDetails={noteDetails}
              key={note._id || idx}
            />
          ))}
      </section>
    </>
  )
}
