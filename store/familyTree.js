import types from './types'
import services from '../services'

import { get, set } from 'lodash'

export const state = () => {
	return {
		tree: {}
	}
}

export const mutations = {
	[types.familyTree.mutation.FETCH_TREE_SUCCESS](state, tree) {
		state.tree = tree
	},

	[types.familyTree.mutation.WRITE_TREE_SUCCESS](state) {
		console.log('Tree written back to the database')
	},

	[types.familyTree.mutation.WRITE_NODE_START](state, { path, node }) {
		const value = get(state.tree, path)
		if (value && value.length) {
			value.push(node)
			set(state.tree, path, value)
		} else if (value) {
			set(state.tree, path, node)
		}
	}
}

export const actions = {
	async [types.familyTree.action.FETCH_TREE]({ commit }, prospectId) {
		const tree = await services.familyTree.fetchFamilyTree(prospectId)
		commit(types.familyTree.mutation.FETCH_TREE_SUCCESS, tree)
	},

	async [types.familyTree.action.WRITE_TREE]({ state, commit }, prospectId) {
		const result = await services.familyTree.saveFamilyTree(
			prospectId,
			state.tree
		)
		commit(types.familyTree.mutation.WRITE_TREE_SUCCESS)
		return result
	},

	[types.familyTree.action.WRITE_NODE]({ commit }, { path, node }) {
		commit(types.familyTree.mutation.WRITE_NODE_START, { path, node })
	}
}
