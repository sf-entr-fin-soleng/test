const generate = require('nanoid/generate')
const alphabet =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function parseObject(row) {
	return Object.assign(
		{ ...JSON.parse(row.data) },
		{
			id: row['id'],
			parentId: row['parentid'],
			type: row['type'],
			totalCount: row['full_count']
		}
	)
}

function getBaseQuery(type, id?, parentId?): string {
	let query =
		'SELECT Sfid as sfid, Heroku_Id__c as id, Heroku_Parent_Id__c as parentId, Type__c as type, Data__c as data, count(*) OVER() AS full_count'
	query += ' FROM sfgc.mock_container__c'
	query += ` WHERE Type__c='${type}'`
	if (parentId) query += ` AND Heroku_Parent_Id__c='${parentId}'`
	if (id) query += ` AND Heroku_Id__c = '${id}'`

	console.log(`[${Date.now().toString()}][DB_READ]: ${query}`)
	return query
}

function getWriteQuery(type, data, isInsert): string {
	const parseData = data => {
		return JSON.stringify(
			data,
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
	} else {
		query = `UPDATE sfgc.mock_container__c SET Data__c = '${parseData(
			data
		)}'`
		// eslint-disable-next-line prettier/prettier
		query += `, Heroku_Parent_Id__c = '${
			data.parentId ? data.parentId : 'null'
		}'`
		query += ` WHERE Heroku_Id__c = '${data.id}'`
	}

	console.log(`[${Date.now().toString()}][DB_WRITE]: ${query}`)
	return query
}

function uuid(size?): string {
	return generate(alphabet, size ? size : 18)
}

export { uuid, generate, alphabet, parseObject, getBaseQuery, getWriteQuery }
