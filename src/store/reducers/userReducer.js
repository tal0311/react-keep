const INITIAL_STATE = {
  loggedInUser: null,
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SPEND_BALANCE':
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          coins: loggedInUser.coins - action.amount,
        },
      }
    case 'SET_USER':
      return {
        ...state,
        loggedInUser: { ...action.user },
      }

    default:
      return state
  }
}
