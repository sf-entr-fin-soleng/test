import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as _ from 'lodash'
import { Request, Response } from 'express';

async function fetchProspects(req: Request, res: Response) {
	try {
		const constraints = { ...req.query }
		const query = utils.getBaseQuery(
			types.prospect,
			undefined,
			req.session.user.userId
		)

		const result = await db.query(query)
		let prospects = result.rows.map((row) => utils.parseObject(row))

		if (constraints.orderBy && constraints.order) {
			prospects = _.orderBy(
				prospects,
				[constraints.orderBy],
				[constraints.order]
			)
		}

		if (constraints.filterBy && constraints.filter) {
			const fields = constraints.filterBy.split(',')
			prospects = prospects.filter((el) => {
				for (const index in fields) {
					if (fields[index]) {
						const field = fields[index]
						if (
							el[field] &&
							el[field]
								.toString()
								.toLowerCase()
								.includes(constraints.filter.toLowerCase())
						) {
							return true
						}
					}
				}
				return false
			})

			prospects.forEach(
				(prospect) => (prospect.totalCount = prospects.length)
			)
		}

		if (constraints.perPage && constraints.offset) {
			prospects = prospects.slice(
				constraints.offset,
				(constraints.offset / constraints.perPage + 1) *
					constraints.perPage
			)
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(prospects, null, 2))
	} catch (err) {
		res.setHeader('Content-Type', 'application/json')
		res.status(500).end(JSON.stringify(err, null, 2))
	}
}

async function fetchProspect(req: Request, res: Response) {
	try {
		// Get base SQL query and await for
		// postgres promise to resolve
		const query = utils.getBaseQuery(
			types.prospect,
			req.query.id,
			req.session.user.userId
		)
		const result = await db.query(query)

		// Prospect container
		let prospect = {}

		// Assign row properties to container
		// only if there are actually any results
		if (result.rowCount > 0) {
			const row = result.rows[0]
			prospect = utils.parseObject(row)
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(prospect, null, 2))
	} catch (err) {
		res.status(500).setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function saveProspect(req: Request, res: Response) {
	try {
		// Fetch prospect data from POST body
		const prospect = req.body
		prospect.parentId = req.session.user.userId
		if (!prospect.parentId) { throw { message: 'NO' } }

		// If prospect has no ID assigned,
		// generate unique ID and save it
		// back to the database
		const query = utils.getWriteQuery(
			types.prospect,
			prospect,
			prospect.id === undefined
		)

		// Stringify prospect and initialize
		// query string (will be built dynamically)
		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result, null, 2))
	} catch (err) {
		console.error(err)
		res.setHeader('Content-Type', 'application/json')
		res.status(502).end(JSON.stringify(err, null, 2))
	}
}

export { fetchProspect, fetchProspects, saveProspect }
