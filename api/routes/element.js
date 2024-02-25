const express = require('express');
const router = express.Router();
const elementController = require('../controller/elementController');
const middleware = require('../middleware/middleware');

router.get('/', elementController.getElementsRessources);
router.get('/:id', elementController.getElementsRessourcesById);
router.post('/', middleware.isAdmin, elementController.createElement);
router.put('/:id', middleware.isAdmin, elementController.updateElement);
router.delete('/:id', middleware.isAdmin, elementController.deleteElement);

module.exports = router;