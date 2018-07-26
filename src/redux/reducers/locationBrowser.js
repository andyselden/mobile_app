import { locationBrowserActionTypes } from '../constants/actionTypes'

const initialState = {
    permissionsStatus: '',
    kernelList: [],
    location: {
        accuracy: 0,
        latitude: '',
        longitude: ''
    },
    locationLoading: false,
    browserLoading: false,
    initialized: false,
    backgroundTrackingOn: false,
    error: ''
}

export default function locationBrowserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case locationBrowserActionTypes.INITIALIZE:
      return {
        ...state,
        initialized: true
      }
    case locationBrowserActionTypes.UPDATE_PERMISSIONS.FULFILLED:
      return {
        ...state,
        permissionsStatus: action.permissionsStatus
      }
    case locationBrowserActionTypes.UPDATE_PERMISSIONS.REJECTED:
    case locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REJECTED:
    case locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REJECTED:
      return {
        ...state,
          error: action.error
      }
    case locationBrowserActionTypes.UPDATE_LOCATION.REQUESTED:
      return {
        ...state,
        locationLoading: true
      }
    case locationBrowserActionTypes.UPDATE_LOCATION.FULFILLED:
      return {
          ...state,
          locationLoading: false,
          location: action.location
      }
    case locationBrowserActionTypes.UPDATE_LOCATION.REJECTED:
      return {
          ...state,
          locationLoading: false,
          error: action.error
      }
    case locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.REQUESTED:
      return {
        ...state,
        browserLoading: true
      }
    case locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.FULFILLED:
      return {
          ...state,
          browserLoading: false,
          location: action.kernels
      }
    case locationBrowserActionTypes.UPDATE_LOCATION_KERNELS.REJECTED:
      return {
          ...state,
          browserLoading: false,
          error: action.error
      }
    case locationBrowserActionTypes.BACKGROUND_TRACKING_ON.FULFILLED:
      return {
          ...state,
          backgroundTrackingOn: true
     }
    case locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.FULFILLED:
      return {
          ...state,
          backgroundTrackingOn: false
      }
    case locationBrowserActionTypes.SYNC_KERNELS:
        return {
            ...state,
            kernelList: action.kernels
        }
    default:
      return state
  }
}
