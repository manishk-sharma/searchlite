import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';
import { JobOpening } from './models/Recruitment.js';
import PortalComponent from './models/PortalComponent.js';

dotenv.config();

const data = {
  "blogs": [
    {
      "title": "The Importance of Personal Care for a Healthy Lifestyle",
      "excerpt": "Discover why taking time for personal care is not a luxury, but a necessity for maintaining physical and mental health in today's fast-paced world.",
      "author": "Apoorva Verma",
      "category": "WELLNESS",
      "date": "Dec 24, 2024",
      "readTime": "5 min read"
    },
    {
      "title": "Why Personal Care is Essential for Daily Living",
      "excerpt": "An in-depth look at how daily personal care routines can significantly boost productivity, reduce stress, and improve overall life satisfaction.",
      "author": "Apoorva Verma",
      "category": "LIFESTYLE",
      "date": "Dec 23, 2024",
      "readTime": "4 min read"
    },
    {
      "title": "The Role of Personal Care in Enhancing Well-Being",
      "excerpt": "Exploring the psychological and physiological benefits of maintaining a consistent personal care regimen for long-term well-being.",
      "author": "Apoorva Verma",
      "category": "HEALTH",
      "date": "Dec 20, 2024",
      "readTime": "6 min read"
    },
    {
      "title": "Balancing Work and Personal Care: Strategies for Success",
      "excerpt": "Learn practical techniques for integrating personal care into a demanding professional schedule without compromising career growth.",
      "author": "Apoorva Verma",
      "category": "CAREER",
      "date": "Dec 18, 2024",
      "readTime": "4 min read"
    },
    {
      "title": "The Science of Sleep and Personal Care",
      "excerpt": "Deep dive into how optimizing your sleep fundamentally underpins all other personal care efforts.",
      "author": "Apoorva Verma",
      "category": "HEALTH",
      "date": "Dec 15, 2024",
      "readTime": "7 min read"
    }
  ],
  "team_members": [
    {
      "name": "Dr. Aparna Sharma",
      "role": "Founder & Market Research Analyst",
      "image": null
    },
    {
      "name": "Apoorva Verma",
      "role": "Social Media Manager",
      "image": null
    }
  ],
  "recruitment": [
    {
      "title": "Market Research Analyst",
      "location": "Greater Noida / Remote",
      "type": "Full-time",
      "department": "Research",
      "description": "Analyze market trends and provide data-driven insights through comprehensive research methodologies.",
      "requirements": "Strong analytical skills, proficiency in research tools, and excellent communication abilities."
    },
    {
      "title": "Digital Marketing Executive",
      "location": "Greater Noida / Remote",
      "type": "Full-time",
      "department": "Marketing",
      "description": "Manage digital marketing campaigns, social media presence, and content strategy to enhance brand visibility.",
      "requirements": "Experience with SEO/SEM, social media management, and digital analytics tools."
    }
  ]
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Insert Blogs
        for (const blog of data.blogs) {
            const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            // Check if exists
            const exists = await Blog.findOne({ slug });
            if (!exists) {
                await Blog.create({
                    title: blog.title,
                    slug: slug,
                    excerpt: blog.excerpt,
                    content: `<p>${blog.excerpt}</p><p>This is the full article content. You can edit this in the Admin Dashboard!</p>`,
                    author: blog.author,
                    category: blog.category,
                    readTime: blog.readTime,
                    published: true
                });
            }
        }
        console.log('Blogs imported');

        // Insert Team
        for (const tm of data.team_members) {
            const exists = await PortalComponent.findOne({ title: tm.name, type: 'team_member' });
            if (!exists) {
                await PortalComponent.create({
                    type: 'team_member',
                    title: tm.name,
                    subtitle: tm.role,
                    active: true,
                    order: 0
                });
            }
        }
        console.log('Team members imported');

        // Insert Recruitment
        for (const job of data.recruitment) {
            const exists = await JobOpening.findOne({ title: job.title });
            if (!exists) {
                await JobOpening.create({
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    type: job.type,
                    description: job.description,
                    requirements: [job.requirements],
                    active: true
                });
            }
        }
        console.log('Recruitments imported');

        console.log('Database seeded successfully from old Netlify site format!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDatabase();
