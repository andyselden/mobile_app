import { all, call, fork, put, select, take, takeEvery, actionChannel, race } from 'redux-saga/effects'
import { clipboardActionTypes, alertDropdownActionTypes } from '../constants/actionTypes'
import { Clipboard } from 'react-native'

function * writeToClipboardSaga (action) {
    try{
        yield call(Clipboard.setString, action.text)
         yield put({ type: clipboardActionTypes.WRITE_TO_CLIPBOARD.FULFILLED })

        // Send dropdown alert
        const timestamp = Date.now()
        const alertType =  "SUCCESS"
        const title = "copied to clipboard!"
        const message = "testing"
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: timestamp,
            alertType: alertType,
            title: title,
            message: message
        })
    } catch(error){
         yield put({ type: clipboardActionTypes.WRITE_TO_CLIPBOARD.REJECTED, error })
    }
}

function * readFromClipboardSaga (action) {
    try{
        const clipboardContent = yield call(Clipboard.getString)
         yield put({ type: clipboardActionTypes.READ_FROM_CLIPBOARD.FULFILLED, clipboardContent })
    } catch(error){
         yield put({ type: clipboardActionTypes.READ_FROM_CLIPBOARD.REJECTED, error})
    }
}

export default function * rootSaga () {
  yield all([
    takeEvery(clipboardActionTypes.WRITE_TO_CLIPBOARD.REQUESTED, writeToClipboardSaga),
    takeEvery(clipboardActionTypes.READ_FROM_CLIPBOARD.REQUESTED, readFromClipboardSaga),
  ])
}
