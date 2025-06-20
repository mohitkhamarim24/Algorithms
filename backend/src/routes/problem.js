import express from 'express';
import {
  createProblems,
  getAllProblems,
  getProblemById
} from '../controllers/problemController.js';

const router = express.Router();

router.post('/', createProblems);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);

export default router;