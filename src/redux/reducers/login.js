import { auth } from '../constants/types'

const initialState = {
  loading: false,
  loggedIn: false,
  email: '',
  password: '',
  user: null
}

export default function loginReducer (state = initialState, action = {}) {
  switch (action.type) {
    case auth.LOGIN.REQUESTED:
    case auth.LOGOUT.REQUESTED:
      return {
        ...state,
        loading: true
      }
    case auth.LOGIN.FULFILLED:
      return {
        ...state,
        loading: false,
        loggedIn: true
      }
    case auth.LOGIN.REJECTED:
      return {
        ...state,
          loading: false,
          message: action.error.message
      }
    case auth.LOGOUT.FULFILLED:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case auth.LOGOUT.REJECTED:
      return {
        ...state,
        loading: false
      }
    case auth.SYNC_USER:
      return {
        ...state,
        loggedIn: action.user != null,
        user: action.user
      }
    default:
      return state
  }
}
