const express = require('express')
const router = express.Router()
const apiController = require('./apiController')
const dataController = require('./dataController')
const viewController = require('./viewController')

// Web views
router.get('/', dataController.index, viewController.index)
router.get('/profile', apiController.auth, viewController.profile)
router.get('/:id', dataController.show, viewController.show)
router.get('/:id/edit', dataController.show, viewController.edit)

// API routes
router.get('/api/profile', apiController.auth, apiController.getProfile)
router.put('/:id', apiController.auth, apiController.updateUser)
router.delete('/:id', apiController.auth, apiController.deleteUser)

module.exports = router
