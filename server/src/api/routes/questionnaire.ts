import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as models from '../models'
import * as _ from 'lodash'

async function fetchQuestionnaire(req, res) {
	try {
		const questionnaireId = req.query.id
		const query = utils.getBaseQuery(
			types.questionnaire,
			questionnaireId,
			null
		)

		const result = await db.query(query)

		let questionnaire = Object.assign({}, models.questionnaire)

		if (result.rows && result.rows.length) {
			questionnaire = Object.assign(
				questionnaire,
				utils.parseObject(result.rows[0])
			)
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(questionnaire, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function fetchAnswers(req, res) {
	try {
		const prospectId = req.query.pid

		const query = utils.getBaseQuery(types.answers, null, prospectId)
		const result = await db.query(query)

		let answers = Object.assign({}, models.answers)
		if (result.rows && result.rows.length) {
			answers = Object.assign(answers, utils.parseObject(result.rows[0]))
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(answers, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function saveAnswers(req, res) {
	try {
		const answers = req.body.answers
		answers.parentId = answers.prospectId

		const query = utils.getWriteQuery(
			types.answers,
			answers,
			answers.id === undefined
		)

		const result = await db.query(query)
		let updated = Object.assign({}, models.answers)
		if (result.rows && result.rows.length) {
			updated = Object.assign(updated, utils.parseObject(result.rows[0]))
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(updated, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

export { fetchQuestionnaire, fetchAnswers, saveAnswers }
