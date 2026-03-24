import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'
import api from '../api'
import './Team.css'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export default function Team() {
  const [team, setTeam] = useState([
    // Default fallback item if DB is empty
    { 
      title: 'Apoorva Verma', 
      subtitle: 'Market Research Analyst', 
      imageUrl: '/images/apoorva.png',
      linkUrl: 'https://www.linkedin.com/in/apoorva-verma-166815316/',
      content: 'Apoorva has a natural talent for writing, which has been instrumental in her ability to analyze information and communicate complex technical concepts in a clear and concise manner.',
    }
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await api.request('/portal?type=team_member')
        if (data && data.length > 0) {
          setTeam(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeam()
  }, [])

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
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>Loading team members...</div>
          ) : (
            <div className="team__grid">
              {team.map((member, i) => (
                <motion.div key={member._id || i} className="team__card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <div className="team__avatar" style={{ overflow: 'hidden', padding: 0 }}>
                    <img 
                      src={member.imageUrl || '/images/default-avatar.png'} 
                      alt={member.title || member.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <h3 className="team__name">{member.title || member.name}</h3>
                  <p className="team__role" style={{ marginBottom: '1rem', color: 'var(--accent-blue-light)' }}>{member.subtitle || member.role}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{member.content || member.bio}</p>
                  <div className="team__socials">
                    {(member.linkUrl || member.linkedin) && (
                      <a href={member.linkUrl || member.linkedin} target="_blank" rel="noopener noreferrer" className="team__social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                    )}
                    <a href="#" className="team__social" aria-label="Twitter"><Twitter size={16} /></a>
                    <a href="#" className="team__social" aria-label="Email"><Mail size={16} /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
