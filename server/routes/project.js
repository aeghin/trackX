import express from 'express';
import { createProject } from '../controllers/project';
import  { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/projects", verifyToken, createProject);

export default router;
