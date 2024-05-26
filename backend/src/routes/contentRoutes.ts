import express from 'express';
import { getRessourceContent } from '../controllers/contentController';

const router = express.Router();

router.get('/:id', getRessourceContent);


export default router;