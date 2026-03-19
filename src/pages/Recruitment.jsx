import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react'
import './Recruitment.css'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

const openings = [
  { title: 'Market Research Analyst', department: 'Research', location: 'Greater Noida / Remote', type: 'Full-time', color: 'var(--accent-blue)' },
  { title: 'Digital Marketing Executive', department: 'Marketing', location: 'Greater Noida / Remote', type: 'Full-time', color: 'var(--accent-violet)' },
]

const perks = [
  { emoji: '🚀', title: 'Growth', desc: 'Career development programs & mentorship' },
  { emoji: '💻', title: 'Flexibility', desc: 'Hybrid work & flexible scheduling' },
  { emoji: '🎯', title: 'Impact', desc: 'Work on projects that shape industries' },
  { emoji: '🌍', title: 'Global Exposure', desc: 'Collaborate with teams across 20+ countries' },
]

export default function Recruitment() {
  return (
    <div className="recruitment-page">
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <motion.div className="page-hero__content" {...fadeUp}>
            <span className="section-tag">Careers</span>
            <h1 className="page-hero__title">
              Join the <span className="gradient-text">Future</span> of Marketing Intelligence
            </h1>
            <p className="page-hero__subtitle">
              We're building the next generation of research and marketing tools. Come shape the future with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Difference */}
      <section className="perks section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <motion.div className="section-header" {...fadeUp} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Experience Difference</h2>
            <p className="section-desc" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We focus on ensuring our customers achieve their organizational outcomes. Join our team and be a part of an innovative and dynamic environment. We’re always on the lookout for passionate, talented individuals to grow with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Openings */}
      <section className="openings section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Open Positions</span>
            <h2 className="section-title">Current <span className="gradient-text">Openings</span></h2>
          </motion.div>
          <div className="openings__list">
            {openings.map((job, i) => (
              <motion.div key={i} className="openings__card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <div className="openings__card-left">
                  <div className="openings__dept-badge" style={{ color: job.color, borderColor: `${job.color}44` }}>
                    <Briefcase size={14} /> {job.department}
                  </div>
                  <h3 className="openings__title">{job.title}</h3>
                  <div className="openings__meta">
                    <span><MapPin size={14} /> {job.location}</span>
                    <span><Clock size={14} /> {job.type}</span>
                  </div>
                </div>
                <Link to="/contact" className="openings__apply" style={{ color: job.color }}>
                  Apply Now <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
