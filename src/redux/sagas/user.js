import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { userActionTypes } from '../constants/actionTypes'
import { locationBrowserActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'
import {Navigation} from 'react-native-navigation'

import {
  signInFulfilled,
  signInRejected,
  signOutFulfilled,
  signOutRejected,
  signUpFulfilled,
  signUpRejected,
  updateEmailFulfilled,
  updateEmailRejected,
  passwordResetFulfilled,
  passwordResetRejected,
  updateProfileFulfilled,
  updateProfileRejected,
  syncUser
} from '../actions/user'

import rsf from '../rsf'


function * signInSaga ({payload, actions}) {
    const { email, password } = payload
    const { resetForm, setErrors, setSubmitting } = actions
  try {
    const user = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield call(resetForm)
    yield put(signInFulfilled())
  }
  catch(error) {
    yield put(signInRejected())
    yield call(setErrors, (error.code == "auth/wrong-password" ?
        {password: error.message} :
        {email: error.message}
    ))
    yield call(setSubmitting, false)
  }
}

function * signOutSaga () {
  try {
    const user = yield call(rsf.auth.signOut)
    yield put(signOutFulfilled())
  } catch (error) {
    yield put(signOutRejected(error))
  }
}

function * signUpSaga ({payload, actions}) {
    const { email, password } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    const user = yield call(rsf.auth.createUserWithEmailAndPassword, email, password);
      yield call(resetForm)
      yield put(signUpFulfilled(user));
  }
  catch(error) {
    yield put(signUpRejected(error));
    yield call(setSubmitting, false)
  }
}

function * updateEmailSaga({payload, actions}) {
    const { email } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    yield call(rsf.auth.updateEmail, email);
    yield call(resetForm)
    yield put(updateEmailFulfilled())
  }
  catch(error) {
    yield put(updateEmailRejected(error))
    yield call(setErrors, {email: error.message})
    yield call(setSubmitting, false)
  }
}

function * passwordResetSaga ({payload, actions}) {
    const { email } = payload
    const { resetForm, setErrors, setSubmitting } = actions

  try {
    yield call(rsf.auth.sendPasswordResetEmail, email);
    yield call(resetForm)
    yield put(passwordResetFulfilled())
  }
  catch(error) {
    yield put(passwordResetRejected(error))
    yield call(setErrors, {email: error.message})
    yield call(setSubmitting, false)
  }
}

function * updateProfileSaga ({payload, actions}) {
    const { displayName, photoURL } = payload
    const { resetForm, setErrors, setSubmitting } = actions
  try {
    yield call(rsf.auth.updateProfile, {
      displayName: displayName,
      photoURL: photoURL
    });
    yield call(resetForm)
    yield put(updateProfileFulfilled())
    Navigation.handleDeepLink({link: 'updateProfileSaga', payload: { source: 'updateProfileSaga', id: userActionTypes.UPDATEPROFILE.FULFILLED }})
  }
  catch(error) {
    yield put(updateProfileRejected(error))
    yield call(setErrors, {displayName: error.message})
    yield call(setSubmitting, false)
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
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REQUESTED })
     }
 }
}

export default function * userRootSaga () {
  yield fork(syncUserSaga)

  yield all([
    takeEvery(userActionTypes.SIGNIN.REQUESTED, signInSaga),
    takeEvery(userActionTypes.SIGNOUT.REQUESTED, signOutSaga),
    takeEvery(userActionTypes.SIGNUP.REQUESTED, signUpSaga),
    takeEvery(userActionTypes.UPDATEEMAIL.REQUESTED, updateEmailSaga),
    takeEvery(userActionTypes.PASSWORDRESET.REQUESTED, passwordResetSaga),
    takeEvery(userActionTypes.UPDATEPROFILE.REQUESTED, updateProfileSaga),
    ])
}
