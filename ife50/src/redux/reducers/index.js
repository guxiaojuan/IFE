import {combineReducers} from 'redux'
import questionnaires from './questionnaires'
import dialog from './dialog'

export default combineReducers({
    questionnaires,
    dialog
})
