import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as models from '../models'
import * as _ from 'lodash'

async function fetchFamilyTree(req, res) {
	try {
		const prospectId = req.query.prospectId
		const query = utils.getBaseQuery(types.goals, null, prospectId)
		const result = await db.query(query)

		let familyTree = Object.assign({}, models.familyTree)

		if (result.rows.length > 0) {
			familyTree = utils.parseObject(result.rows[0])
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(familyTree, null, 2))
	} catch (err) {
		console.error(err)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

export { fetchFamilyTree }
