import { kernelActionTypes } from '../constants/actionTypes'

const initialState = {
    items: [],
    timerIsRunning: false,
    secondsToDeletion: 0,
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
    case kernelActionTypes.TIMER.START:
      return {
          ...state,
          timerIsRunning: true
      }
    case kernelActionTypes.TIMER.STOP:
      return {
          ...state,
          timerIsRunning: false
      }
    case kernelActionTypes.TIMER.TICK:
      return {
          ...state,
          secondsToDeletion: state.secondsToDeletion + 1
      }
    case kernelActionTypes.TIMER.RESET:
      return {
          ...state,
          secondsToDeletion: 0
      }
    case kernelActionTypes.KERNEL_ITEMS_UPDATE:
          return {
            ...state,
            items: action.items
          }
    default:
      return state
  }
}
