import types from './types'
import services from '../services'

export const state = () => ({
	prospect: {}
})

export const mutations = {
	[types.prospect.mutation.FETCH_SUCCESS](state, prospect) {
		state.prospect = prospect
	}
}

export const actions = {
	async [types.prospect.action.FETCH_PROSPECT]({ commit, state }, id) {
		try {
			const prospect = await services.prospect.fetchProspectById(id)
			commit(types.prospect.mutation.FETCH_SUCCESS, prospect)

			return prospect
		} catch (err) {
			console.error(err)
		}
	}
}
