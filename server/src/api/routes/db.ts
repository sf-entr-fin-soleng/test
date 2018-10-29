import { Client } from 'pg'

async function connectToDB() {
	try {
		const client = instantiateClient()
		await client.connect()

		return client
	} catch (err) {
		throw err
	}
}

async function query(query) {
	try {
		const client = await connectToDB()
		const result = await client.query(query)
		client.end()

		return result
	} catch (err) {
		throw err
	}
}

function instantiateClient(): Client {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		database: 'sfgc'
		//ssl: process.env.LOCAL
	})

	return client
}

export { instantiateClient, connectToDB, query }
