
import express from 'express';
const router = express.Router();
import authRoutes from './auth-route.js';

// /api/v1/auth/...
router.use('/auth', authRoutes);

router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API v1 is healthy' });
});


export default router;