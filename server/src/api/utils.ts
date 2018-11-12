function parseObject(row) {
	return Object.assign(
		{ ...JSON.parse(row.data) },
		{
			id: row.id,
			parentId: row.parentId,
			type: row.type,
			totalCount: row['full_count']
		}
	)
}

function getBaseQuery(type, parentId?): String {
	let query =
		'SELECT Sfid as id, count(*) OVER() AS full_count, Mock_Container__c as parentId, Type__c as type, Data__c as data'
	query += ' FROM sfgc.mock_container__c'
	query += ` WHERE Type__c='${type}'`
	if (parentId) query += ` AND Mock_Container__c='${parentId}'`

	return query
}

export { parseObject, getBaseQuery }
