
import express from 'express';
import authRoutes from './auth-route.js';
import messageRoutes from './message-route.js';

const router = express.Router();

// /api/v1/...

router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);

router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API v1 is healthy' });
});


export default router;