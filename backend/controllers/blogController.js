import Blog from '../models/Blog.js';

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, published: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
    try {
        const { title, slug, excerpt, content, author, category, readTime, tags } = req.body;

        const blog = await Blog.create({
            title, slug, excerpt, content, author, category, readTime, tags,
        });

        res.status(201).json(blog);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'A blog post with this slug already exists' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:slug
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:slug
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
