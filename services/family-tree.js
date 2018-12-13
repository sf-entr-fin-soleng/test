import Api from './api'

async function fetchFamilyTree(prospectId) {
	try {
		const url = `/api/family-tree/getOne.json?prospectId=${prospectId}`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		// error log goes here
	}
}

async function saveFamilyTree(prospectId, tree) {
	try {
		const url = `/api/family-tree/saveOne.json`
		const result = Api().post(url, { prospectId, tree })

		return result
	} catch (err) {
		throw err
	}
}

export { fetchFamilyTree, saveFamilyTree }
