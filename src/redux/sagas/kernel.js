import { call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { kernelActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'

import rsf from '../rsf'


import {
  exposeKernel
} from '../actions/kernel'


function * addTextItemToKernelSaga (action) {
    const user = yield select(state => state.user.user)
    yield call(
        rsf.firestore.setDocument,
        `kernels/${ user.uid }/items/01`,
        {
            type: 'TEXT',
            text: action.text
        },
        {
            merge: true
        }
    )
    yield put(exposeKernel())
}

function * addFileItemToKernelSaga (action) {
    const user = yield select(state => state.user.user)
    yield call(
        rsf.firestore.setDocument,
        `kernels/${ user.uid }/items/01`,
        {
            what: action.item
        },
        {
            merge: true
        }
    )
    yield put(exposeKernel())
}

function * addImageItemToKernelSaga (action) {
    const user = yield select(state => state.user.user)
    yield call(
        rsf.firestore.setDocument,
        `kernels/${ user.uid }/items/01`,
        {
            what: action.item
        },
        {
            merge: true
        }
    )
    yield put(exposeKernel())
}

function * exposeKernelSaga () {
    const user = yield select(state => state.user.user)
    yield call(
        rsf.firestore.setDocument,
        `kernels/${ user.uid }`,
        {
            exposed: true
        },
        {
            merge: true
        }
    )
}

function * hideKernelSaga (action) {
    const user = yield select(state => state.user.user)
    yield call(
        rsf.firestore.setDocument,
        `kernels/${ user.uid }`,
        {
            exposed: false
        },
        {
            merge: true
        }
    )
}

export default function * rootSaga () {
  yield [
    takeEvery(kernelActionTypes.KERNEL.ADD_TEXT_ITEM, addTextItemToKernelSaga),
    takeEvery(kernelActionTypes.KERNEL.ADD_FILE_ITEM, addFileItemToKernelSaga),
    takeEvery(kernelActionTypes.KERNEL.ADD_IMAGE_ITEM, addImageItemToKernelSaga),
    takeEvery(kernelActionTypes.KERNEL.EXPOSE, exposeKernelSaga),
    takeEvery(kernelActionTypes.KERNEL.HIDE, hideKernelSaga)
  ]
}
