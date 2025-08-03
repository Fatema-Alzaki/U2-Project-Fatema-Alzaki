const express = require('express')
const router = express.Router()
const viewController = require('./viewController')
const dataController = require('./dataController')
const apiController = require('./apiController')

// Sign up routes
router.get('/signup', viewController.showSignup)
router.post('/signup', dataController.createUser, apiController.setTokenCookie)

// Sign in routes
router.get('/signin', viewController.showSignin)
router.post('/signin', apiController.loginUser)

module.exports = router
