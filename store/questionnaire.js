import types from './types'
import services from '../services'

export const state = () => ({
	questionnaire: {},
	answers: {}
})

export const mutations = {
	[types.questionnaire.mutation.QUESTIONNAIRE_FETCH_SUCCESS](
		state,
		questionnaire
	) {
		// Since this is the user's local copy,
		// and the questionnaire object will never
		// be mutated from the front-end, init
		// an .answer prop so we can store user input
		for (let key in questionnaire.questions) {
			const question = questionnaire.questions[key]
			if (question.type === 'textarea') question.answer = ''
			if (question.type === 'number') question.answer = 0
			if (question.type) question.answer = []
		}

		// Store questionnaire
		state.questionnaire = questionnaire
	},

	[types.questionnaire.mutation.ANSWERS_FETCH_SUCCESS](state, answers) {
		// Link answers to questions and then
		// store it in the state
		if (state.questionnaire && answers && answers.responses) {
			for (let key in answers.responses) {
				const question = state.questionnaire.questions[key]
				if (question) question.answer = answers.responses[key]
			}

			state.answers = answers
		}
	},

	[types.questionnaire.mutation.ANSWERS_WRITE_SUCCESS](
		state,
		{ answers, isNext }
	) {
		console.log('Finished writing answers back to the database...', answers)

		const currentSectionId = answers.currentSectionId
		const currentSection = state.questionnaire.sections[currentSectionId]

		const nextSectionId = currentSection ? currentSection.next : undefined
		const prevSectionId = currentSection ? currentSection.prev : undefined

		if (isNext) answers.currentSectionId = nextSectionId
		else answers.currentSectionId = prevSectionId

		state.answers = answers
		console.log(state.answers)
		console.log('isNext', isNext)
	}
}

export const actions = {
	async [types.questionnaire.action.FETCH_QUESTIONNAIRE]({ commit }, qid) {
		try {
			const questionnaire = await services.questionnaire.fetchQuestionnaire(
				qid
			)
			commit(
				types.questionnaire.mutation.QUESTIONNAIRE_FETCH_SUCCESS,
				questionnaire
			)

			return questionnaire
		} catch (err) {
			throw err
		}
	},

	async [types.questionnaire.action.FETCH_ANSWERS]({ commit }, { qid, pid }) {
		try {
			const answers = await services.questionnaire.fetchAnswers(qid, pid)
			commit(types.questionnaire.mutation.ANSWERS_FETCH_SUCCESS, answers)
			return answers
		} catch (err) {
			throw err
		}
	},

	async [types.questionnaire.action.SAVE_ANSWERS](
		{ commit, state },
		{ answers, isNext }
	) {
		try {
			const result = await services.questionnaire.saveAnswers(answers)
			console.log('isNext', isNext)
			commit(types.questionnaire.mutation.ANSWERS_WRITE_SUCCESS, {
				answers,
				isNext
			})

			return result
		} catch (err) {
			throw err
		}
	}
}
