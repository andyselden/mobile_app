import { clipboardActionTypes } from '../constants/actionTypes'

export const writeToClipboard = (text) => ({
  type: clipboardActionTypes.WRITE_TO_CLIPBOARD.REQUESTED,
  text
})

export const writeToClipboardFulfilled = () => ({
  type: clipboardActionTypes.WRITE_TO_CLIPBOARD.FULFILLED
})

export const writeToClipboardRejected = (error) => ({
  type: clipboardActionTypes.WRITE_TO_CLIPBOARD.REJECTED,
  error
})

export const readFromClipboard = () => ({
  type: clipboardActionTypes.READ_FROM_CLIPBOARD.REQUESTED
})

export const readFromClipboardFulfilled = () => ({
    type: clipboardActionTypes.READ_FROM_CLIPBOARD.FULFILLED,
    clipboardContent
})

export const readFromClipboardRejected = (error) => ({
  type: clipboardActionTypes.READ_FROM_CLIPBOARD.REJECTED,
  error
})


