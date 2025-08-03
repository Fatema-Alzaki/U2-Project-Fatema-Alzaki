const express = require('express');
const router = express.Router();
const viewController = require('./viewController');
const dataController = require('./dataController');
const apiController = require('./apiController');

// GET signup page
router.get('/signup', viewController.showSignup);

// POST signup
router.post('/signup', dataController.createUser, apiController.register);

// GET signin page
router.get('/signin', viewController.showSignin);

// POST signin
router.post('/signin', dataController.loginUser, apiController.login);

module.exports = router;
