import { userService } from './../../service/userService'

export function spendBalance(amount, to) {
  return async (dispatch, getState) => {
    const { loggedInUser } = getState().userModule
    console.log('loggedInUser', loggedInUser)
    try {
      await userService.addMove( amount, to)
      dispatch({ type: 'SPEND_BALANCE', amount })
    } catch (error) {
      console.log(error)
    }
  }
}
export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getUser()
      dispatch({ type: 'SET_USER', user })
    } catch (error) {
      throw new Error(error)
    }
  }
}
export function test() {
  return async (dispatch) => {
    console.log('tst')
  }
}
