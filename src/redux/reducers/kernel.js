import { kernelActionTypes } from '../constants/actionTypes'

const initialState = {
    loading: false,
    error: ''
}

export default function kernelReducer (state = initialState, action = {}) {
  switch (action.type) {
    case kernelActionTypes.ADD_TEXT_ITEM.REQUESTED:
    case kernelActionTypes.ADD_FILE_ITEM.REQUESTED:
    case kernelActionTypes.ADD_IMAGE_ITEM.REQUESTED:
      return {
        ...state,
        loading: true
      }
    case kernelActionTypes.ADD_TEXT_ITEM.FULFILLED:
    case kernelActionTypes.ADD_FILE_ITEM.FULFILLED:
    case kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED:
      return {
        ...state,
        loading: false
      }
    case kernelActionTypes.ADD_TEXT_ITEM.REJECTED:
    case kernelActionTypes.ADD_FILE_ITEM.REJECTED:
    case kernelActionTypes.ADD_IMAGE_ITEM.REJECTED:
      return {
        ...state,
          loading: false,
          error: action.error
      }
    default:
      return state
  }
}
