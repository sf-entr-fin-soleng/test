import types from './types'
import services from '../services'

import { get, set, cloneDeep, isArray, remove, unset, omitBy } from 'lodash'

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

	[types.familyTree.mutation.WRITE_NODE_START](
		state,
		{ path, node, isInsert }
	) {
		const value = get(state.tree, path)
		const debugVal = JSON.stringify(value)

		// Split path into its parameters
		const params = path.split('.')

		// Path points to an element inside an array
		if (
			params[params.length - 1] !== undefined &&
			!isNaN(parseInt(params[params.length - 1]))
		) {
			console.log('It is an element inside an array', params)
			if (isInsert) {
				console.log(
					'... and it is setting the same node inside the tree, path:',
					path
				)
				set(state.tree, path, node)
			} else {
				const arrayIndex = parseInt(params[params.length - 1])
				console.log(
					'... and it is removing from the array inside the tree, path:',
					path
				)

				const arrayPath = params.slice(0, params.length - 1).join('.')
				let array = get(state.tree, arrayPath, [])
				array.splice(arrayIndex, 1)

				set(state.tree, arrayPath, array)
			}
		}
		// or path in itself points to an array
		// as is the case with a new insertion
		else if (value && isArray(value)) {
			console.log('It is an array already')
			if (isInsert) {
				console.log('..and we are pushing a new element to the array')
				value.push(node)
			} else {
				console.log('..and we are removing element')
				remove(value, el => el == node)
			}
		}
		// of if it points to a single set element
		else {
			if (isInsert) {
				set(state.tree, path, node)
			} else {
				unset(state.tree, path)

				// Make sure all nodes on the tree are
				// not undefined or null
				state.tree = JSON.parse(
					JSON.stringify(state.tree, (key, value) => {
						if (value !== undefined && value !== null) return value
					})
				)
			}
		}

		// throw { message: 'stop-here' }
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

	[types.familyTree.action.WRITE_NODE]({ commit }, { path, node, isInsert }) {
		commit(types.familyTree.mutation.WRITE_NODE_START, {
			path,
			node,
			isInsert
		})
	},

	[types.familyTree.action.ASSIGN_PROSPECTS]({ commit }, prospectList) {
		const clonedList = cloneDeep(prospectList)
		commit(types.familyTree.mutation.ASSIGN_PROSPECTS, clonedList)
	}
}
