import express from 'express';
import { getJobs, createJob, updateJob, deleteJob, getApplications, submitApplication } from '../controllers/recruitmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: view jobs and apply
router.get('/openings', getJobs);
router.post('/apply', submitApplication);

// Admin: manage openings and view applications
router.post('/openings', protect, admin, createJob);
router.put('/openings/:id', protect, admin, updateJob);
router.delete('/openings/:id', protect, admin, deleteJob);
router.get('/applications', protect, admin, getApplications);

export default router;
