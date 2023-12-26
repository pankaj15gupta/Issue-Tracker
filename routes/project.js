const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controllers');

// Route for creating a project
router.post('/create', projectController.create);

// Route for viewing a project with a specific ID
router.get('/:id', projectController.project);

// Route for creating an issue within a project with a specific ID
router.post('/:id', projectController.createIssue);

module.exports = router;
