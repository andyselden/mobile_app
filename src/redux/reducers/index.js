import { combineReducers } from 'redux'

import user from './user'
import kernel from './kernel'
import locationBrowser from './locationBrowser'
import clipboard from './clipboard'
import alertDropdown from './alertDropdown'

const rootReducer = combineReducers({
    user,
    kernel,
    locationBrowser,
    clipboard,
    alertDropdown
})

export default rootReducer

