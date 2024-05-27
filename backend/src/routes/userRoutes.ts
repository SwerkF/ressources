import express from 'express';
import { getUsers, getUserById, createUser, googleLogin, getProfile, loginUser } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', authenticateJWT, getProfile);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

export default router;