import express from 'express';
import { AuthController } from '../../controllers/index.js';
const router = express.Router();

// /api/v1/auth/...
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
// router.post('/refresh-token', AuthController.refreshToken);

export default router;