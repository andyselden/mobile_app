import { userActionTypes } from '../constants/actionTypes'

export const signIn = (payload, actions) => ({
    type: userActionTypes.SIGNIN.REQUESTED,
    payload,
    actions
})

export const signInFulfilled = () => ({
  type: userActionTypes.SIGNIN.FULFILLED
})

export const signInRejected = error => ({
  type: userActionTypes.SIGNIN.REJECTED,
  error
})

export const signOut = () => ({
  type: userActionTypes.SIGNOUT.REQUESTED
})

export const signOutFulfilled = () => ({
  type: userActionTypes.SIGNOUT.FULFILLED
})

export const signOutRejected = () => ({
  type: userActionTypes.SIGNOUT.REJECTED,
  error
})

export const signUp = (payload, actions) => ({
    type: userActionTypes.SIGNUP.REQUESTED,
    payload,
    actions
})

export const signUpFulfilled = () => ({
  type: userActionTypes.SIGNUP.FULFILLED
})

export const signUpRejected = error => ({
  type: userActionTypes.SIGNUP.REJECTED,
  error
})

export const updateEmail = (payload, actions) => ({
    type: userActionTypes.UPDATEEMAIL.REQUESTED,
    payload,
    actions
})

export const updateEmailFulfilled = () => ({
  type: userActionTypes.UPDATEEMAIL.FULFILLED,
})

export const updateEmailRejected = error => ({
  type: userActionTypes.UPDATEEMAIL.REJECTED,
  error
})

export const passwordReset = (payload, actions) => ({
    type: userActionTypes.PASSWORDRESET.REQUESTED,
    payload,
    actions
})

export const passwordResetFulfilled = () => ({
  type: userActionTypes.PASSWORDRESET.FULFILLED,
})

export const passwordResetRejected = error => ({
  type: userActionTypes.PASSWORDRESET.REJECTED,
  error
})

export const updateProfile = (payload, actions) => ({
  type: userActionTypes.UPDATEPROFILE.REQUESTED,
  payload,
  actions
})

export const updateProfileFulfilled = () =>  ({
  type: userActionTypes.UPDATEPROFILE.FULFILLED
})

export const updateProfileRejected = error => ({
  type: userActionTypes.UPDATEPROFILE.REJECTED,
  error
})

export const syncUser = user => ({
  type: userActionTypes.SYNC_USER,
  user
})



