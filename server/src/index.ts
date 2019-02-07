import router from './api'
import auth from './auth'
import { rateLimiter } from './middleware'

require('dotenv').config()
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as consola from 'consola'
import * as morgan from 'morgan'
import * as fs from 'fs'
import * as https from 'https'
import * as path from 'path'
import * as session from 'express-session'
import * as cors from 'cors'
import * as helmet from 'helmet'
import { Nuxt, Builder } from 'nuxt'

const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const pgSession = require('connect-pg-simple')(session)

// Import and Set Nuxt.js options
const config = require('../../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
	// Init Nuxt.js
	const nuxt = new Nuxt(config)

	// Build only in dev mode
	if (config.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	// Give nuxt middleware to express
	app.use(nuxt.render)

	// Start the server
	if (config.dev) {
		// !!!!!!! THIS SHOULD NOT EVER MAKE ITS WAY INTO PRODUCTION
		// !!!!!!! AS IT IS A MAJOR SECURITY FLAW. USE FOR LOCALHOST
		// !!!!!!! SSL CONNECTION ONLY
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
		const options = {
			key: fs.readFileSync(path.resolve('localhost-ssl/server.key')),
			cert: fs.readFileSync(path.resolve('localhost-ssl/server.crt'))
		}
		https.createServer(options, app).listen(port)
	} else {
		app.listen(port as number, host)
	}

	// Too lazy for a typings file right now
	(consola as any).ready({
		message: `Server listening on ${host}:${port}`,
		badge: true
	})
}

// Helmet security
app.use(
	helmet({
		frameguard: false
	})
)

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
const corsOptions = {
	origin: process.env.API_URL,
	credentials: true
}

app.use(cors(corsOptions))

// Session store
app.use(
	session({
		store: new pgSession({
			conString: process.env.DATABASE_URL
		}),
		secret: process.env.PG_SESSION_SECRET,
		name: process.env.EXPRESS_COOKIE_NAME,
		resave: false,
		saveUninitialized: false,
		proxy: !config.dev,
		cookie: {
			maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
			secure: true
		}
	})
)

// Logger
app.use(morgan('dev'))

// Routers
// app.all('*', (req, res, next) => {
// 	rateLimiter
// 		.consume(req.connection.remoteAddress)
// 		.then(() => {
// 			next()
// 		})
// 		.catch(rejRes => {
// 			res.status(429).send('Too Many Requests')
// 		})
// })
app.use('/auth', auth)
app.use('/api', router)

start()
