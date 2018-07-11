import { fork } from 'redux-saga/effects'

import user from './user'
import kernel from './kernel'

export default function * rootSaga () {
  yield [
      fork(user),
      fork(kernel)
  ]
}
