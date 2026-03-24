import User from '../models/User.js';
import generateToken from '../config/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Email or username already in use' });
        }

        // Create user
        const user = await User.create({ fullName, email, username, password });

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Login user & return token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // 'email' from frontend is now used as username/email

        // Find user and include password for comparison
        const user = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }] 
        }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
        }

        // TODO: In production, generate a reset token and send an email
        res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
