import { combineReducers } from 'redux'

import user from './user'
import kernel from './kernel'
import locationBrowser from './locationBrowser'
import clipboard from './clipboard'

const rootReducer = combineReducers({
    user,
    kernel,
    locationBrowser,
    clipboard
})

export default rootReducer

