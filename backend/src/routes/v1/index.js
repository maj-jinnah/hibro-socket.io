
import express from 'express';
import { AuthController } from '../../controllers/index.js';
import { Authenticate } from '../../middlewares/index.js';
import authRoutes from './auth-route.js';
const router = express.Router();

// /api/v1/...

router.use('/auth', authRoutes);

router.patch('/update-profile', Authenticate, AuthController.updateProfile);

router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API v1 is healthy' });
});


export default router;