import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as models from '../models'
import * as _ from 'lodash'
import { Request, Response } from 'express'

async function fetchIPQs(req: Request, res: Response) {
	try {
		const ipqId = req.query.id
		const query = utils.getBaseQuery(
			types.ipq,
			ipqId,
			null
		)

		const result = await db.query(query)

		let ipq = {...models.ipq}

		if (result.rows && result.rows.length) {
			ipq = {
				...ipq,
				...utils.parseObject(result.rows[0])
			}
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(ipq, null, 2))
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function fetchIPQAnswers(req: Request, res: Response) {
	try {
		const prospectId = req.query.pid

		const query = utils.getBaseQuery(types.ipqAnswers, null, prospectId)
		const result = await db.query(query)

		let answers = {...models.ipq}
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

async function saveIPQAnswers(req: Request, res: Response) {
	try {
		const answers = req.body.answers
		answers.parentId = answers.prospectId

		const query = utils.getWriteQuery(
			types.ipqAnswers,
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

export { fetchIPQs, fetchIPQAnswers, saveIPQAnswers }
