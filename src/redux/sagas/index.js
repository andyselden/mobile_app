import { fork } from 'redux-saga/effects';

import authentication from './authentication';

export default function * rootSaga () {
  yield [
       fork(authentication)
  ]
}
