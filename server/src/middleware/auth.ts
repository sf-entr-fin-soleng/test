import { Pool } from 'pg'

function isAuthenticated(req, res, next) {
	const session = req.session

	if (!session || session.authenticated === undefined) {
		//client.query(`SELECT `)
		res.sendStatus(401).end('Unauthorized')
	} else {
		if (!session.user) {
			// Assign user to session info
			console.log('')
		}

		next()
	}
}

export { isAuthenticated }
