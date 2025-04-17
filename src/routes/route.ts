import express from 'express';

import { getProfile, login, signup } from '../controller/AuthController';
import { messageResponse , AuthResponse} from '../controller/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// User signup
router.post('/signup', signup as unknown as (req: express.Request<AuthResponse>, res: express.Response<messageResponse>) => void);
// User login
router.post('/login', login as unknown as (req: express.Request<AuthResponse>, res: express.Response<messageResponse>) => void);
// Get user profile
router.get('/profile',authMiddleware, getProfile as any); 

export default router;
