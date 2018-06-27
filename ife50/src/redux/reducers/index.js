import {combineReducers} from 'redux'
import questionnaires from './questionnaires'
import dialog from './dialog'
import edit from './edit'

export default combineReducers({
    questionnaires,
    dialog,
	edit
})
