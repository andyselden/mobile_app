import { authentication } from '../constants/actionTypes'

const initialState = {
  loading: false,
  loggedIn: undefined,
  email: '',
  password: '',
  user: null
}

export default function authenticationReducer (state = initialState, action = {}) {
  switch (action.type) {
    case authentication.LOGIN.REQUESTED:
    case authentication.LOGOUT.REQUESTED:
      return {
        ...state,
        loading: true
      }
    case authentication.LOGIN.FULFILLED:
      return {
        ...state,
        loading: false,
        loggedIn: true
      }
    case authentication.LOGIN.REJECTED:
      return {
        ...state,
          loading: false,
          message: action.error.message
      }
    case authentication.LOGOUT.FULFILLED:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case authentication.LOGOUT.REJECTED:
      return {
        ...state,
        loading: false
      }
    case authentication.SYNC_USER:
      return {
        ...state,
        loggedIn: action.user != null,
        user: action.user
      }
    case authentication.ROOT_CHANGE.REQUESTED:
      return {
        ...state,
        root: action.root
      }

    default:
      return state
  }
}
