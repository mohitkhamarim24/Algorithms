import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { submitSolution } from '../controllers/submissionController.js';
import { getUserSubmission } from '../controllers/submissionHistoryController.js';


const router = express.Router();

router.post('/', authMiddleware, submitSolution);
router.get('/me', authMiddleware, getUserSubmission);


export default router;
