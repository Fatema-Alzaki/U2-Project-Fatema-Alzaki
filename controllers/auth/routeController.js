const express = require('express');
const router = express.Router();
const apiController = require('./apiController');
const viewController = require('./viewController');
const dataController = require('./dataController');


// Signup page (form)
router.get('/signup', viewController.signUp);

// Handle signup form submission
router.post('/signup', dataController.signUp, viewController.redirectToLogin);

// Login page (form)
router.get('/signin', viewController.signIn);

// Handle login form
router.post('/signin', dataController.loginUser, viewController.redirectToHome);

// Web views

router.get('/profile', apiController.auth, viewController.profile)
router.get('/:id', dataController.profile, viewController.show)
router.get('/:id/edit', dataController.profile, viewController.edit)

// API routes
router.get('/api/profile', apiController.auth, apiController.getProfile)
router.put('/:id', apiController.auth, apiController.updateUser)
router.delete('/:id', apiController.auth, apiController.deleteUser)

module.exports = router;
