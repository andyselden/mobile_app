import { kernelActionTypes } from '../constants/actionTypes'

export const addTextItemToKernel = (text) => ({
  type: kernelActionTypes.KERNEL.ADD_TEXT_ITEM,
    text
})

export const addFileItemToKernel = (item) => ({
  type: kernelActionTypes.KERNEL.ADD_FILE_ITEM,
  item
})

export const addImageItemToKernel = (item) => ({
  type: kernelActionTypes.KERNEL.ADD_IMAGE_ITEM,
  item
})

export const exposeKernel = () => ({
    type: kernelActionTypes.KERNEL.EXPOSE
})

export const hideKernel = () => ({
  type: kernelActionTypes.KERNEL.HIDE
})

