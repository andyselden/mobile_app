import { clipboardActionTypes } from '../constants/actionTypes'

const initialState = {
    content: '',
    error: ''
}

export default function clipboardReducer (state = initialState, action = {}) {
   switch (action.type) {
    case clipboardActionTypes.READ_FROM_CLIPBOARD.FULFILLED:
      return {
        ...state,
        content: action.clipboardContent
      }
    case clipboardActionTypes.WRITE_TO_CLIPBOARD.REJECTED:
    case clipboardActionTypes.READ_FROM_CLIPBOARD.REJECTED:
      return {
        ...state,
          error: action.error
      }
    default:
      return state
  }
}
