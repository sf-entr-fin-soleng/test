import * as moment from 'moment'

const generate = require('nanoid/generate')
const alphabet =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function parseObject(row) {
	return {
		...JSON.parse(row.data),
		id: row.id,
		parentId: row.parentid,
		type: row.type,
		totalCount: row.full_count
	}
}

function getBaseQuery(type, id?, parentId?): string {
	let query = `SELECT Sfid as sfid, Heroku_Id__c as id,
	Heroku_Parent_Id__c as parentId, Type__c as type,
	Data__c as data, count(*) OVER() AS full_count`

	query += ' FROM sfgc.mock_container__c'
	query += ` WHERE Type__c='${type}'`
	if (parentId) { query += ` AND Heroku_Parent_Id__c='${parentId}'` }
	if (id) { query += ` AND Heroku_Id__c = '${id}'` }

	console.log(`[${moment().toString()}][DB_READ]: ${query}`)
	return query
}

function getWriteQuery(type: string, data, isInsert): string {

	const parseData = (dataString: string) => {
		return JSON.stringify(
			dataString,
			(key, value) =>
				value !== undefined && value !== null ? value : undefined,
			0
		)
	}

	let query = ''

	if (isInsert) {
		data.id = uuid()
		query = `INSERT INTO sfgc.mock_container__c (Heroku_Id__c, Type__c, Data__c, Heroku_Parent_Id__c)`
		query += ` VALUES ('${data.id}', '${type}', '${parseData(data)}'`
		query += `,'${data.parentId ? data.parentId : 'null'}')`
		query +=
			' RETURNING heroku_id__c as id, heroku_parent_id__c as parentId, type__c as type, data__c as data'
	} else {
		query = `UPDATE sfgc.mock_container__c SET Data__c = '${parseData(
			data
		)}'`
		query += `, Heroku_Parent_Id__c = '${data.parentId ? data.parentId : 'null'}'`
		query += ` WHERE Heroku_Id__c = '${data.id}'`
		query +=
			' RETURNING heroku_id__c as id, heroku_parent_id__c as parentId, type__c as type, data__c as data'
	}

	console.log(`[${moment().toString()}][DB_WRITE]: ${query}`)
	return query
}

function uuid(size?): string {
	return generate(alphabet, size ? size : 18)
}

export { uuid, generate, alphabet, parseObject, getBaseQuery, getWriteQuery }
