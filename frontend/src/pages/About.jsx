import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Award, Users, Globe, TrendingUp, Shield } from 'lucide-react'
import { VerticalTimeline } from '../components/home/HomeComponents'
import { fadeUp } from '../animations'
import './About.css'
import './Home.css'

const values = [
  { icon: <Lightbulb size={24} />, title: 'Innovation', desc: 'We constantly push boundaries with cutting-edge research methodologies and technologies.' },
  { icon: <Shield size={24} />, title: 'Integrity', desc: 'Transparent, ethical practices are the foundation of every client relationship we build.' },
  { icon: <TrendingUp size={24} />, title: 'Impact', desc: 'Every strategy we develop is designed to deliver measurable, meaningful business outcomes.' },
  { icon: <Users size={24} />, title: 'Collaboration', desc: 'We work as an extension of your team, deeply embedded in your success.' },
]


export default function About() {
  return (
    <div className="about">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <motion.div className="page-hero__content" {...fadeUp}>
            <span className="section-tag">About Us</span>
            <h1 className="page-hero__title">
              Driving Growth Through <span className="gradient-text">Intelligence</span>
            </h1>
            <p className="page-hero__subtitle">
              We are a team of researchers, strategists, and technologists passionate about
              transforming data into business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Banner */}
      <section className="about-hero-image" style={{ padding: '0 2rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <motion.img 
            src="/images/about-hero.png" 
            alt="SearchLite Corporate Office Workspace" 
            style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', objectFit: 'cover' }} 
            {...fadeUp} 
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about__mv section">
        <div className="container">
          <div className="about__mv-grid">
            <motion.div className="about__mv-card" {...fadeUp}>
              <div className="about__mv-icon"><Target size={28} /></div>
              <h2>Our Mission</h2>
              <p>
                We are dedicated to help organizations make informed business decisions through innovative and actionable marketing intelligence and insights.
              </p>
            </motion.div>
            <motion.div className="about__mv-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <div className="about__mv-icon"><Eye size={28} /></div>
              <h2>Our Vision</h2>
              <p>
                Decoding subtle shifts and unspoken rules in marketing and strategy. Distilling complexity into quick, intelligent solutions for our partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about__founder section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '5rem 0' }}>
        <div className="container">
          <motion.div className="about__founder-content" {...fadeUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="about__founder-image-wrapper" style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 2rem' }}>
              <img 
                src="/images/founder.png" 
                alt="Manish Mehra" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-primary)', boxShadow: 'var(--shadow-xl)' }} 
              />
              <a 
                href="https://www.linkedin.com/in/manish-mehra1989/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="about__founder-linkedin"
                style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#0077b5', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
              </a>
            </div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Manish Mehra</h2>
            <p style={{ color: 'var(--accent-blue-light)', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Visionary & Founder</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              With a profound commitment to excellence, Manish Mehra founded SearchLite to bridge the gap between complex market data and actionable business strategies. His visionary leadership continues to propel the organization towards new heights in the research and marketing intelligence space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="about__values section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What <span className="gradient-text">Defines Us</span></h2>
          </motion.div>
          <div className="about__values-grid">
            {values.map((v, i) => (
              <motion.div key={i} className="about__value-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <div className="about__value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about__timeline section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">Key <span className="gradient-text">Milestones</span></h2>
          </motion.div>
          <VerticalTimeline />
        </div>
      </section>
    </div>
  )
}
