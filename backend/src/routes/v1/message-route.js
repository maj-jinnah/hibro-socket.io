
import express from 'express';

const router = express.Router();



// /api/v1/message/...
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Message route is working' });
});


export default router;