import types from './types'
import services from '../services'

export const state = () => {
	return {
		tree: {}
	}
}

export const mutations = {
	[types.familyTree.mutation.FETCH_TREE_SUCCESS](state, tree) {
		state.tree = tree
	}
}

export const actions = {
	async [types.familyTree.action.FETCH_TREE]({ commit }, prospectId) {
		const tree = await services.familyTree.fetchFamilyTree(prospectId)
		commit(types.familyTree.mutation.FETCH_TREE_SUCCESS, tree)
	}
}
