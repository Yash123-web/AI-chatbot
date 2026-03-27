import express from 'express';
import { Messages } from '../controllers/chatbot.message.js';

const router = express.Router();

router.post("/messages",Messages)   

export default router;