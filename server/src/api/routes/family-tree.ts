import * as db from './db'
import * as utils from '../utils'
import types from '../types'
import * as models from '../models'
import * as _ from 'lodash'

async function fetchFamilyTree(req, res) {
	try {
		const prospectId = req.query.prospectId
		const query = utils.getBaseQuery(types.familyTree, null, prospectId)
		const result = await db.query(query)

		let familyTree = Object.assign({}, models.familyTree)

		if (result.rows.length > 0) {
			familyTree = utils.parseObject(result.rows[0])
		}

		if (familyTree.self && familyTree.partner) {
			if (familyTree.self.firstName && familyTree.partner.firstName) {
				familyTree.both.firstName = 'Both'
				familyTree.both.lastName = `${familyTree.self.firstName} & ${
					familyTree.partner.firstName
				}`
			}
		}

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(familyTree, null, 2))
	} catch (err) {
		console.error(err)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

async function saveFamilyTree(req, res) {
	try {
		console.log('Family tree:', req.body)

		const prospectId = req.body.prospectId
		const tree = req.body.tree

		tree.parentId = prospectId
		const query = utils.getWriteQuery(
			types.familyTree,
			tree,
			tree.id === undefined
		)

		const result = await db.query(query)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result, null, 2))
	} catch (err) {
		console.error(err)

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(err, null, 2))
	}
}

export { fetchFamilyTree, saveFamilyTree }
