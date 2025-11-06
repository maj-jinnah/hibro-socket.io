
import express from 'express';
import { MessageController } from '../../controllers/index.js';
import { Authenticate } from '../../middlewares/index.js';

const router = express.Router();

// /api/v1/messages/...
router.get('/users', Authenticate, MessageController.getAllUsers);
router.get('/conversations/:userId', Authenticate, MessageController.getAllMessages);
router.post('/conversations/:userId', Authenticate, MessageController.sendMessage);


export default router;