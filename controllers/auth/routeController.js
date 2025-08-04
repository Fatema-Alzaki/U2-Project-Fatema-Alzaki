const express = require('express');
const router = express.Router();
const apiController = require('./apiController');
const viewController = require('./viewController');
const dataController = require('./dataController');


// Signup page (form)
router.get('/signup', viewController.signUp);

// Handle signup form submission
router.post('/signup', dataController.createUser, viewController.redirectToLogin);

// Login page (form)
router.get('/signin', viewController.signIn);

// Handle login form
router.post('/signin', dataController.loginUser, viewController.redirectToHome);

module.exports = router;
