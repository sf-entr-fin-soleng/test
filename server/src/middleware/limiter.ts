import * as pg from 'pg'
import { RateLimiterMemory, RateLimiterPostgres } from 'rate-limiter-flexible'

const client = new pg.Pool({
	connectionString: process.env.DATABASE_URL
	//ssl: process.env.LOCAL
})

const opts = {
	storeClient: client,
	points: 15, // Number of points
	duration: 1, // Per second(s)

	// Custom
	tableName: 'bantable', // if not provided, keyPrefix used as table name
	keyPrefix: 'genLimiter', // must be unique for limiters with different purpose

	execEvenly: true, // Do not delay actions evenly
	blockDuration: 10, // Block for 10 seconds if consumed more than `points`

	inmemoryBlockOnConsumed: 20, // If 20 points consumed in current duration
	inmemoryBlockDuration: 30, // block for 30 seconds in current process memory
	insuranceLimiter: new RateLimiterMemory(
		// It will be used only database error as insurance
		// Can be any implemented limiter like RateLimiterMemory or RateLimiterRedis extended from RateLimiterAbstract
		{
			points: 1, // 1 is fair if you have 5 workers and 1 cluster
			duration: 1
		}
	)
}

const rateLimiter = new RateLimiterPostgres(opts, (err) => {})

export { rateLimiter }
