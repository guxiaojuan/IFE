const initialState = {
    status: 0,
    id:''
}

export default function dialog(state = initialState, action) {
    // console.log(action)
    switch (action.type){
        case 'SWITCH_DIALOG': {
            // const id = action.payload
            const id = state.id
            const status = state.status + 1 & 3
            return Object.assign(
                {},
                state,
                {status, id}
            )
        }
        default:return state
    }
}