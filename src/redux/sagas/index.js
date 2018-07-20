import { fork } from 'redux-saga/effects'

import user from './user'
import kernel from './kernel'
import locationBrowser from './locationBrowser'

export default function * rootSaga () {
  yield [
      fork(user),
      fork(kernel),
      fork(locationBrowser)
  ]
}
