const initialState = {
    status: 0,
    id:''
}

export default function dialog(state = initialState, action) {
    switch (action.type){
        case 'SWITCH_DIALOG': {
            const id = action.payload
            const status = state.status + 1 & 3
            return Object.assign(
                {},
                state,
                {status, id}
            )
        }
    }
}