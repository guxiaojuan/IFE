import {cloneObject} from '../../common/util'
import {RADIO, CHECKBOX, TEXT} from "../../constants/QuestionTypes"
import {UNRELEASED, RELEASED, CLOSED} from "../../constants/QuestionnaireStatusTypes";

const list = localStorage.list? JSON.parse(localStorage.list) : []

const initialEditing = {
    questionnaire: -1, // 问卷列表的index
    title: '这里是标题',
    time: 0,
    order: 0,
    quesitons: [],
    type: false,
    question: -1,
    option: -1,
    text: {
        typing: false,
        content: ''
    },
    data: []
}

const initialState = {
    list,
    editing: cloneObject(initialEditing)
}

export default function questionnaires(state = initialState, action) {
    switch (action.type){
        case 'ADD_QUESTIONNAIRE':{
            const {list} = state
            const editing = cloneObject(initialEditing)
            editing.questionnaires = list.length
            return Object.assign(
                {},
                state,
                editing
            )
        }
        case 'EDIT_QUESTIONNAIRE':{
            const {list} = state
            const editing = cloneObject(initialEditing)
            const questionnaire = action.payload
            const {title, time} = list[questionnaire]
            const questions = cloneObject(list[questionnaire].quesitons)
            editing.questionnaire = questionnaire
            editing.title = title
            editing.time = time
            editing.questions = questions
            return Object.assign(
                {},
                state,
                editing
            )
        }
        case 'REMOVE_QUESTIONNAIRE': {
            const { list } = state
            const questionnaire = action.payload
            list.splice(questionnaire,1)
            localStorage.list = JSON.stringify(list)
            return Object.assign(
                {},
                state,
                {list}
            )
        }
        case 'SAVE_QUESTIONNAIRE': {
            const {list, editing:{questionnaire, title, time, questions}} = state
            list[questionnaire] = { title, time, status: UNRELEASED, questions: cloneObject(questions), data: []}
            localStorage.list = JSON.stringify(list)
            return Object.assign(
                {},
                state,
                {list}
            )
        }
        case 'RELEASE_QUESTIONNAIRE': {
            const {list, editing:{questionnaire}} = state
            list[questionnaire].status = RELEASED
            localStorage.list = JSON.stringify(list)
            return Object.assign(
                {},
                state,
                {
                    list,
                    editing:cloneObject(initialEditing)
                }
            )
        }
        case 'SORT_QUESTIONNAIRE': {
            const { list , editing } = state
            const datakey = action.payload
            editing.order ^= 1
            list.sort( (a,b) => {
               return (editing.order || -1) * (a[datakey] -b[datakey])
            })
            return Object.assign(
                {},
                state,
                {
                    list,
                    editing
                }
            )
        }
        case 'FILL_QUESTIONNAIRE': {
            const {list} = state
            const questionnaire = action.payload
            let data = []
            list[questionnaire].quesitons.forEach((key, index) => {
                switch (key.type){
                    case RADIO: {data.push(-1);   break}
                    case CHECKBOX: {data.push([]);   break}
                    case TEXT: {data.push('');   break}

                }
            })
            return Object.assign(
                {},
                state,
                {
                    list,
                    editing:cloneObject(initialEditing)
                }
            )
        }
        case 'SUBMIT_QUESTIONNAIRE': {
            const {list, editing: {questionnaire, data}} = state
            list[questionnaire].data.push(cloneObject(data))
            localStorage.list = JSON.stringify(list)
            return Object.assign(
                {},
                state,
                {list, editing: cloneObject(initialEditing)}
            )
        }
        case 'CLOSE_QUESTIONNAIRE': {
            const { list } = state
            const questionnaire = action.payload
            list[questionnaire].status = CLOSED
            localStorage.list = JSON.stringify(list)
            return Object.assign(
                {},
                state,
                { list }
            )
        }
        case 'EDIT_TEXT': {
            const { editing } = state
            const { content, question, option } = action.payload
            if(question !== -1 && option !== -1 && editing.questions[question].type === TEXT) {
                editing.questions[question].content = content
            }else{
                editing.text={
                    typing: true,
                    content
                }
            }
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'SAVE_TEXT': {
            const { editing } = state
            const { questionnaire, question, option } = editing
            const content = action.payload
            if (question === -1){
                editing.title = content
            }else if(option === -1){
                editing.questions[question].content = content
            }else{
                editing.questions[question].options[option] = content
            }
        }
        case 'FILL_TEXT': {
            const { editing } = state
            const { content, question } = action.payload
            editing.data[question] = content
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'CHOOSE_TYPE': {
            const { editing } = state
            const type = editing.type^1
            editing.type = type
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'ADD_QUESTION': {
            const { editing } = state
            const type = action.payload
            let question
            switch (type) {
                case RADIO: {
                    question = {
                        type,
                        content: '单选题',
                        options:['选项1', '选项2']
                    }
                    break
                }
                case CHECKBOX: {
                    question = {
                        type,
                        content: '多选题',
                        options:['选项1', '选项2', '选项3', '选项4']
                    }
                    break
                }
                case TEXT: {
                    question = {
                        type,
                        isRequired: false
                    }
                    break
                }
                default:
                    question = {}
            }
            editing.questions.push(question)
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'REMOVE_QUESTION': {
            const { editing } = state
            const question = action.payload
            editing.questions.splice(question + direction, 1)
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'SHIFT_QUESTION': {
            const { editing } = state
            const { question, direction } = action.payload
            editing.questions.splice(question + direction, 0, editing.questions.splice(question,1)[0])
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'COPY_QUESTION': {
            const { editing } = state
            const question = action.payload
            const copy = Object.assign({}, editing.questions[question])
            if(editing.questions[question].type !== TEXT) {
                copy.options = copy.options.slice(0)
            }
            editing.questions.splice(question + 1, 0, copy)
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'ADD_OPTION': {
            const { editing } = state
            const question = action.payload;
            editing.questions[question].options.push(`选项${editing.questions[question].options.length + 1}`)
            return Object.assign({}, state, { editing })
        }
        case 'REMOVE_OPTION': {
            const { editing } = state
            const { question, option }= action.payload
            editing.questions[question].options.splice(option, 1)
            return Object.assign({}, state, { editing })
        }
        case 'CHOOSE_OPTION': {
            const { editing } = state
            const { question, option }= action.payload
            editing.data[question] = option
            return Object.assign({}, state, { editing })
        }
        case 'TOGGLE_OPTION': {
            const { editing } = state
            const { question, option } = action.payload
            const index = editing.data[question].indexOf(option)
            index !== -1? editing.data[question].splice(index, 1) : editing.data[question].push(index)
            return Object.assign(
                {},
                state,
                { editing }
            )
        }
        case 'TOGGLE_REQUIREMENT': {
            const { editing } = state
            const question = action.payload
            editing.questions[question].isRequired = editing.questions[question].isRequired ^ 1
            return Object.assign({}, state, { editing })
        }
        case 'SAVE_TIME': {
            const { editing } = state
            const { year, month, date } = action.payload
            editing.time = new Date(year, month - 1, date).getTime()
            return Object.assign({}, state, { editing })
        }
        case 'CHECK_DATA': {
            const questionnaire = action.payload
            const editing = cloneObject(initialEditing)
            editing.questionnaire = questionnaire
            return Object.assign(
                {},
                state,
                editing
             )
        }
        default:return state
    }
}