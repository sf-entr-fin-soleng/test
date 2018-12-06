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

	[types.familyTree.mutation.WRITE_TREE_SUCCESS](state) {},

	[types.familyTree.mutation.WRITE_NODE_START](state, params) {
		const { path, node, isDelete, changedPath, initAsArray } = params

		let value = get(state.tree, path)

		// Split path into its parameters
		const pathComponents = path.split('.')

		// Control variables
		const fromArray = !isNaN(
			parseInt(pathComponents[pathComponents.length - 1])
		)

		console.log(pathComponents, fromArray, changedPath)

		// If this is a deletion operation
		if (isDelete) {
			// If value is contained within an array,
			// delete item from array but keep others
			if (fromArray) {
				// Fetch original index, and make sure path is
				// original path minus the array
				const arrayIndex = parseInt(
					pathComponents[pathComponents.length - 1]
				)

				const arrayPath = pathComponents
					.slice(0, pathComponents.length - 1)
					.join('.')

				// Fetch array from the tree and splice
				// its reference at the given index
				const array = get(state.tree, arrayPath, [])
				array.splice(arrayIndex, 1)

				// Set it back to the tree (unecessary?)
				set(state.tree, arrayPath, array)
			}
			// Otherwise just unset the value
			else {
				unset(state.tree, path)
			}
		}
		// Inserting into
		else {
			if (fromArray && changedPath) {
				const arrayPath = pathComponents
					.splice(0, pathComponents.length - 1)
					.join('.')
				const array = get(state.tree, arrayPath, [])

				array.push(node)
			} else {
				// If value is undefined, initialize
				// it and store it back in the tree
				if (value === undefined) {
					set(
						state.tree,
						path,
						fromArray ||
						pathComponents[pathComponents.length - 1] === 'children' // hotfix for grandchildren getting added wrongly, get this crap out of here asap
							? []
							: {}
					)
					value = get(state.tree, path)
				}

				if (isArray(value)) value.push(node)
				else set(state.tree, path, node)
			}
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
	[types.familyTree.action.WRITE_NODE]({ commit }, params) {
		commit(types.familyTree.mutation.WRITE_NODE_START, {
			...params
		})
	},
	[types.familyTree.action.ASSIGN_PROSPECTS]({ commit }, prospectList) {
		const clonedList = cloneDeep(prospectList)
		commit(types.familyTree.mutation.ASSIGN_PROSPECTS, clonedList)
	}
}
