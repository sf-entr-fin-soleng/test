import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as models from '../models'
import * as _ from 'lodash'
import { Request, Response } from 'express'

async function fetchQuestionnaire(req: Request, res: Response) {
	try {
		const questionnaireId = req.query.id
		const query = utils.getBaseQuery(
			types.questionnaire,
			questionnaireId,
			null
		)

		const result = await db.query(query)

		let questionnaire = {...models.questionnaire}

		if (result.rows && result.rows.length) {
			questionnaire = {
				...questionnaire,
				...utils.parseObject(result.rows[0])
			}
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(questionnaire, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function fetchAnswers(req: Request, res: Response) {
	try {
		const prospectId = req.query.pid

		const query = utils.getBaseQuery(types.answers, null, prospectId)
		const result = await db.query(query)

		let answers = {...models.answers}
		if (result.rows && result.rows.length) {
			answers = {...answers, ...utils.parseObject(result.rows[0])}
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(answers, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function saveAnswers(req: Request, res: Response) {
	try {
		const answers = req.body.answers
		answers.parentId = answers.prospectId

		const query = utils.getWriteQuery(
			types.answers,
			answers,
			answers.id === undefined
		)

		const result = await db.query(query)
		let updated = {...models.answers}
		if (result.rows && result.rows.length) {
			updated = {...updated, ...utils.parseObject(result.rows[0])}
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(updated, null, 2))
	} catch (err) {
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

export { fetchQuestionnaire, fetchAnswers, saveAnswers }
