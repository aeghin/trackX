import express from 'express';

// importing controller for both register and login 
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;