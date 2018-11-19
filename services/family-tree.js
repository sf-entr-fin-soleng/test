import Api from './api'

async function fetchFamilyTree(prospectId) {
	try {
		const url = `/api/family-tree/getOne.json?prospectId=${prospectId}`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		console.error(err)
	}
}

export { fetchFamilyTree }
