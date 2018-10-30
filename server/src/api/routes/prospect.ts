import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as _ from 'lodash'

async function fetchProspects(req, res) {
	try {
		const constraints = { ...req.query }
		let query = utils.getBaseQuery(types.prospect)

		if (constraints.perPage && constraints.offset) {
			query += ` LIMIT ${constraints.perPage} OFFSET ${
				constraints.offset
			}`
		}

		const result = await db.query(query)
		let prospects = result.rows.map(row => utils.parseObject(row))

		if (constraints.orderBy && constraints.order) {
			prospects = _.orderBy(
				prospects,
				[constraints.orderBy],
				[constraints.order]
			)
		}

		if (constraints.filterBy && constraints.filter) {
			const fields = constraints.filterBy.split(',')
			console.log('fields', fields)
			prospects = prospects.filter(el => {
				for (let index in fields) {
					const field = fields[index]
					if (
						el[field] &&
						el[field]
							.toString()
							.toLowerCase()
							.includes(constraints.filter.toLowerCase())
					)
						return true
				}
				return false
			})
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(prospects, null, 2))
	} catch (err) {
		console.log(err.stack)
	}
}

async function fetchProspect(req, res) {
	try {
		// prettier-ignore
		const result = await db.query(`SELECT Sfid as id, Mock_Container__c as parentId, Type__c as type, Data__c as data
				FROM sfgc.mock_container__c WHERE Type__c = 'Prospect/Client
				AND Sfid = '${req.query.id}' LIMIT 1`)

		let prospect

		if (result.rowCount > 0) {
			const row = result.rows[0]
			prospect = utils.parseObject(row)
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(prospect, null, 2))
	} catch (err) {
		console.log(err.stack)
	}
}

export { fetchProspect, fetchProspects }
