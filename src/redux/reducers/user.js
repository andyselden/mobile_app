import { userActionTypes } from '../constants/actionTypes'

const initialState = {
  loading: false,
  signedIn: undefined,
  user: null,
  error: ''
}

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case userActionTypes.SIGNIN.REQUESTED:
    case userActionTypes.SIGNOUT.REQUESTED:
    case userActionTypes.SIGNUP.REQUESTED:
    case userActionTypes.UPDATEEMAIL.REQUESTED:
    case userActionTypes.PASSWORDRESET.REQUESTED:
    case userActionTypes.UPDATEPROFILE.REQUESTED:
      return {
        ...state,
        loading: true
      }
    case userActionTypes.SIGNIN.FULFILLED:
    case userActionTypes.SIGNUP.FULFILLED:
      return {
        ...state,
        loading: false,
        signedIn: true,

      }
    case userActionTypes.SIGNOUT.FULFILLED:
      return {
        ...state,
        loading: false,
        signedIn: false
      }
    case userActionTypes.UPDATEEMAIL.FULFILLED:
    case userActionTypes.PASSWORDRESET.FULFILLED:
     return {
        ...state,
        loading: false,
      }
    case userActionTypes.SIGNIN.REJECTED:
    case userActionTypes.SIGNUP.REJECTED:
    case userActionTypes.SIGNOUT.REJECTED:
    case userActionTypes.UPDATEEMAIL.REJECTED:
    case userActionTypes.PASSWORDRESET.REJECTED:
    case userActionTypes.UPDATEPROFILE.REJECTED:
      return {
        ...state,
          loading: false,
          error: action.error
      }
    case userActionTypes.SYNC_USER:
      return {
        ...state,
        signedIn: action.user != null,
        user: action.user
      }
    case userActionTypes.ROOT_CHANGE.REQUESTED:
      return {
        ...state,
        root: action.root
      }

    default:
      return state
  }
}
