import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Sparkles, Globe, Zap } from 'lucide-react'

/* ——— Animated Counter ——— */
export function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = 0
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
            setCount(Math.floor(start + (end - start) * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ——— Floating Particles Background ——— */
export function ParticleField() {
  return (
    <div className="particle-field">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ——— Interactive Milestones Timeline ——— */
export function VerticalTimeline() {
  const [milestonesData, setMilestonesData] = useState([
    { year: '2021', title: 'Building Trust', subtitle: 'SearchLite Foundation', content: 'Launched operations with a single team member dedicated to serving one specific client.', iconDetails: 'Award' },
    { year: '2022', title: 'Scalability', subtitle: 'Network Expansion', content: 'Expanded capabilities by collaborating with dependable freelancers.', iconDetails: 'Users' },
    { year: '2023', title: 'Diversification', subtitle: 'AI Integration', content: 'Acquired multiple clients and leveraged AI to enhance workflow efficiency and accelerate execution.', iconDetails: 'Sparkles' },
    { year: '2024', title: 'Strategic Growth', subtitle: 'Structural Expansion', content: 'Experienced substantial growth with internal team members and formed a solid organizational structure.', iconDetails: 'Globe' },
    { year: '2025', title: 'Modern Execution', subtitle: 'Rapid AI Delivery', content: 'Building a team to work the modern way, actively engaging with AI tools to achieve exceptionally quick turnarounds.', iconDetails: 'Zap' },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { default: api } = await import('../../api') // Dynamic import to avoid circular dependencies if any
        const data = await api.request('/portal?type=timeline_milestone')
        if (data && data.length > 0) {
          setMilestonesData(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
      } catch (err) {
        console.error("Failed to fetch timeline milestones:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTimeline()
  }, [])

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return <Users size={22} />
      case 'Sparkles': return <Sparkles size={22} />
      case 'Globe': return <Globe size={22} />
      case 'Zap': return <Zap size={22} />
      case 'Award': default: return <Award size={22} />
    }
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem 0' }}>Loading milestones...</div>
  }

  return (
    <div className="vertical-timeline">
      {milestonesData.map((m, i) => (
        <motion.div
          key={m._id || i}
          className={`vertical-timeline__item ${i % 2 === 0 ? 'left' : 'right'}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="vertical-timeline__node">
            {getIcon(m.iconDetails)}
          </div>
          <div className="vertical-timeline__content">
            <h3 className="vertical-timeline__title">{m.title}</h3>
            <div className="vertical-timeline__subtitle">{m.subtitle}</div>
            <p className="vertical-timeline__desc">{m.content || m.desc}</p>
            <span className="vertical-timeline__year">{m.year || m.title?.split(' ')?.[0]}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
