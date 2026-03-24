import express from 'express';
import { getPortalComponents, createPortalComponent, updatePortalComponent, deletePortalComponent } from '../controllers/portalController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: view active components
router.get('/', getPortalComponents);

// Admin: manage components
router.post('/', protect, admin, createPortalComponent);
router.put('/:id', protect, admin, updatePortalComponent);
router.delete('/:id', protect, admin, deletePortalComponent);

export default router;
