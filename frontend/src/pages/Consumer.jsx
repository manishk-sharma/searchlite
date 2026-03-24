import { motion } from 'framer-motion'
import { Users, ChevronRight, BarChart3, Target, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUp } from '../animations'
import './Consumer.css'

const benefits = [
  { icon: <BarChart3 size={24} />, title: 'Detailed Analytics', desc: 'Understand purchasing power and market preferences.' },
  { icon: <Target size={24} />, title: 'Actionable Insights', desc: 'Transform data into clear directives for strategic growth.' },
  { icon: <Globe size={24} />, title: 'Societal Impact', desc: 'Analyze how consumer behavior drives broader societal changes.' },
]

export default function Consumer() {
  return (
    <div className="consumer-page">
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div className="page-hero__content" {...fadeUp} style={{ textAlign: 'left', margin: 0, padding: 0 }}>
              <div className="consumer-icon-wrapper" style={{ margin: '0 0 1.5rem 0' }}>
                <Users size={40} />
              </div>
              <h1 className="page-hero__title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Understanding the <span className="gradient-text">Consumer</span>
              </h1>
              <p className="page-hero__subtitle" style={{ margin: '0' }}>
                Consumers are the cornerstone of any economy, driving demand and shaping market trends.
              </p>
            </motion.div>
            <motion.div className="page-hero__visual" {...fadeUp} transition={{ delay: 0.2 }}>
              <img src="/images/consumer-hero.png" alt="Consumer Market Research" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="consumer-content section">
        <div className="container">
          <div className="consumer-grid">
            <motion.div className="consumer-text" {...fadeUp}>
              <h2>The Agents of Change</h2>
              <p>
                Their preferences, purchasing power, and feedback directly influence the success or failure of businesses. By participating in the economy, they are key agents of change in broader societal dynamics.
              </p>
              <p>
                At SearchLite, our intelligence gathering focuses intently on consumer behavior, allowing our partners to anticipate market shifts before they happen.
              </p>
              <Link to="/contact" className="consumer-cta">
                Analyze your audience <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div className="consumer-benefits" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              {benefits.map((benefit, i) => (
                <div key={i} className="consumer-benefit-card">
                  <div className="consumer-benefit-icon">{benefit.icon}</div>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.desc}</p>
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
