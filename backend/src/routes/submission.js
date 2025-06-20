import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { submitSolution } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/', authMiddleware, submitSolution);

export default router;
