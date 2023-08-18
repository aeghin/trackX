import express from 'express';
import { createProject } from '../controllers/project';

const router = express.Router();

router.post("/projects", createProject);
