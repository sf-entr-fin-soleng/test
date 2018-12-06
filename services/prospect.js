import Api from './api'

function buildProspectURL(searchParams) {
	const params = { ...searchParams }
	let endpoint = `/api/prospect/getAll.json?perPage=
			${params.perPage}&offset=${params.offset}`

	if (params.term) {
		endpoint += `&filter=${params.term}&filterBy=${params.filterBy}`
	}

	if (params.order && params.orderBy) {
		endpoint += `&orderBy=${params.orderBy}&order=${params.order}`
	}

	return endpoint
}

async function fetchProspects(searchParams) {
	try {
		const url = buildProspectURL(searchParams)
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		console.error(err)
		return []
	}
}

async function fetchProspectById(id) {
	try {
		const url = `/api/prospect/getOne.json?id=${id}`
		const { data } = await Api().get(url)

		return data
	} catch (err) {
		console.error(Api.defaults.baseURL, err)
	}
}

async function saveProspect(prospect) {
	try {
		const url = `/api/prospect/saveOne.json`
		const result = await Api().post(url, prospect)

		return result
	} catch (err) {
		throw err
	}
}

export { fetchProspects, fetchProspectById, saveProspect }
