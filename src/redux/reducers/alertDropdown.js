import { alertDropdownActionTypes } from '../constants/actionTypes'

const initialState = {
    timestamp: '',
    alertType: '',
    title: '',
    message: ''
}

export default function alertDropdownReducer (state = initialState, action = {}) {
   switch (action.type) {
    case alertDropdownActionTypes.ALERT_USER:
      return {
        ...state,
        timestamp: action.timestamp,
        alertType: action.alertType,
        title: action.title,
        message: action.message
      }
    default:
      return state
  }
}
