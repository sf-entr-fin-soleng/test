import axios from 'axios'

function buildProspectURL(searchParams) {
	const params = { ...searchParams }
	let endpoint = `api/prospect/getAll.json?perPage=
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
		const result = await axios.get(url)
		return result.data
	} catch (err) {
		console.error(err)
	}
}

export { fetchProspects }
