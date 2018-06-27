const initialState = {
	questionList: []
}

export default function edit(state = initialState, action) {
	switch (action.type) {
		case 'SINGLE': {
			let obj = {
				type: action.payload.type,
				answer1: action.payload.answer1,
				answer2: action.payload.answer2
			}
			return obj
		}
		default: {
			return state
		}
	}
}