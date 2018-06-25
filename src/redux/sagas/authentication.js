import { call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { authentication } from '../constants/actionTypes'
import firebase from 'firebase'
import {
  passwordResetFulfilled,
  passwordResetRejected,
  signUpFulfilled,
  signUpRejected,
  loginFulfilled,
  loginRejected,
  logoutFulfilled,
  logoutRejected,
  syncUser
} from '../actions/authentication'

import rsf from '../rsf'

function * passwordResetSaga ({payload, actions}) {
    console.log(payload)
    console.log(actions)
    const { email } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    const data = yield call(rsf.auth.sendPasswordResetEmail, email);
      console.log(data)
    yield call(resetForm)
    yield put(passwordResetFulfilled(data))
  }
  catch(error) {
    yield put(passwordResetRejected(error))
    yield call(setErrors, {email: error.message})
    yield call(setSubmitting, false)
  }
}

function * signUpSaga ({payload, actions}) {
    const { email, password } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    const data = yield call(rsf.auth.createUserWithEmailAndPassword, email, password);
    yield call(resetForm)
    yield put(signUpFulfilled(data));
  }
  catch(error) {
    yield put(signUpRejected(error));
    yield call(setSubmitting, false)
  }
}

function * loginSaga ({payload, actions}) {
    const { email, password } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    const data = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield call(resetForm)
    yield put(loginFulfilled(data))
  }
  catch(error) {
    yield put(loginRejected(error))
    yield call(setErrors, (error.code =="auth/wrong-password" ?
        {password: error.message} :
        {email: error.message}
    ))
    yield call(setSubmitting, false)
  }
}

function * logoutSaga () {
  try {
    const data = yield call(rsf.auth.signOut)
    yield put(logoutFulfilled(data))
  } catch (error) {
    yield put(logoutRejected(error))
  }
}

function * syncUserSaga () {
 const channel = yield call(rsf.auth.channel)

 while (true) {
   const { user } = yield take(channel)
     if (user) {
         yield put(syncUser(user))
     }
     else {
         yield put(syncUser(null))
     }
 }
}

export default function * authenticationRootSaga () {
  yield fork(syncUserSaga)

  yield [
    takeEvery(authentication.SIGNUP.REQUESTED, signUpSaga),
    takeEvery(authentication.PASSWORDRESET.REQUESTED, passwordResetSaga),
    takeEvery(authentication.LOGIN.REQUESTED, loginSaga),
    takeEvery(authentication.LOGOUT.REQUESTED, logoutSaga)
  ]
}
