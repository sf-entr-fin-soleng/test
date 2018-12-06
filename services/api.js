import axios from 'axios'

const api = axios.create({
	baseURL: process.env.BASE_URL || 'http://localhost:8080',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export default () => {
	return api
}
