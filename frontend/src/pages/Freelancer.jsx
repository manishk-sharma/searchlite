import { motion } from 'framer-motion'
import { Briefcase, ChevronRight, Zap, GraduationCap, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUp } from '../animations'
import './Freelancer.css'

const perks = [
  { icon: <Clock size={24} />, title: 'Flexibility & Autonomy', desc: 'Tailor your career to align with your personal schedule and passions.' },
  { icon: <GraduationCap size={24} />, title: 'Specialized Expertise', desc: 'Focus on providing deep, niche skills that businesses desperately need.' },
  { icon: <Zap size={24} />, title: 'Scalable Solutions', desc: 'Empower organizations with dynamic resources precisely when they need them.' },
]

export default function Freelancer() {
  return (
    <div className="freelancer-page">
      <section className="page-hero">
        <div className="page-hero__glow page-hero__glow--purple" />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div className="page-hero__content" {...fadeUp} style={{ textAlign: 'left', margin: 0, padding: 0 }}>
              <div className="freelancer-icon-wrapper" style={{ margin: '0 0 1.5rem 0' }}>
                <Briefcase size={40} />
              </div>
              <h1 className="page-hero__title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Empowering the <span className="gradient-text">Freelancer</span>
              </h1>
              <p className="page-hero__subtitle" style={{ margin: '0' }}>
                Freelancers play a crucial role in the modern workforce, offering unparalleled flexibility and specialized expertise.
              </p>
            </motion.div>
            <motion.div className="page-hero__visual" {...fadeUp} transition={{ delay: 0.2 }}>
              <img src="/images/freelancer-hero.png" alt="Freelancer Network" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="freelancer-content section">
        <div className="container">
          <div className="freelancer-grid">
            <motion.div className="freelancer-text" {...fadeUp}>
              <h2>The Modern Workforce</h2>
              <p>
                For businesses, freelancers provide scalable solutions without the overhead of traditional full-time employment. They bring diverse perspectives from working across multiple industries.
              </p>
              <p>
                For individuals, freelancing offers autonomy and the ability to tailor their careers to align with their skills and passions. At SearchLite, we seamlessly integrate elite freelance talent into our research intelligence frameworks.
              </p>
              <Link to="/recruitment" className="freelancer-cta">
                Join our network <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div className="freelancer-perks" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              {perks.map((perk, i) => (
                <div key={i} className="freelancer-perk-card">
                  <div className="freelancer-perk-icon">{perk.icon}</div>
                  <div>
                    <h3>{perk.title}</h3>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
