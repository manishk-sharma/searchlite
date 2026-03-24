import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';

dotenv.config();

const blogTags = {
  "The Importance of Personal Care for a Healthy Lifestyle": ["Personal Care", "Healthy Lifestyle", "Wellness", "Self-Care"],
  "Why Personal Care is Essential for Daily Living": ["Daily Living", "Stress Reduction", "Productivity", "Mindfulness"],
  "The Role of Personal Care in Enhancing Well-Being": ["Well-Being", "Health", "Resilience", "Mental Health"],
  "Balancing Work and Personal Care: Strategies for Success": ["Work-Life Balance", "Career", "Success", "Productivity"],
  "The Science of Sleep and Personal Care": ["Sleep", "Science", "Health", "Rest"]
};

const updateDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        for (const [title, tags] of Object.entries(blogTags)) {
            const result = await Blog.findOneAndUpdate(
                { title: title },
                { $set: { tags: tags } },
                { new: true }
            );
            if (result) {
                console.log(`Updated tags for: ${title} -> [${tags.join(', ')}]`);
            } else {
                console.log(`Could not find blog to update tags: ${title}`);
            }
        }

        console.log('Finished updating blog tags!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateDB();
