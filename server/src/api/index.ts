/* eslint-disable prettier/prettier */
const { Router } = require('express')
import * as routes from './routes'
import { isAuthenticated } from '../middleware'

const options = { caseSensitive: false }
const router = new Router(options)

// Prospect routes
router.all('/*', isAuthenticated)

router.get('/prospect/getAll.json', routes.prospect.fetchProspects)
router.get('/prospect/getOne.json', routes.prospect.fetchProspect)
router.post('/prospect/saveOne.json', routes.prospect.saveProspect)

// Goal routes
router.get('/goal/getAll.json',  routes.goals.fetchGoals)
router.get('/goal/detail/getAll.json',  routes.goals.fetchGoalDetails)
router.post('/goal/detail/saveAll.json',  routes.goals.saveDetails)

// Family-Tree routes
router.get('/family-tree/getOne.json',  routes.familyTree.fetchFamilyTree)
router.post('/family-tree/saveOne.json',  routes.familyTree.saveFamilyTree)

// Questionnaire routes
router.get('/questionnaire/getOne.json',  routes.questionnaire.fetchQuestionnaire)
router.get('/questionnaire/answers/getOne.json',  routes.questionnaire.fetchAnswers)
router.post('/questionnaire/answers/saveOne.json',  routes.questionnaire.saveAnswers)

export default router
