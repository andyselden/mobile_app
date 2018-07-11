import { kernelActionTypes } from '../constants/actionTypes'

export const syncKernels = kernels => ({
  type: kernelActionTypes.KERNELS.SYNC,
  kernelList
})

export const addTextToKernel = (kernelId, text) => ({
  type: kernelActionTypes.KERNEL.ADD_TEXT,
  kernelId,
  text
})

export const exposeKernel = (kernelId) => ({
    type: kernelActionTypes.KERNEL.EXPOSE
    kernelId
})

export const hideKernel = (kernelId) => ({
  type: kernelActionTypes.KERNEL.HIDE,
  kernelId
})

