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
			console.log('Couldn not fetch prospect. Error details:', err)
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
	}
}
