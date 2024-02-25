// User route for the API
const express = require('express');
const router = express.Router();
const categorieController = require('../controller/categorieController');

router.get('/', categorieController.getListCategories);

module.exports = router;