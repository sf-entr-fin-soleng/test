const ipqs = {
	prefix: 'ipqs',

	mutation: {
		QUESTIONNAIRE_FETCH_SUCCESS: 'IPQFetchSuccess',
		ANSWERS_FETCH_SUCCESS: 'answersIPQFetchSuccess',
		ANSWERS_WRITE_SUCCESS: 'answersIPQWriteSuccess'
	},

	action: {
		FETCH_QUESTIONNAIRE: 'fetchIPQs',
		FETCH_ANSWERS: 'fetchIPQAnswers',
		SAVE_ANSWERS: 'writeIPQAnswers'
	}
}

export default ipqs
