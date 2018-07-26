import { kernelActionTypes } from '../constants/actionTypes'

export const addTextItem = (text) => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.REQUESTED,
  text
})

export const addTextItemFulfilled = error => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.FULFILLED,
  error
})

export const addTextItemRejected = error => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.REJECTED,
  error
})

export const addFileItem = (item) => ({
  type: kernelActionTypes.ADD_FILE_ITEM.REQUESTED,
  item
})

export const addFileItemFulfilled = error => ({
  type: kernelActionTypes.ADD_FILE_ITEM.FULFILLED,
  error
})

export const addFileItemRejected = error => ({
  type: kernelActionTypes.ADD_FILE_ITEM.REJECTED,
  error
})

export const addImageItem = (uri, fileName) => ({
  type: kernelActionTypes.ADD_IMAGE_ITEM.REQUESTED,
    uri,
    fileName
})

export const addImageItemFulfilled = error => ({
  type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED,
  error
})

export const addImageItemRejected = error => ({
  type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED,
  error
})

export const startTimer = () => ({
    type: kernelActionTypes.TIMER.START
})

export const stopTimer = () => ({
    type: kernelActionTypes.TIMER.STOP
})

export const tickTimer = () => ({
    type: kernelActionTypes.TIMER.TICK
})

export const resetTimer = () => ({
    type: kernelActionTypes.TIMER.RESET
})

export const updateKernelItems = (items) => ({
    type: kernelActionTypes.KERNEL_ITEMS_SYNC,
    items
})
