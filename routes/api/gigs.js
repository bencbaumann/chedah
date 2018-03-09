const router = require('express').Router()
const gigController = require('../../controllers/gigController')

// router.get('/gig/:name?', gigController.findGigByName)
router.get('/gig/:id?', gigController.findGigById)

router.post('/:id', gigController.addGoalToGig)

// query '/api/gigs'
router.get('/gigs', gigController.findAll)

// post to '/api/gigs'
router.post('/gigs', gigController.addGig)

// router.route('/:id').get(gigController.findGigById).put(gigController.updateGig).delete(gigController.removeGig)

module.exports = router
