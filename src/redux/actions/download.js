import { downloadActionTypes } from '../constants/actionTypes'

export const downloadFile = (path) => ({
  type: downloadActionTypes.DOWNLOAD_FILE.REQUESTED,
  path
})

export const downloadFileFulfilled = () => ({
  type: downloadActionTypes.DOWNLOAD_FILE.FULFILLED
})

export const downloadFileRejected = (error) => ({
  type: downloadActionTypes.DOWNLOAD_FILE.REJECTED,
  error
})
