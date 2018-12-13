const state = () => ({})
const mutations = {}
const actions = {
	nuxtServerInit({ state, commit }, { req }) {
		if (req.session.user) {
			commit('user/setUser', req.session.user)
		}
	}
}

export { state, mutations, actions }
