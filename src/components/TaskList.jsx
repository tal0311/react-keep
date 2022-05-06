// COMPONENTS
import { TaskPreview } from './TaskPreview'

export const TaskList = ({ notes, remove, duplicate }) => {
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
              key={note._id || idx}
            />
          ))}
      </section>
    </>
  )
}
