import types from './types'
import services from '../services'

export const state = () => ({
	questionnaire: {},
	answers: {}
})

export const mutations = {
	[types.ipqs.mutation.QUESTIONNAIRE_FETCH_SUCCESS](state, questionnaire) {
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

	[types.ipqs.mutation.ANSWERS_FETCH_SUCCESS](state, answers) {
		// Link answers to questions and then
		// store it in the state
		if (state.questionnaire && answers && answers.responses) {
			for (let key in answers.responses) {
				const question = state.questionnaire.questions[key]
				if (question) question.answer = answers.responses[key]
			}

			// Assign first section as current section
			if (!answers.currentSectionId) {
				answers.currentSectionId = Object.keys(
					state.questionnaire.sections
				)[0]
			}

			state.answers = answers
		}
	},

	[types.ipqs.mutation.ANSWERS_WRITE_SUCCESS](state, { answers, isNext }) {
		// Scope constants
		const currentSectionId = answers.currentSectionId

		// Loop control
		const proceedFrom = function(sectionId) {
			const section = state.questionnaire.sections[sectionId]
			if (!section) return undefined

			const newSectionId = section[isNext ? 'next' : 'prev']
			const dependency = state.questionnaire.dependencies[newSectionId]

			// No dependencies at all
			if (!dependency) {
				answers.currentSectionId = newSectionId
			}
			// Found one or more dependencies
			else {
				const triggerQuestion = answers.responses[dependency.dependsOn]
				const triggerAnswer = dependency.answer

				if (
					triggerQuestion &&
					triggerQuestion.value === triggerAnswer
				) {
					answers.currentSectionId = newSectionId
				} else {
					proceedFrom(newSectionId)
				}
			}
		}

		// Proceed from the current section
		proceedFrom(currentSectionId)

		// If after saving we go to an undefined section,
		// it means we either hit the first or the last section
		// possible. Convey that information back to the component
		if (!answers.currentSectionId) answers.moveOn = isNext

		state.answers = answers
	}
}

export const actions = {
	async [types.ipqs.action.FETCH_QUESTIONNAIRE]({ commit }, qid) {
		try {
			const questionnaire = await services.ipqs.fetchIPQs(qid)
			commit(
				types.ipqs.mutation.QUESTIONNAIRE_FETCH_SUCCESS,
				questionnaire
			)

			return questionnaire
		} catch (err) {
			throw err
		}
	},

	async [types.ipqs.action.FETCH_ANSWERS]({ commit }, pid) {
		try {
			const qid = 'IPQ_01' // temporary

			const answers = await services.ipqs.fetchIPQAnswers(qid, pid)
			commit(types.ipqs.mutation.ANSWERS_FETCH_SUCCESS, answers)
			return answers
		} catch (err) {
			throw err
		}
	},

	async [types.ipqs.action.SAVE_ANSWERS]({ commit }, { answers, isNext }) {
		try {
			const result = await services.ipqs.saveIPQAnswers(answers)
			commit(types.ipqs.mutation.ANSWERS_WRITE_SUCCESS, {
				answers: result.data,
				isNext
			})

			return result
		} catch (err) {
			throw err
		}
	}
}
