import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { loginEmailPass } from '../controllers/userController';

const router = express.Router();

router.post('/login', loginEmailPass);

export default router;
