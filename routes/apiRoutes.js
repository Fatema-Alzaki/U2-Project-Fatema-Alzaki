const express = require('express');
const router = express.Router();

// Auth routes (sign up, sign in)
router.use('/auth', require('../controllers/auth/routeController'));

// Engineer routes
router.use('/engineers', require('../controllers/engineers/routeController'));

// Project routes
router.use('/projects', require('../controllers/projects/routeController'));

// Dashboard (optional: add more routes like /dashboard if needed)

module.exports = router;
