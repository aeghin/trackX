import express from 'express';

// all project controllers
import { createIssue, createProject, deleteIssue, deleteProjectWithIssues, getAllProjects, getAllIssuesByProject, updateIssue, updateProjectName } from '../controllers/project.js';

// middleware for auth
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/project", verifyToken, createProject);

router.post("/:projectId/issue", verifyToken, createIssue);

router.delete("/:projectId/:issueId", verifyToken, deleteIssue);

router.delete("/:projectId", verifyToken, deleteProjectWithIssues);

router.get("/projects/:userId", verifyToken, getAllProjects);

router.get("/:projectId/issues", verifyToken, getAllIssuesByProject);

router.put("/issues/:issueId", verifyToken, updateIssue)

router.put("/:projectId/name", verifyToken, updateProjectName);

export default router;
