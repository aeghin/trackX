import express from 'express';
import { createIssue, createProject, getAllProjects } from '../controllers/project.js';
import  { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/project", verifyToken, createProject);

router.post("/issue", verifyToken, createIssue);

router.get("/projects", verifyToken, getAllProjects);


export default router;
