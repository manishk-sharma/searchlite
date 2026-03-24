import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { fadeUp } from '../animations'
import api from '../api'
import './Recruitment.css'

const perks = [
  { emoji: '🚀', title: 'Growth', desc: 'Career development programs & mentorship' },
  { emoji: '💻', title: 'Flexibility', desc: 'Hybrid work & flexible scheduling' },
  { emoji: '🎯', title: 'Impact', desc: 'Work on projects that shape industries' },
  { emoji: '🌍', title: 'Global Exposure', desc: 'Collaborate with teams across 20+ countries' },
]

export default function Recruitment() {
  const [openings, setOpenings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const data = await api.request('/recruitment/openings')
        // Assign colors dynamically based on index or department since the backend doesn't store colors
        const colors = ['var(--accent-blue)', 'var(--accent-violet)', 'var(--accent-cyan)', 'var(--accent-emerald)', 'var(--accent-amber)']
        const coloredData = data.map((job, idx) => ({
          ...job,
          color: colors[idx % colors.length]
        }))
        setOpenings(coloredData)
      } catch (error) {
        console.error("Failed to fetch job openings:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOpenings()
  }, [])

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
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>Loading job openings...</div>
            ) : openings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>No open positions at the moment. Please check back later!</div>
            ) : (
              openings.map((job, i) => (
                <motion.div key={job._id || i} className="openings__card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <div className="openings__card-left">
                    <div className="openings__dept-badge" style={{ color: job.color, borderColor: `${job.color}44` }}>
                      <Briefcase size={14} /> {job.department}
                    </div>
                    <h3 className="openings__title">{job.title}</h3>
                    <div className="openings__meta">
                      <span><MapPin size={14} /> {job.location}</span>
                      <span><Clock size={14} /> {job.type}</span>
                    </div>
                    
                    <div className="openings__details" style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Description</strong>
                        <p style={{ margin: 0, lineHeight: 1.5 }}>{job.description}</p>
                      </div>
                      
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Requirements</strong>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.5 }}>
                            {job.requirements.map((req, rIdx) => (
                              <li key={rIdx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <Link to="/contact" className="openings__apply" style={{ color: job.color }}>
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
