import express from 'express';
import { getUsers, getUserById, createUser, googleLogin, getProfile, loginUser, updateProfile } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getUsers);
router.get('/me', authenticateJWT, getProfile);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.put('/me', authenticateJWT, upload.single('image'), updateProfile);

export default router;  