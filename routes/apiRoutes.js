const express = require('express')
const router = express.Router()

router.use('/auth', require('../controllers/auth/routeController'))
router.use('/engineers', require('../controllers/projects/routeController')) // adjust if needed
router.use('/projects', require('../controllers/projects/routeController'))

module.exports = router
