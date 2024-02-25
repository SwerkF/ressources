// User route for the API

const db = require('../db/db');
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/middleware');

router.get('/', middleware.isAdmin, userController.getUsers);
router.get('/:id', middleware.isAdmin, userController.getUserById);
router.post('/', userController.register);
router.put('/:id', middleware.isAdmin, userController.updateUser);
router.delete('/:id', middleware.isAdmin, userController.deleteUser);
router.post('/login', userController.login);
router.get('/profile', middleware.checkToken, userController.getProfile);

module.exports = router;
