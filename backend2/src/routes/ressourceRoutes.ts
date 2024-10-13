import express from 'express';
import { getRessources, getRessource } from '../controllers/ressourceController';

const router = express.Router();

router.get('/', getRessources);
router.get('/:id', getRessource);

export default router;