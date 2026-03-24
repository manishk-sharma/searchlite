import Subscriber from '../models/Subscriber.js';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'This email is already subscribed' });
        }

        await Subscriber.create({ email });

        res.status(201).json({ message: 'Successfully subscribed to the newsletter!' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
