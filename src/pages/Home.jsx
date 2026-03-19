import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, BarChart3, Target, Megaphone, TrendingUp,
  Users, Award, Globe, Zap, CheckCircle2, Star,
  LineChart, PieChart, ArrowUpRight, Sparkles, BookOpen
} from 'lucide-react'
import { blogPosts } from './BlogPost'
import HeroCarousel from '../components/HeroCarousel'
import './Home.css'
import './Blogs.css'

/* ——— Animated Counter ——— */
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
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
function ParticleField() {
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

/* ——— Services Data ——— */
const services = [
  {
    icon: <BarChart3 size={28} />,
    title: 'Market Research',
    description: 'Deep-dive consumer insights and competitive analysis to inform your strategic decisions.',
    color: 'var(--accent-blue)',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))',
  },
  {
    icon: <Megaphone size={28} />,
    title: 'Strategic Insights',
    description: 'Data-backed perspectives that help you navigate complex market landscapes and identify opportunities.',
    color: 'var(--accent-violet)',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))',
  },
  {
    icon: <Target size={28} />,
    title: 'Research Execution',
    description: 'Precision implementation of research methodologies to gather high-quality, actionable intelligence.',
    color: 'var(--accent-cyan)',
    gradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(34, 211, 238, 0.05))',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable intelligence with advanced analytics and reporting.',
    color: 'var(--accent-emerald)',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(52, 211, 153, 0.05))',
  },
]

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', icon: <CheckCircle2 size={20} /> },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: <Star size={20} /> },
  { value: 20, suffix: '+', label: 'Active Clients', icon: <Users size={20} /> },
  { value: 5, suffix: '+', label: 'Years Experience', icon: <Award size={20} /> },
]

const features = [
  { icon: <Globe size={24} />, title: 'Global Reach', desc: 'Operating seamlessly across multiple domains with localized strategies.' },
  { icon: <Zap size={24} />, title: 'Real-time Insights', desc: 'Instant reporting and agile decisions based on data.' },
  { icon: <LineChart size={24} />, title: 'AI-Powered', desc: 'Leveraging AI to enhance workflow efficiency and accelerate execution.' },
  { icon: <PieChart size={24} />, title: 'Custom Reports', desc: 'Tailored reports aligned with your organization\'s unique KPIs.' },
]



/* ——— Fade on scroll wrapper ——— */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export default function Home() {
  return (
    <div className="home">
      {/* ===== HERO CAROUSEL ===== */}
      <HeroCarousel />

      {/* ===== ORIGINAL HERO SECTION ===== */}
      <section className="hero" id="hero">
        <ParticleField />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />

        <div className="container hero__container">
          <motion.div className="hero__content" {...fadeUp}>
            <div className="hero__badge">
              <Sparkles size={14} />
              <span>Research & Marketing Intelligence Platform</span>
            </div>
            <h1 className="hero__title">
              You share your <span className="hero__title-gradient">idea</span>,<br />we get it done.
            </h1>
            <p className="hero__subtitle">
              In the modern world, the journey from idea to execution can often seem daunting.
              Our dedicated team of experts listens attentively, understanding every nuance of your vision,
              leveraging our diverse skill sets to bring your idea to life.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="hero__btn hero__btn--primary" id="hero-cta-primary">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="hero__btn hero__btn--secondary" id="hero-cta-secondary">
                Explore Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero__dashboard">
              <div className="hero__dash-header">
                <div className="hero__dash-dots">
                  <span /><span /><span />
                </div>
                <span className="hero__dash-title">Analytics Dashboard</span>
              </div>
              <div className="hero__dash-body">
                <div className="hero__dash-chart">
                  <div className="hero__dash-bar" style={{ height: '40%' }} />
                  <div className="hero__dash-bar" style={{ height: '65%' }} />
                  <div className="hero__dash-bar hero__dash-bar--accent" style={{ height: '85%' }} />
                  <div className="hero__dash-bar" style={{ height: '55%' }} />
                  <div className="hero__dash-bar hero__dash-bar--accent" style={{ height: '95%' }} />
                  <div className="hero__dash-bar" style={{ height: '70%' }} />
                  <div className="hero__dash-bar" style={{ height: '50%' }} />
                </div>
                <div className="hero__dash-stats">
                  <div className="hero__dash-stat">
                    <span className="hero__dash-stat-value gradient-text">+247%</span>
                    <span className="hero__dash-stat-label">Growth Rate</span>
                  </div>
                  <div className="hero__dash-stat">
                    <span className="hero__dash-stat-value" style={{ color: 'var(--accent-emerald)' }}>92.4%</span>
                    <span className="hero__dash-stat-label">Engagement</span>
                  </div>
                  <div className="hero__dash-stat">
                    <span className="hero__dash-stat-value" style={{ color: 'var(--accent-amber)' }}>1.2M</span>
                    <span className="hero__dash-stat-label">Impressions</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats section" id="stats">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <motion.div key={i} className="stats__card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <div className="stats__icon">{stat.icon}</div>
                <div className="stats__value">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stats__label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services section" id="services">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">
              Comprehensive <span className="gradient-text">Solutions</span> for Modern Business
            </h2>
            <p className="section-subtitle">
              From in-depth market research to precision data execution — we provide the intelligence you need to win.
            </p>
          </motion.div>

          <div className="services__grid">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="services__card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="services__card-bg" style={{ background: service.gradient }} />
                <div className="services__card-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.description}</p>
                <Link to="/services" className="services__card-link" style={{ color: service.color }}>
                  Learn More <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section section" id="features">
        <div className="container">
          <div className="features__layout">
            <motion.div className="features__left" {...fadeUp}>
              <span className="section-tag">Why SearchLite</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Built for <span className="gradient-text">Scale</span>,<br />Designed for <span className="gradient-text">Impact</span>
              </h2>
              <p className="features__desc">
                Our platform combines cutting-edge technology with deep industry expertise to deliver
                insights that move the needle. We don't just provide data — we provide direction.
              </p>
              <Link to="/about" className="hero__btn hero__btn--primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
                Discover Our Approach <ArrowRight size={18} />
              </Link>
            </motion.div>

            <div className="features__right">
              {features.map((feat, i) => (
                <motion.div key={i} className="features__item" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                  <div className="features__item-icon">{feat.icon}</div>
                  <div>
                    <h4 className="features__item-title">{feat.title}</h4>
                    <p className="features__item-desc">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS FLOW ===== */}
      <section className="feature-block section" id="process">
        <div className="container">
          <div className="feature-block__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div className="feature-block__image" {...fadeUp}>
              <img src="/images/home-hero.png" alt="Strategic Process Flow" style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="feature-block__content" {...fadeUp} transition={{ delay: 0.2 }}>
              <span className="section-tag">Methodology</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Data-Driven <span className="gradient-text">Process Flow</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                We don't just collect data; we engineer pathways to success. Our robust process flow guarantees that every piece of information is validated, analyzed, and transformed into an actionable roadmap. From initial onboarding to strategic deployment, our methodology provides transparent, predictable, and scalable results.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1.25rem' }}>
                {['Process Initiation & Data Acquisition', 'Strategy Development & Analysis', 'Decision Engine Validation', 'Implementation Phase & Optimization', 'Monitoring, Feedback & Scaled Output'].map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>{idx + 1}</div>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== GROUP DISCUSSION ===== */}
      <section className="feature-block section" id="discussion" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="feature-block__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div className="feature-block__content" {...fadeUp}>
              <span className="section-tag">Collaboration</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Interactive <span className="gradient-text">Group Discussions</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                True intelligence requires human insight. We conduct highly structured group discussions and qualitative focus groups to unearth the nuanced motivations behind consumer behavior. By combining hard data with interactive human dialogue, we capture the complete picture of your market landscape.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>Qualitative Insights</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Deep-dive sessions to understand sentiment and behavioral triggers.</p>
                </div>
                <div style={{ background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ color: 'var(--accent-violet)', marginBottom: '0.5rem', fontWeight: 700 }}>Iterative Ideation</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Collaborative problem-solving environments to stress-test research hypotheses.</p>
                </div>
              </div>
            </motion.div>
            <motion.div className="feature-block__image" {...fadeUp} transition={{ delay: 0.2 }}>
              <img src="/images/group-discussion.png" alt="Interactive Group Discussion" style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE MILESTONES (Replacing Process) ===== */}
      <section className="process section" id="milestones">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">
              Key <span className="gradient-text">Milestones</span>
            </h2>
          </motion.div>

          <VerticalTimeline />
        </div>
      </section>

      {/* ===== BLOGS (Replacing Testimonials) ===== */}
      <section className="testimonials section" id="blogs">
        <div className="container">
          <motion.div className="section-header" {...fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span className="section-tag">Insights</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Latest <span className="gradient-text">Blogs</span>
              </h2>
            </div>
            <Link to="/blogs" className="hero__btn hero__btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
              View All Blogs <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="blogs-grid">
            {blogPosts.slice(0, 3).map((blog, i) => (
              <motion.div key={blog.id} className="blog-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <div className="blog-card__header">
                  <span className="blog-card__category">{blog.category}</span>
                  <span className="blog-card__readtime">{blog.readTime}</span>
                </div>

                <h2 className="blog-card__title">{blog.title}</h2>
                <p className="blog-card__excerpt">{blog.excerpt}</p>

                <div className="blog-card__footer">
                  <div className="blog-card__author-info">
                    <div className="blog-card__avatar">
                      {blog.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="blog-card__author-name">{blog.author}</div>
                      <div className="blog-card__date">{blog.date}</div>
                    </div>
                  </div>
                  <Link to={`/blogs/${blog.id}`} className="blog-card__read-more">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function VerticalTimeline() {
  const milestonesData = [
    { year: '2021', title: 'Building Trust', subtitle: 'SearchLite Foundation', desc: 'Launched operations with a single team member dedicated to serving one specific client.', icon: <Award size={22} /> },
    { year: '2022', title: 'Scalability', subtitle: 'Network Expansion', desc: 'Expanded capabilities by collaborating with dependable freelancers.', icon: <Users size={22} /> },
    { year: '2023', title: 'Diversification', subtitle: 'AI Integration', desc: 'Acquired multiple clients and leveraged AI to enhance workflow efficiency and accelerate execution.', icon: <Sparkles size={22} /> },
    { year: '2024', title: 'Strategic Growth', subtitle: 'Structural Expansion', desc: 'Experienced substantial growth with internal team members and formed a solid organizational structure.', icon: <Globe size={22} /> },
    { year: '2025', title: 'Modern Execution', subtitle: 'Rapid AI Delivery', desc: 'Building a team to work the modern way, actively engaging with AI tools to achieve exceptionally quick turnarounds.', icon: <Zap size={22} /> },
  ]

  return (
    <div className="vertical-timeline">
      {milestonesData.map((m, i) => (
        <motion.div
          key={i}
          className={`vertical-timeline__item ${i % 2 === 0 ? 'left' : 'right'}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="vertical-timeline__node">
            {m.icon}
          </div>
          <div className="vertical-timeline__content">
            <h3 className="vertical-timeline__title">{m.title}</h3>
            <div className="vertical-timeline__subtitle">{m.subtitle}</div>
            <p className="vertical-timeline__desc">{m.desc}</p>
            <span className="vertical-timeline__year">{m.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
