const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');

// Route for the root path ("/"), handled by the homeController's home function
router.get('/', homeController.home);

// Routes starting with "/project" are delegated to another router defined in "./project"
router.use('/project', require('./project'));

module.exports = router;
