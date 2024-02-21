// User route for the API

const db = require('../db/db');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/middleware');

module.exports = router;
