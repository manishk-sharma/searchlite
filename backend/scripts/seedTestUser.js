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

        const testEmail = 'manishmehra@searchliteinc.in';
        const testUsername = 'manishmehra';
        const testPassword = 'admin';

        let existingUser = await User.findOne({ $or: [{ email: testEmail }, { username: testUsername }] });

        if (existingUser) {
            console.log('User already exists. Updating credentials...');
            existingUser.email = testEmail;
            existingUser.username = testUsername;
            existingUser.password = testPassword; // Triggers pre-save hashing
            existingUser.fullName = 'Manish Mehra';
            existingUser.role = 'admin';
            await existingUser.save();
            console.log('User updated successfully.');
        } else {
            console.log('Creating new user...');
            await User.create({
                fullName: 'Manish Mehra',
                username: testUsername,
                email: testEmail,
                password: testPassword,
                role: 'admin',
            });
            console.log('User created successfully.');
        }

        console.log('\n-----------------------------------');
        console.log('Credentials:');
        console.log(`Username: ${testUsername}`);
        console.log(`Email: ${testEmail}`);
        console.log(`Password: ${testPassword}`);
        console.log('Role: admin');
        console.log('-----------------------------------\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ SEEDING FAILED!');
        console.error('Error details:', error);
        process.exit(1);
    }
};

seedUser();
