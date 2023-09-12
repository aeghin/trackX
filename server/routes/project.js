import express from 'express';
import { createIssue, createProject, deleteIssue, deleteProjectWithIssues, getAllProjects } from '../controllers/project.js';
import  { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/project", verifyToken, createProject);

router.post("/:projectId/issue", verifyToken, createIssue);

router.delete("/:projectId/:issueId", verifyToken, deleteIssue);

router.delete("/:projectId/delete", verifyToken, deleteProjectWithIssues);

router.get("/projects", verifyToken, getAllProjects);


export default router;
