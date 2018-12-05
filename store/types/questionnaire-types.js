const questionnaire = {
	prefix: 'questionnaire',

	mutation: {
		QUESTIONNAIRE_FETCH_SUCCESS: 'qFetchSuccess',
		ANSWERS_FETCH_SUCCESS: 'answersFetchSuccess',
		ANSWERS_WRITE_SUCCESS: 'answersWriteSuccess'
	},

	action: {
		FETCH_QUESTIONNAIRE: 'fetchQuestionnaire',
		FETCH_ANSWERS: 'fetchAnswers',
		SAVE_ANSWERS: 'writeAnswers'
	}
}

export default questionnaire
