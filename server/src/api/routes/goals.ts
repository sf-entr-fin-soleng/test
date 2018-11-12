import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as _ from 'lodash'

async function fetchGoals(req, res) {
	try {
		const query = utils.getBaseQuery(types.goals)
		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result.rows.map(row => utils.parseObject(row))))
	} catch (err) {
		console.error(err)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function fetchGoalDetails(req, res) {
	try {
		const prospectId = req.query.prospectId
		if (!prospectId) {
			throw { code: 500, message: 'Invalid prospect id provided' }
		} else {
			console.log('looking for prospect...', prospectId)
		}

		const query = utils.getBaseQuery(types.goalDetails, prospectId)
		const result = await db.query(query)

		console.log(result.rows)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result.rows.map(row => utils.parseObject(row))))
	} catch (err) {
		console.error(err)
		res.setHeader('Content-Type', 'application/json')
		res.status(err.code).end(JSON.stringify(err, null, 2))
	}
}

async function saveDetails(req, res) {
	try {
		const details = req.body
		const data = JSON.stringify(details)

		let query = ''

		if (!details.parentId) {
			throw { statusCode: 500, message: 'No valid parentId' }
		}

		if (details.id) {
			// UPDATE
			query = `UPDATE sfgc.mock_container__c SET 
			${details.parentId ? `Mock_Container__c = '${details.parentId}',` : ''} 
			Data__c = '${data}', Type__c = 'Goal/Detail' WHERE Sfid = '${details.id}'`
		} else {
			// INSERT
			query = `INSERT INTO sfgc.mock_container__c (${
				details.parentId ? 'Mock_Container__c,' : ''
			} Type__c, Data__c) VALUES (${
				details.parentId ? `'${details.parentId}',` : ''
			} 'Goal/Detail', '${data}' )`
		}

		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result, null, 2))
	} catch (err) {
		console.error(err)
		res.setHeader('Content-Type', 'application/json')
		res.status(502).end(JSON.stringify(err, null, 2))
	}
}

export { fetchGoals, fetchGoalDetails, saveDetails }
