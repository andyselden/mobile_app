import { fork } from 'redux-saga/effects'

import user from './user'
import kernel from './kernel'
import locationBrowser from './locationBrowser'
import clipboard from './clipboard'
import download from './download'

export default function * rootSaga () {
  yield [
      fork(user),
      fork(kernel),
      fork(locationBrowser),
      fork(clipboard),
      fork(download)
  ]
}
