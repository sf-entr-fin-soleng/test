import types from './types'
import services from '../services'
import { cloneDeep } from 'lodash'

const priorities = {
	nil: 'none',
	top: 'high',
	med: 'medium',
	low: 'low'
}

const base = {
	priority: 'none',
	accept: Object.keys(priorities).map(key => priorities[key]),
	details: []
}

export const state = () => {
	const trays = {}

	for (let key in priorities) {
		const priority = priorities[key]

		trays[priority] = Object.assign(Object.assign({}, base), {
			priority
		})
	}

	return {
		trays,
		goals: {},
		detailInfo: {}
	}
}

export const mutations = {
	fetchFinished(state, payload) {
		payload.goals.forEach(goal => (state.goals[goal.id] = goal))

		const detailInfo = {
			id: undefined,
			parentId: payload.prospectId,
			trays: {},
			...payload.detailInfo
		}

		// Initialize goal trays
		for (let key in state.trays) state.trays[key].details = []

		if (detailInfo.id) {
			for (let key in priorities) {
				const priority = priorities[key]
				detailInfo.trays[priority].details.forEach(detail => {
					state.trays[priority].details.push(detail)
				})
			}
		} else {
			for (let id in state.goals)
				state.trays[priorities.nil].details.push({ goalId: id })
		}

		state.detailInfo = detailInfo
	},

	[types.goal.mutation.WRITE_DETAIL_SUCCESS](state, { result }) {
		state.detailInfo = result
	},

	// Mutations called by the component directly
	updateDetails(state, { priority, details }) {
		state.trays[priority].details = details
	}
}

export const actions = {
	// Initial action, fetch all goals and all
	// details from the server for the specified
	// prospect id. Then, call the mutation that
	// will handle linking goals and details
	async [types.goal.action.FETCH_GOALS]({ commit }, prospectId) {
		try {
			const goals = await services.goal.fetchGoals()
			const detailInfo = await services.goal.fetchDetails(prospectId)

			commit('fetchFinished', { goals, detailInfo, prospectId })

			return goals
		} catch (err) {
			throw err
		}
	},

	async [types.goal.action.WRITE_DETAILS]({ commit, state }) {
		const detailInfo = {
			id: state.detailInfo.id,
			parentId: state.detailInfo.parentId,
			trays: {}
		}

		// Trust what has been put in state
		// by Sortable and Vue's computed props
		for (let key in state.trays) {
			const tray = state.trays[key]
			detailInfo.trays[key] = {}
			detailInfo.trays[key].details = state.trays[key].details
		}

		const result = await services.goal.saveDetails(detailInfo)
		commit(types.goal.mutation.WRITE_DETAIL_SUCCESS, { result })
	}
}
