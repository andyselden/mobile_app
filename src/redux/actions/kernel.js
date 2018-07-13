import { kernelActionTypes } from '../constants/actionTypes'

export const addTextItem = (text) => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.REQUESTED,
  text
})

export const addTextItemFulfilled = () => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.FULFILLED
})

export const addTextItemRejected = error => ({
  type: kernelActionTypes.ADD_TEXT_ITEM.REJECTED,
  error
})


export const addFileItem = (item) => ({
  type: kernelActionTypes.ADD_FILE_ITEM.REQUESTED,
  item
})

export const addFileItemFulfilled = () => ({
  type: kernelActionTypes.ADD_FILE_ITEM.FULFILLED
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

export const addImageItemFulfilled = () => ({
  type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED
})

export const addImageItemRejected = error => ({
  type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED,
  error
})

export const updateTimestamp = () => ({
    type: kernelActionTypes.KERNEL.UPDATE_TIMESTAMP
})
