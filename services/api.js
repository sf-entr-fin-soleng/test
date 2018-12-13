// import axios from 'axios'

// const api = axios.create({
// 	baseURL: process.env.API_URL || 'http://localhost:8080',
// 	withCredentials: true,
// 	headers: {
// 		Accept: 'application/json',
// 		'Content-Type': 'application/json'
// 	}
// })

// export default () => {
// 	return api
// }

let apiInstance

function initApi(instance) {
	apiInstance = instance
}

function Api() {
	return apiInstance
}

export { initApi }
export default Api
