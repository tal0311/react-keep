const INITIAL_STATE = {
  notes: null,
  currNote: null,
  filterBy: null,
  colors: [
    '#f68282',
    '#46f4ec',
    '#5281e8',
    '#ec60f9',
    '#f99360',
    '#f4f960',
    '#8eda68',
    '#ffff',
  ],
}

export function tasksReducer(state = INITIAL_STATE, action) {
  
  switch (action.type) {
    case 'LOAD_NOTES':
      return {
        ...state,
        notes: [...action.notes],
      }

    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.note],
      }

    case 'REMOVE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.noteId),
      }

    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.updated._id ? action.updated : note
        ),
      }
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }
    case 'SET_CURR_NOTE':
      return {
        ...state,
        currNote: action.note,
      }
    default:
      return state
  }
}
