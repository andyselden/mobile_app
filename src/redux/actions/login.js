import { auth } from '../constants/types'

export const login = (email, password) => ({
    type: auth.LOGIN.REQUESTED,
    email,
    password
})

export const loginFulfilled = credential => ({
  type: auth.LOGIN.FULFILLED,
  credential
})

export const loginRejected = error => ({
  type: auth.LOGIN.REJECTED,
  error
})

export const logout = () => ({
  type: auth.LOGOUT.REQUESTED
})

export const logoutFulfilled = () => ({
  type: auth.LOGOUT.FULFILLED
})

export const logoutRejected = error => ({
  type: auth.LOGOUT.REJECTED,
  error
})

export const syncUser = user => ({
  type: auth.SYNC_USER,
  user
})
