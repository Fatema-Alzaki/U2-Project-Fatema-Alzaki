const express = require('express');
const router = express.Router();

const apiController = require('../auth/apiController');
const dataController = require('./dataController');
const viewController = require('./viewController');

// Show all projects
router.get('/', viewController.index);

// Show new project form
router.get('/new', apiController.auth, viewController.newForm);

// Show single project
router.get('/:id', viewController.show);

// Create new project
router.post('/', apiController.auth, dataController.createProject);

// Sign up for a project (volunteer logic)
router.post('/:id/signup', apiController.auth, dataController.signupForProject);

// Comment on a project
router.post('/:id/comments', apiController.auth, dataController.addComment);

// Edit project
router.get('/:id/edit', apiController.auth, viewController.editForm);
router.put('/:id', apiController.auth, dataController.updateProject);

// Delete project
router.delete('/:id', apiController.auth, dataController.deleteProject);

module.exports = router;
