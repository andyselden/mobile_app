import { call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { authentication } from '../constants/actionTypes'
import firebase from 'firebase'
import {
  loginFulfilled,
  loginRejected,
  logoutFulfilled,
  logoutRejected,
  syncUser
} from '../actions/authentication'

import rsf from '../rsf'

function * loginSaga (action) {
    const { email, password } = action;
  try {
    const data = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield put(loginFulfilled(data));
  }
  catch(error) {
    yield put(loginRejected(error));
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
    takeEvery(authentication.LOGIN.REQUESTED, loginSaga),
    takeEvery(authentication.LOGOUT.REQUESTED, logoutSaga)
  ]
}
