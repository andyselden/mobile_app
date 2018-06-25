import { authentication } from '../constants/actionTypes'

export const signUp = (payload, actions) => ({
    type: authentication.SIGNUP.REQUESTED,
    payload,
    actions
})

export const signUpFulfilled = credential => ({
  type: authentication.SIGNUP.FULFILLED,
  credential
})

export const signUpRejected = error => ({
  type: authentication.SIGNUP.REJECTED,
  error
})

export const passwordReset = (payload, actions) => ({
    type: authentication.PASSWORDRESET.REQUESTED,
    payload,
    actions
})

export const passwordResetFulfilled = credential => ({
  type: authentication.PASSWORDRESET.FULFILLED,
  credential
})

export const passwordResetRejected = error => ({
  type: authentication.PASSWORDRESET.REJECTED,
  error
})

export const login = (payload, actions) => ({
    type: authentication.LOGIN.REQUESTED,
    payload,
    actions
})

export const loginFulfilled = credential => ({
  type: authentication.LOGIN.FULFILLED,
  credential
})

export const loginRejected = error => ({
  type: authentication.LOGIN.REJECTED,
  error
})

export const logout = () => ({
  type: authentication.LOGOUT.REQUESTED
})

export const logoutFulfilled = () => ({
  type: authentication.LOGOUT.FULFILLED
})

export const logoutRejected = error => ({
  type: authentication.LOGOUT.REJECTED,
  error
})

export const syncUser = user => ({
  type: authentication.SYNC_USER,
  user
})



