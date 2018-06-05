import { compose, createStore } from 'redux';

import { middlewares } from './enhancers'
import { sagaMiddleware } from './enhancers/middlewares'
import rootReducer from './reducers/index';
import rootSaga from './sagas/index'

const enhancers = compose(
  middlewares
)

const store = createStore(
  rootReducer,
  enhancers
)
sagaMiddleware.run(rootSaga)

export default store


