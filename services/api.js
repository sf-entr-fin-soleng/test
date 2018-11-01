import axios from 'axios'

export default () => {
	return axios.create({
		baseURL: process.env.BASE_URL,
		withCredentials: false,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
