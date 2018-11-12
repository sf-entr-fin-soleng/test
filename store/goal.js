import types from './types'
import services from '../services'

const priorities = {
	nil: 'none',
	top: 'high',
	med: 'medium',
	low: 'low'
}

const base = {
	priority: 'none',
	accept: Object.keys(priorities).map(key => priorities[key]),
	elements: []
}

export const state = () => {
	const goals = {}

	for (let key in priorities) {
		const priority = priorities[key]

		goals[priority] = Object.assign(Object.assign({}, base), {
			priority
		})
	}

	return {
		goals,
		details: {}
	}
}

export const mutations = {
	// Goals are fetched as an array from the server
	// but transformed into a plain object-map since
	// they only contain read-only information
	[types.goal.mutation.FETCH_GOAL_SUCCESS](state, payload) {
		const goalMap = {}

		// Parse each goal into key-value pair
		payload.goals.forEach(goal => {
			// Make sure every goal has a detail associated to id
			goal.detail = { goalId: goal.id }
			goalMap[goal.id] = goal
		})

		// Assign detail to goals
		payload.details.forEach(detail => {
			const goal = goalMap[detail.goalId]
			if (goal) goal.detail = detail
		})

		// Initialize arrays
		for (let key in state.goals) {
			state.goals[key].elements = []
		}

		// Sort into categories
		for (let key in goalMap) {
			const goal = goalMap[key]
			const priority = goal.detail.priority

			state.goals[
				priority ? priority.toString.toLowerCase() : 'none'
			].elements.push({
				...goal
			})
		}

		state.details = payload.details
	},

	[types.goal.mutation.WRITE_DETAIL_SUCCESS](state, { result }) {
		console.log('Goal detail saved to the server...')
	},

	// Mutations called by the component directly
	updateElement(state, { priority, elements }) {
		state.goals[priority].elements = elements
	}
}

export const actions = {
	async [types.goal.action.FETCH_GOALS]({ commit, state }, prospectId) {
		try {
			console.log('fetching goals...', prospectId)
			const goals = await services.goal.fetchGoals()
			const details = await services.goal.fetchDetails(prospectId)

			commit(types.goal.mutation.FETCH_GOAL_SUCCESS, {
				goals,
				details
			})

			//console.log(('details', JSON.stringify(details, null, 2)))

			return goals
		} catch (err) {
			throw err
		}
	},

	async [types.goal.action.WRITE_DETAILS](
		{ commit, state },
		{ prospectId, to }
	) {
		try {
			// Fetch goal information from state
			const goals = state.goals

			// Initialize details container
			const details = { parentId: prospectId, elements: [] }

			// For every priority, fetch all
			// goals assigned to it
			for (let key in state.goals) {
				const goals = state.goals[key].elements

				// If the current 'priority tray' id
				// matches the 'to' target, assign
				// new priority to the goal detail
				goals.forEach(goal => {
					goal.detail.priority =
						key === to ? key : goal.detail.priority
					details.elements.push(goal.detail)
				})
			}

			if (!details.parentId) {
				throw 'Cannot save details for a nil prospect!'
			}

			console.log('saving:', details)

			const result = await services.goal.saveDetails(details)
			commit(types.goal.mutation.WRITE_DETAIL_SUCCESS, { result })

			return result.data
		} catch (err) {
			throw err
		}
	}
}
