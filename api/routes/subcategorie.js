// User route for the API
const express = require('express');
const router = express.Router();
const subcategorieController = require('../controller/subcategorieController');

router.get('/', subcategorieController.getListSubcategories);


module.exports = router;