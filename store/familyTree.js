import types from './types'
import services from '../services'

import { get, set, cloneDeep } from 'lodash'

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
		if (value && value.length !== undefined) {
			value.push(node)
			set(state.tree, path, value)
		} else if (value) {
			set(state.tree, path, node)
		}
	},

	[types.familyTree.mutation.ASSIGN_PROSPECTS](state, prospectList) {
		prospectList.forEach(prospect => {
			const path = prospect.path
			const data = prospect.prospect

			const node = get(state.tree, path, undefined)
			if (node) {
				const result = Object.assign(node, data)
				set(state.tree, path, result)
			}
		})
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
	},

	[types.familyTree.action.ASSIGN_PROSPECTS]({ commit }, prospectList) {
		const clonedList = cloneDeep(prospectList)
		commit(types.familyTree.mutation.ASSIGN_PROSPECTS, clonedList)
	}
}
