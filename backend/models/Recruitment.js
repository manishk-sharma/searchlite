import mongoose from 'mongoose';

const jobOpeningSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'], default: 'Full-time' },
    description: { type: String, required: true },
    requirements: [String],
    active: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOpening', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    resumeUrl: { type: String }, // URL to uploaded resume
    coverLetter: { type: String },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'], default: 'Pending' },
    appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);
export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
