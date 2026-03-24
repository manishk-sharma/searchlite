import { JobOpening, JobApplication } from '../models/Recruitment.js';

// --- Job Openings ---
export const getJobs = async (req, res) => {
    try {
        const jobs = await JobOpening.find().sort({ postedAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createJob = async (req, res) => {
    try {
        const job = await JobOpening.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await JobOpening.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await JobOpening.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Applications ---
export const getApplications = async (req, res) => {
    try {
        const apps = await JobApplication.find().populate('jobId').sort({ appliedAt: -1 });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitApplication = async (req, res) => {
    try {
        const app = await JobApplication.create(req.body);
        res.status(201).json(app);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
