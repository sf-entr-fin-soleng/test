import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as _ from 'lodash'
import { Request, Response } from 'express'

async function fetchGoals(req: Request, res: Response) {
	try {
		const query = utils.getBaseQuery(types.goals)
		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(
			JSON.stringify(
				result.rows.map((row) => utils.parseObject(row)),
				null,
				2
			)
		)
	} catch (err) {
		// error log goes here

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function fetchGoalDetails(req: Request, res: Response) {
	try {
		const prospectId = req.query.prospectId
		let details = {}

		if (!prospectId || prospectId === 'undefined') {
			throw { code: 500, message: 'Invalid prospect id provided' }
		}

		const query = utils.getBaseQuery(types.goalDetails, null, prospectId)
		const result = await db.query(query)

		if (result.rows.length > 0) {
			const row = result.rows[0]
			details = utils.parseObject(row)
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(details, null, 2))
	} catch (err) {
		res.setHeader('Content-Type', 'application/json')
		res.status(err.code).end(JSON.stringify(err, null, 2))
	}
}

async function saveDetails(req: Request, res: Response) {
	try {
		// Fetch details data from POST body
		const details = req.body
		let query = ''

		if (!details.parentId) {
			throw { statusCode: 500, message: 'No valid parentId' }
		} else {
			query = utils.getBaseQuery(types.prospect, details.parentId)
			const { rows } = await db.query(query)
			if (rows.length <= 0) {
				throw { statusCode: 500, message: 'ParentID does not exist' }
			}
		}

		// If details has no ID assigned,
		// generate unique ID and save it
		// back to the database
		query = utils.getWriteQuery(
			types.goalDetails,
			details,
			details.id === undefined
		)

		// Execute query
		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(details, null, 2))
	} catch (err) {
		res.setHeader('Content-Type', 'application/json')
		res.status(502).end(JSON.stringify(err, null, 2))
	}
}

export { fetchGoals, fetchGoalDetails, saveDetails }
