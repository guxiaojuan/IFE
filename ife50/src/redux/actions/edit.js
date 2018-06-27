export const single =(type, question, answer1, answer2) => {
	return{
		type: 'SINGLE',
		payload:{
			type,
			question,
			answer1,
			answer2
		}
	}
}

export const multi = (type, question, answer1, answer2, answer3, answer4) => {
	return {
		type: 'MULTI',
		payload: {
			type,
			question,
			answer1,
			answer2,
			answer3,
			answer4,
		}
	}
}

export const text =(type, question) => {
	return{
		type: 'TEXT',
		payload:{
			type,
			question
		}
	}
}