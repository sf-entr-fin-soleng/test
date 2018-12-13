import router from '../api'
import * as crypto from 'crypto-js'
import { Pool } from 'pg'

/* TODO: use pgPool to manage sessions */

const { Router } = require('express')
const options = { caseSensitive: false }
const auth = new Router(options)

auth.get('/callback', (req, res, next) => {
	res.status(200).end('OK')
})

auth.post('/', async (req, res, next) => {
	const shared = process.env.CONSUMER_SECRET
	const signedRequest = req.body.signed_request

	// Split signed request into its two components
	const hashedContext = signedRequest.split('.')[0]
	const b64context = signedRequest.split('.')[1]

	// Sign hash with secret
	const hash = crypto.HmacSHA256(b64context, shared)

	// encrypt signed hash to base64
	const b64Hash = crypto.enc.Base64.stringify(hash)
	if (hashedContext === b64Hash) {
		const words = crypto.enc.Base64.parse(b64context)
		const context = JSON.parse(crypto.enc.Utf8.stringify(words)).context

		try {
			// Postgres client
			const client = new Pool({
				connectionString: process.env.DATABASE_URL
			})

			const result = await client.query(
				`SELECT * FROM sfgc.mock_container__c WHERE heroku_id__c = '${
					context.user.userId
				}'`
			)

			// User does not exists in the database
			if (!result.rows || result.rows.length === 0) {
				await client.query(
					`INSERT INTO sfgc.mock_container__c (Heroku_Id__c, Data__c, Type__c) VALUES ('${
						context.user.userId
					}', '${JSON.stringify(context.user)}', 'User')`
				)
			}

			// Modify session object so that
			// it gets saved to postgres
			req.session.authenticated = true
			req.session.user = context.user

			res.redirect('/')
		} catch (error) {
			// Error logging goes here
		}
	} else {
		res.sendStatus(401).end('Unauthorized')
	}
})

export default auth
