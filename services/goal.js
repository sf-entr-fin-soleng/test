import Api from './api'

async function fetchGoals() {
	try {
		const url = `/api/goal/getAll.json`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		console.error(err)
	}
}

async function fetchDetails(prospectId) {
	try {
		const url = `/api/goal/detail/getAll.json?prospectId=${prospectId}`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		throw err
	}
}

async function saveDetails(goalDetails) {
	try {
		const url = `/api/goal/detail/saveAll.json`
		const result = Api().post(url, goalDetails)

		return result
	} catch (err) {
		throw err
	}
}

export { fetchGoals, fetchDetails, saveDetails }
