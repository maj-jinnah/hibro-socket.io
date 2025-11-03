import express from 'express';
import { AuthController } from '../../controllers/index.js';
import { Authenticate } from '../../middlewares/index.js';

const router = express.Router();

// /api/v1/auth/...
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
// router.post('/refresh-token', AuthController.refreshToken);

router.get('/check',Authenticate, AuthController.checkAuth);
router.patch('/update-profile', Authenticate, AuthController.updateProfile);

export default router;