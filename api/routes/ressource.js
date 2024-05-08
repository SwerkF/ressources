// User route for the API
const express = require('express');
const router = express.Router();
const ressourceController = require('../controller/ressourceController');

router.get('/', ressourceController.getListRessources);
router.get('/category/:id', ressourceController.getRessourceByCategory);

module.exports = router;