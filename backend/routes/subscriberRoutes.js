import express from 'express';
import { subscribe } from '../controllers/subscriberController.js';

const router = express.Router();

router.post('/', subscribe);  // Public: newsletter subscribe

export default router;
