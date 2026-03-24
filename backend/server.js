import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import recruitmentRoutes from './routes/recruitmentRoutes.js';
import portalRoutes from './routes/portalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    console.log('⚠️  MONGODB_URI not found in .env, skipping DB connection');
}

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/subscribe', subscriberRoutes);
app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({
        message: 'Searchlite API is active',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            contact: '/api/contact',
            blogs: '/api/blogs',
            subscribe: '/api/subscribe',
        },
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
