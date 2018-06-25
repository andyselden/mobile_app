import { authentication } from '../constants/actionTypes'

const initialState = {
  loading: false,
  loggedIn: undefined,
  email: '',
  password: '',
  user: null,
  message: ''
}

export default function authenticationReducer (state = initialState, action = {}) {
  switch (action.type) {
    case authentication.LOGIN.REQUESTED:
    case authentication.LOGOUT.REQUESTED:
    case authentication.SIGNUP.REQUESTED:
    case authentication.PASSWORDRESET.REQUESTED:
      return {
        ...state,
        loading: true
      }
    case authentication.LOGIN.FULFILLED:
    case authentication.SIGNUP.FULFILLED:
      return {
        ...state,
        loading: false,
        loggedIn: true
      }
    case authentication.LOGIN.REJECTED:
    case authentication.SIGNUP.REJECTED:
      return {
        ...state,
          loading: false,
          message: action.error.message
      }
    case authentication.PASSWORDRESET.FULFILLED:
      return {
        ...state,
        loading: false,
      }
    case authentication.PASSWORDRESET.REJECTED:
      return {
        ...state,
        loading: false
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
