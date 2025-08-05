const express = require('express');
const router = express.Router();

const apiController = require('./apiController');
const dataController = require('./dataController');
const viewController = require('./viewController');
const apiUserController = require('../../controllers/auth/apiController');

// ----------------------
// 🌐 View Routes
// ----------------------

// All Projects Index
router.get('/', apiUserController.auth, viewController.index);

// Create New Project Form
router.get('/new', apiUserController.auth, viewController.new);

// My Volunteered Projects
router.get('/volunteered', apiUserController.auth, viewController.volunteered);

// My Created Projects
router.get('/my', apiUserController.auth, viewController.myProjects);

// Show Project Details
router.get('/:id', apiUserController.auth, viewController.show);

// Edit Project Form
router.get('/:id/edit', apiUserController.auth, viewController.edit);

// ----------------------
// 🔁 Data / API Routes
// ----------------------

// Create New Project (POST form)
router.post('/', apiUserController.auth, dataController.createProject);

// Volunteer for a Project
router.post('/:id/signup', apiUserController.auth, dataController.signupForProject);

// Add Comment to Project
router.post('/:id/comments', apiUserController.auth, dataController.addComment);

// Update Project
router.put('/:id', apiUserController.auth, dataController.updateProject);

// Delete Project
router.delete('/:id', apiUserController.auth, dataController.deleteProject);

module.exports = router;