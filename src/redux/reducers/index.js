import { combineReducers } from 'redux'

import user from './user'
import kernel from './kernel'

const rootReducer = combineReducers({
    user,
    kernel
})

export default rootReducer

