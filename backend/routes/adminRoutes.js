import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';
import User from '../models/User.js';
import { JobOpening, JobApplication } from '../models/Recruitment.js';

const router = express.Router();

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const [blogs, contacts, subscribers, users, openings, applications] = await Promise.all([
            Blog.countDocuments(),
            Contact.countDocuments(),
            Subscriber.countDocuments(),
            User.countDocuments(),
            JobOpening.countDocuments({ active: true }),
            JobApplication.countDocuments(),
        ]);

        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email service createdAt');

        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title slug createdAt');

        res.json({
            stats: { blogs, contacts, subscribers, users, openings, applications },
            recentContacts,
            recentBlogs,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
