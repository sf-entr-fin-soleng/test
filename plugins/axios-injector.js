import { initApi } from '../services/api'

export default ({ app, store }) => {
	initApi(app.$axios)
}
