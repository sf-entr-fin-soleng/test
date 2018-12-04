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

	[types.questionnaire.mutation.ANSWERS_WRITE_SUCCESS](state, answers) {
		console.log('Finished writing answers back to the database...')
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
		{ pid, qid, answers }
	) {
		try {
			const result = await services.questionnaire.saveAnswers(
				pid,
				qid,
				answers
			)
			commit(types.questionnaire.mutation.ANSWERS_WRITE_SUCCESS, {
				result
			})

			return result
		} catch (err) {
			throw err
		}
	}
}
