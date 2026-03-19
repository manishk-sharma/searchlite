import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Presentation, 
  Layers, 
  Globe, 
  UserCheck, 
  Users, 
  BarChart, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import './ServiceDetail.css'

const servicesData = {
  'content-analysis': {
    title: 'Content Analysis',
    icon: <FileText size={48} />,
    description: 'Deep-dive qualitative and quantitative analysis of media, documents, and communication streams to extract meaningful trends and sentiment.',
    features: [
      'Sentiment Analysis & Emotional Mapping',
      'Thematic Coding of Qualitative Data',
      'Competitive Content Benchmarking',
      'Natural Language Processing Insights',
      'Visual Data Synthesis & Narrative Extraction'
    ],
    details: 'Our content analysis methodology combines advanced AI processing with expert human oversight. We don\'t just count keywords; we decode the context, tone, and underlying messages that influence your brand perception.'
  },
  'report-debriefs': {
    title: 'Report Debriefs',
    icon: <Presentation size={48} />,
    description: 'Transforming complex research data into clear, actionable narratives through interactive stakeholder walkthroughs.',
    features: [
      'Interactive Workshop Sessions',
      'Executive Summary Presentations',
      'Strategy Alignment Consultations',
      'Data-Driven Decision Support',
      'Action Item & Roadmap Planning'
    ],
    details: 'A report is only valuable if it\'s understood. Our debriefing process ensures that your entire leadership team is aligned on research findings, understands the "why" behind the data, and knows exactly what steps to take next.'
  },
  'project-management': {
    title: 'Project Management',
    icon: <Layers size={48} />,
    description: 'End-to-end orchestration of complex research initiatives, ensuring timelines, budgets, and quality standards are met.',
    features: [
      'Agile Research Methodology',
      'Resource Allocation & Vendor Oversight',
      'Quality Assurance Frameworks',
      'Risk Mitigation Strategies',
      'Milestone-Based Reporting'
    ],
    details: 'We take the technical and logistical burden off your shoulders. From field operations to internal stakeholder management, we ensure your research project runs seamlessly from initiation to final delivery.'
  },
  'rural-outreach-programme': {
    title: 'Rural Outreach Programme',
    icon: <Globe size={48} />,
    description: 'Specialized intelligence gathering in rural and remote areas, overcoming geographical and cultural barriers to reach the last mile.',
    features: [
      'Localized Field Force Networks',
      'Vernacular Communication Experts',
      'Mobile/Offline Data Collection',
      'Grassroots Level Stakeholder Mapping',
      'Logistics & Access Management'
    ],
    details: 'Understanding rural markets requires a different lens. Our outreach programme leverages deep local connections and culturally sensitive methodologies to provide insights that traditional urban-focused research misses.'
  },
  'ux-research': {
    title: 'UX Research',
    icon: <UserCheck size={48} />,
    description: 'Evidence-based insights into user behavior, needs, and motivations to create intuitive and high-converting digital experiences.',
    features: [
      'User Interviewing & Ethnography',
      'Usability Testing & Eye Tracking',
      'Card Sorting & Tree Testing',
      'Customer Journey Mapping',
      'A/B Testing Hypothesis Generation'
    ],
    details: 'We bridge the gap between business goals and user needs. Our UX research goes beyond simple feedback to understand the mental models and friction points that define the modern consumer experience.'
  },
  'social-research': {
    title: 'Social Research',
    icon: <Users size={48} />,
    description: 'In-depth study of societal trends, public policy impact, and community dynamics to inform social-focused strategies.',
    features: [
      'Demographic & Trend Forecasting',
      'Policy Impact Assessment',
      'Community Sentiment Tracking',
      'Behavioral Economics Analysis',
      'Social Impact Measurement'
    ],
    details: 'In a rapidly changing world, understanding social context is critical. We provide organizations with the intelligence needed to navigate complex human behaviors and build meaningful community connections.'
  },
  'bti': {
    title: 'BTI (Brand Tracking Index)',
    icon: <BarChart size={48} />,
    description: 'Continuous monitoring of brand health metrics to track awareness, consideration, and advocacy over time.',
    features: [
      'Real-time Brand Sentiment Index',
      'Competitor Benchmarking',
      'Brand Recall & Recognition Metrics',
      'Consumer NPS Tracking',
      'Share of Voice Analysis'
    ],
    details: 'Brand health isn\'t a static snapshot; it\'s a living metric. Our Brand Tracking Index provides a constant pulse on your market position, allowing you to react quickly to competitive shifts and marketing performance.'
  }
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const data = servicesData[slug]

  if (!data) {
    return (
      <div className="service-detail-error">
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/" className="hero__btn hero__btn--primary">Return Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail">
      {/* Hero */}
      <section className="service-hero">
        <div className="service-hero__glow" />
        <div className="container">
          <motion.div className="service-hero__content" {...fadeUp}>
            <div className="service-hero__icon-box">
              {data.icon}
            </div>
            <h1 className="service-hero__title">
              {data.title.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? <span key={i} className="gradient-text">{word}</span> : word + ' '
              ))}
            </h1>
            <p className="service-hero__subtitle">{data.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-main section">
        <div className="container">
          <div className="service-main__grid">
            <motion.div className="service-main__text" {...fadeUp}>
              <span className="section-tag">Overview</span>
              <h2>Strategic <span className="gradient-text">Approach</span></h2>
              <p>{data.details}</p>
              
              <div className="service-main__cta-box">
                <h3>Ready to get started?</h3>
                <p>Contact our experts today to discuss how we can tailor this service to your specific needs.</p>
                <Link to="/contact" className="hero__btn hero__btn--primary">
                  Start Consultation <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div className="service-main__features" {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="features-card">
                <div className="features-card__header">
                  <Sparkles size={20} className="accent-violet" />
                  <h3>Key Deliverables</h3>
                </div>
                <ul className="features-list">
                  {data.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className="accent-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
