export const addQuestionnaire =  () => {type: 'ADD_QUESTIONNAIRE'}
export const editQuestionnaire =  (questionnaire) => {
    return {
        type: 'EDIT_QUESTIONNAIRE',
        payload:{
            questionnaire
        }
    }
}
export const removeQuestionnaire =  (questionnaire) => {
    return{
        type: 'REMOVE_QUESTIONNAIRE',
        payload:{
            questionnaire
        }
    }
}
export const saveQuestionnaire =  () => {type: 'SAVE_QUESTIONNAIRE'}
export const releaseQuestionnaire =  () => {type: 'RELEASE_QUESTIONNAIRE'}
export const sortQuestionnaire =  (datakey) => {
    return{
        type: 'SORT_QUESTIONNAIRE',
        payload:{
            datakey
        }

    }
}
export const fillQuestionnaire =  (questionnaire) => {
    return{
        type: 'FILL_QUESTIONNAIRE',
        payload:{
            questionnaire
        }
    }
}
export const submitQuestionnaire =  () => {type: 'SUBMIT_QUESTIONNAIRE'}
export const closeQuestionnaire =  (questionnaire) => {
    return{
        type: 'CLOSE_QUESTIONNAIRE',
        payload:{
            questionnaire
        }
    }
}
export const editText =  (content, question, option) => {
    return{
        type: 'EDIT_TEXT',
        payload:{
            content,
            question,
            option
        }
    }
}
export const saveText =  (content) => {
    return{
        type: 'SAVE_TEXT',
        payload:{
            content
        }
    }
}
export const fillText =  (content, question) => {
    return{
        type: 'FILL_TEXT',
        payload:{
            content,
            question,
        }
    }
}
export const chooseType =  (atype) => {
    return {
        type: 'CHOOSE_TYPE',
        payload:{
            atype
        }
    }
}
export const addQuestion = (atype) => {
    return{
        type:'ADD_QUESTION',
        payload:{
            atype
        }
    }
}
export const removeQuestion = (question) => {
    return{
        type:'REMOVE_QUESTION',
        payload:{
            question,
        }
    }
}
export const shiftQuestion = (question, direction) => {
    return{
        type:'SHIFT_QUESTION',
        payload:{
            direction,
            question,
        }
    }
}
export const copyQuestion =(question) => {
    return{
        type: 'COPY_QUESTION',
        payload:{
            question,
        }
    }
}
export const addOption =(question) => {
    return{
        type: 'ADD_OPTION',
        payload:{
            question
        }
    }
}
export const removeOption =(question, option) => {
    return{
        type: 'REMOVE_OPTION',
        payload:{
            option,
            question,
        }
    }
}
export const chooseOption =(question, option) => {
    return{
        type: 'CHOOSE_OPTION',
        payload:{
            option,
            question,
        }
    }
}
export const toggleOption =(question, option) => {
    return{
        type: 'TOGGLE_OPTION',
        payload:{
            option,
            question,
        }
    }
}
export const toggleRequirement =(question) => {
    return{
        type: 'TOGGLE_REQUIREMENT',
        payload:{
            question,
        }
    }
}
export const saveTime =(year, month, date) => {
    return{
        type: 'SAVE_TIME',
        payload:{
            year,
            month,
            date
        }
    }
}
export const checkData =(questionnaire) => {
    return{
        type: 'CHECK_DATA',
        payload:{
            questionnaire
        }
    }
}