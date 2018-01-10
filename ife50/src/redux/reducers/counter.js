

const initialState = {
    counts: 0,
    counter: 0
}

export default function counter (state = initialState, action) {
    state = state || {counter:0,counts:0};
    switch (action.type) {
        case 'INCREMENT':
            return {counts:state.counts + 1,counter:state.counter + 1}
        case 'DECREMENT':
            return {counts:state.counts + 1,counter:state.counter - 1}
        default:
            return state
    }
}