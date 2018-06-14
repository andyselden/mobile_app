import { authentication } from '../constants/actionTypes'

export const login = (email, password) => ({
    type: authentication.LOGIN.REQUESTED,
    email,
    password
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
