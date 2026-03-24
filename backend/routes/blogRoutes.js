import express from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBlogs);                              // Public: list all blogs
router.get('/:slug', getBlogBySlug);                    // Public: single blog
router.post('/', protect, admin, createBlog);           // Admin: create blog
router.put('/:slug', protect, admin, updateBlog);       // Admin: update blog
router.delete('/:slug', protect, admin, deleteBlog);    // Admin: delete blog

export default router;
