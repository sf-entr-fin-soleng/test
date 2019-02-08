import Api from './api'

async function fetchIPQs(ipqId) {
	try {
		const url = `/api/ipqs/getOne.json?qid=${ipqId}`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		// error log goes here
	}
}

async function fetchIPQAnswers(qid, pid) {
	try {
		const url = `/api/ipqs/answers/getOne.json?qid=${qid}&pid=${pid}`

		const { data } = await Api().get(url)
		return data
	} catch (err) {
		// error log goes here
	}
}

async function saveIPQAnswers(answers) {
	try {
		const url = `/api/ipqs/answers/saveOne.json`
		const result = await Api().post(url, {
			prospectId: answers.prospectId,
			answers
		})

		return result
	} catch (err) {
		throw err
	}
}

export { fetchIPQs, fetchIPQAnswers, saveIPQAnswers }
