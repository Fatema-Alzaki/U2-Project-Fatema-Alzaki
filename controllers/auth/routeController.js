const express = require('express')
const router = express.Router()
const dataCtrl = require('./dataController')
const apiCtrl = require('./apiController')
const viewCtrl = require('./viewController')

// API routes
router.post('/register', dataCtrl.register, apiCtrl.register)
router.post('/login', dataCtrl.login, apiCtrl.login)
router.post('/logout', dataCtrl.logout)

// View routes (optional)
router.get('/signup', viewCtrl.showRegister)
router.get('/signin', viewCtrl.showLogin)

module.exports = router
