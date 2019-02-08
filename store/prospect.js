/* eslint-disable prettier/prettier */
import types from './types'
import services from '../services'

export const state = () => ({
	prospect: {}
})

export const mutations = {
	[types.prospect.mutation.FETCH_SUCCESS](state, prospect) {
		state.prospect = prospect
	},

	[types.prospect.mutation.WRITE_SUCCESS](state, { result }) {}
}

export const actions = {
	async [types.prospect.action.FETCH_PROSPECT]({ commit }, id) {
		try {
			const prospect = await services.prospect.fetchProspectById(id)
			commit(types.prospect.mutation.FETCH_SUCCESS, prospect)

			return prospect
		} catch (err) {
			throw err
		}
	},

	async [types.prospect.action.SAVE_PROSPECT]({ commit, state }, prospect) {
		try {
			const result = await services.prospect.saveProspect(prospect)
			commit(types.prospect.mutation.WRITE_SUCCESS, { result })

			return result
		} catch (err) {
			throw err
		}
	},

	async [types.prospect.action.FETCH_PROSPECT_SCORE]({ commit, state }, id) {
		try {
			// This is purely a mockup. When we get the details on what should
			// be done and how it should be done, score needs to be updated whenever
			// a section is updated (as opposed to being calculated when queried)
			let gammaScore = 0.0
			const totalPossible = 33.0

			const familyTree = await services.familyTree.fetchFamilyTree(id)
			const questionnaire = await services.questionnaire.fetchAnswers('QSN-01', id)
			const goals = await services.goal.fetchDetails(id)

			// Family tree score
			if (familyTree.self.children.length > 0) gammaScore += 1
			if (familyTree.self.parents.length > 0) gammaScore += 1
			if (familyTree.self.family.length > 0) gammaScore += 1
			if (familyTree.self.externals.length > 0) gammaScore += 1
			if (familyTree.partner.firstName) gammaScore += 1
			if (familyTree.partner.children.length > 0) gammaScore += 1
			if (familyTree.partner.parents.length > 0) gammaScore += 1
			if (familyTree.partner.family.length > 0) gammaScore += 1
			if (familyTree.partner.externals.length > 0) gammaScore += 1
			if (familyTree.both.children.length > 0) gammaScore += 1
			if (familyTree.both.externals.length > 0) gammaScore += 1

			// Questionnaire score
			for(let key in questionnaire.responses) {
				if (questionnaire.responses[key]) {
					const response = questionnaire.responses[key]
					if (response instanceof Array && response.length > 0) gammaScore += 1
					else if (!(response instanceof Array) && response !== undefined) gammaScore +1
				}
			}

			// Goals and concerns score
			for(let key in goals) {
				if (goals[key]) {
					const goal = goals[key]
					for (let priority in goal.trays) {
						if (goal.trays[priority]) {
							gammaScore += tray.length
						}
					}
				}
			}
			
			return {
				finalScore: (100.0 * gammaScore) / totalPossible
			}
		} catch (err) {
			throw err
		}
	}
}
