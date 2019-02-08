import { Client } from 'pg'

async function connectToDB() {
	try {
		const client = instantiateClient()
		await client.connect()

		return client
	} catch (err) {
		//// error log goes here
	}
}

async function query(queryString: string) {
	try {
		const client = await connectToDB()
		const result = await client.query(queryString)
		client.end()

		return result
	} catch (err) {
		//// error log goes here
	}
}

function instantiateClient(): Client {
	const client = new Client({
		connectionString: process.env.DATABASE_URL
		//ssl: true
	})

	return client
}

export { instantiateClient, connectToDB, query }
