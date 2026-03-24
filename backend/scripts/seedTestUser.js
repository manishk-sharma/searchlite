import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedUser = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/searchlite';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB for seeding...');

        const testEmail = 'test@searchliteinc.in';
        const existingUser = await User.findOne({ email: testEmail });

        if (existingUser) {
            console.log('Test user already exists. Updating password...');
            existingUser.password = 'test1234';
            await existingUser.save();
            console.log('Test user updated successfully.');
        } else {
            console.log('Creating new test user...');
            await User.create({
                fullName: 'Test User',
                email: testEmail,
                password: 'test1234',
                role: 'admin',
            });
            console.log('Test user created successfully.');
        }

        console.log('\n-----------------------------------');
        console.log('Credentials:');
        console.log(`Email: ${testEmail}`);
        console.log('Password: test1234');
        console.log('Role: admin');
        console.log('-----------------------------------\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ SEEDING FAILED!');
        console.error('Error details:', error);
        if (error.code === 11000) {
            console.error('Possible duplicate key error. The email might already be in the database.');
        }
        process.exit(1);
    }
};

seedUser();
