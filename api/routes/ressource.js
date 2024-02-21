// User route for the API
const express = require('express');
const router = express.Router();
const ressourceController = require('../controller/ressourceController');

router.get('/', ressourceController.getListRessources);

module.exports = router;