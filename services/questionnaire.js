import Api from './api'

async function fetchQuestionnaire(questionnaireId) {
	try {
		const url = `/api/questionnaire/getOne.json?qid=${questionnaireId}`
		const { data } = await Api().get(url)
		return data
	} catch (err) {
		// error log goes here
	}
}

async function fetchAnswers(qid, pid) {
	try {
		const url = `/api/questionnaire/answers/getOne.json?qid=${qid}&pid=${pid}`

		const { data } = await Api().get(url)
		return data
	} catch (err) {
		// error log goes here
	}
}

async function saveAnswers(answers) {
	try {
		const url = `/api/questionnaire/answers/saveOne.json`
		const result = await Api().post(url, {
			prospectId: answers.prospectId,
			questionnaireId: answers.questionnaireId,
			answers
		})

		return result
	} catch (err) {
		throw err
	}
}

export { fetchQuestionnaire, fetchAnswers, saveAnswers }
