import { combineReducers } from 'redux'

import user from './user'
import kernel from './kernel'
import locationBrowser from './locationBrowser'

const rootReducer = combineReducers({
    user,
    kernel,
    locationBrowser
})

export default rootReducer

