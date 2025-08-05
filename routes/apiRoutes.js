// routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const userApi = require('../controllers/auth/apiController');
const projectApi = require('../controllers/projects/apiController');
const engineerApi = require('../controllers/engineers/apiController');

// Dashboard route (for engineers)
router.get('/engineers/dashboard', engineerApi.auth, engineerApi.dashboard);

// -------------------
// Auth (User API)
// -------------------
router.post('/users', userApi.createUser);               // Register
router.post('/users/login', userApi.loginUser);          // Login
router.get('/users/profile', userApi.auth, userApi.getProfile); // Profile (protected)
router.put('/users/:id', userApi.auth, userApi.updateUser);     // Update
router.delete('/users/:id', userApi.auth, userApi.deleteUser);  // Delete

// -------------------
// Projects API
// -------------------
router.get('/projects', userApi.auth, projectApi.index);
router.get('/projects/:id', userApi.auth, projectApi.show);
router.post('/projects', userApi.auth, projectApi.create);
router.put('/projects/:id', userApi.auth, projectApi.update);
router.delete('/projects/:id', userApi.auth, projectApi.destroy);
router.post('/projects/:id/signup', userApi.auth, projectApi.volunteer);
router.post('/projects/:id/comments', userApi.auth, projectApi.addComment);

module.exports = router;
