import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    category: {
        type: String,
        required: true,
    },
    readTime: {
        type: String,
        default: '5 min read',
    },
    tags: [{
        type: String,
    }],
    published: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
