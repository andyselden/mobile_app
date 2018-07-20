import { locationBrowserActionTypes } from '../constants/actionTypes'

export const initialize = () => ({
    type: locationBrowserActionTypes.INITIALIZE
})

export const updatePermissions = (backgroundAndForegroundPermissionsRequest) => ({
    type: locationBrowserActionTypes.UPDATE_PERMISSIONS.REQUESTED,
  backgroundAndForegroundPermissionsRequest
})

export const updatePermissionsFulfilled = (permissionsStatus) => ({
  type: locationBrowserActionTypes.UPDATE_PERMISSIONS.FULFILLED,
  permissionsStatus
})

export const updatePermissionsRejected = (error) => ({
  type: locationBrowserActionTypes.UPDATE_PERMISSIONS.REJECTED,
  error
})

export const backgroundTrackingOn = () => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REQUESTED
})

export const backgroundTrackingOnFulfilled = () => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.FULFILLED
})

export const backgroundTrackingOnRejected = (error) => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REJECTED,
    error
})

export const backgroundTrackingOff = () => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REQUESTED
})

export const backgroundTrackingOffFulfilled = () => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.FULFILLED
})

export const backgroundTrackingOffRejected = (error) => ({
    type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REJECTED,
    error
})

export const updateLocation = () => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION.REQUESTED
})

export const updateLocationFulfilled = (location) => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION.FULFILLED,
  location
})

export const updateLocationRejected = (error) => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION.REJECTED,
  error
})

export const updateLocationKernels = (location) => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.REQUESTED,
  location
})

export const updateLocationKernelsFulfilled = (kernels) => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.FULFILLED,
  kernels
})

export const updateLocationKernelsRejected = (error) => ({
  type: locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.REJECTED,
  error
})
