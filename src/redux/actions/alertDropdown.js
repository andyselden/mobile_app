import { alertDropdownActionTypes } from '../constants/actionTypes'

export const alertUser = (timestamp, alertType, title, message) => ({
  type: alertDropdownActionTypes.ALERT_USER,
  timestamp,
  alertType,
  title,
  message
})
