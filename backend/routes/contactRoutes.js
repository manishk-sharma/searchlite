import express from 'express';
import { submitContact, getContacts, deleteContact } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitContact);                    // Public: submit contact form
router.get('/', protect, admin, getContacts);       // Admin: view all submissions
router.delete('/:id', protect, admin, deleteContact); // Admin: delete submission

export default router;
