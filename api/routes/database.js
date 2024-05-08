// User route for the API
const express = require('express');
const router = express.Router();
const databaseController = require('../controller/databaseController');

router.get('/', databaseController.createDatabase);
router.get('/init', databaseController.initDatabase);

module.exports = router;