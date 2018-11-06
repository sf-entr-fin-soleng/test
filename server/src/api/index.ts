const { Router } = require('express')
import * as routes from './routes'

const options = { caseSensitive: false }
const router = new Router(options)

// Prospect routes
router.get('/prospect/getAll.json', routes.prospect.fetchProspects)
router.get('/prospect/getOne.json', routes.prospect.fetchProspect)
router.post('/prospect/saveOne.json', routes.prospect.saveProspect)

export default router
