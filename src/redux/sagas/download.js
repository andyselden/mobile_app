import { call, fork, put, select, take, takeLatest, actionChannel, race } from 'redux-saga/effects'
import { downloadActionTypes, alertActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'
import rsf from '../rsf'
import RNFetchBlob from 'rn-fetch-blob'
import DropdownAlert from 'react-native-dropdownalert'

function * downloadFileSaga (action) {
    try{
        const user = yield select(state => state.user.user)

        const url = yield call(rsf.storage.getDownloadURL, action.path);
        RNFetchBlob
          .config({
            fileCache : true,
          })
          .fetch('GET', url, {
          })
          .then((res) => {
            console.log('The file saved to ', res.path())
            res.flush()
          })
    } catch (error) {
    }
}

export default function * rootSaga () {
  yield [
    takeLatest(downloadActionTypes.DOWNLOAD_FILE.REQUESTED, downloadFileSaga),
  ]
}
