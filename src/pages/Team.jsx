import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'
import './Team.css'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

const team = [
  { 
    name: 'Apoorva Verma', 
    role: 'Market Research Analyst', 
    image: '/images/apoorva.png',
    linkedin: 'https://www.linkedin.com/in/apoorva-verma-166815316/',
    color: 'var(--accent-blue)', 
    bio: 'Apoorva has a natural talent for writing, which has been instrumental in her ability to analyze information and communicate complex technical concepts in a clear and concise manner.' 
  },
]

export default function Team() {
  return (
    <div className="team-page">
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <motion.div className="page-hero__content" {...fadeUp}>
            <span className="section-tag">Our People</span>
            <h1 className="page-hero__title">
              Meet the <span className="gradient-text">Minds</span> Behind SearchLite
            </h1>
            <p className="page-hero__subtitle">
              A diverse team of experts passionate about research, marketing, and making data meaningful.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="team section">
        <div className="container">
          <div className="team__grid">
            {team.map((member, i) => (
              <motion.div key={i} className="team__card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <div className="team__avatar" style={{ overflow: 'hidden', padding: 0 }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role" style={{ marginBottom: '1rem', color: 'var(--accent-blue-light)' }}>{member.role}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{member.bio}</p>
                <div className="team__socials">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team__social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                  <a href="#" className="team__social" aria-label="Twitter"><Twitter size={16} /></a>
                  <a href="#" className="team__social" aria-label="Email"><Mail size={16} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
