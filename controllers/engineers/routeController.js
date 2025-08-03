const express = require('express');
const router = express.Router();
const viewController = require('./viewController');
const dataController = require('./dataController');
const apiController = require('./apiController');

router.get('/dashboard', apiController.auth, dataController.getEngineerData, viewController.showDashboard);

module.exports = router;
