import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Link, useParams, Navigate } from 'react-router-dom'
import './BlogPost.css'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

// Simulated Blog Data
export const blogPosts = [
  {
    id: 'importance-of-personal-care',
    title: 'The Importance of Personal Care for a Healthy Lifestyle',
    excerpt: 'Discover why taking time for personal care is not a luxury, but a necessity for maintaining physical and mental health in today\'s fast-paced world.',
    content: `
      <p>In today's fast-paced, hyper-connected world, the concept of personal care often takes a back seat to professional responsibilities and familial obligations. However, failing to prioritize self-care is not just a fast track to burnout; it fundamentally undermines our ability to perform at our best in all areas of life.</p>
      
      <h3>The Mind-Body Connection</h3>
      <p>Personal care extends far beyond a skincare routine or a weekend spa trip. It encompasses the daily habits that sustain our physical and mental health. When we neglect our physical well-being—whether through poor diet, lack of sleep, or skipping exercise—our cognitive functions are directly impaired. We lose focus faster, struggle with complex problem-solving, and our emotional regulation falters.</p>
      
      <h3>Setting Boundaries</h3>
      <p>A crucial component of a healthy lifestyle is learning to set boundaries. This means knowing when to power down the laptop, when to say no to extra commitments, and when to dedicate time solely to your own recovery. Boundaries protect our energy, allowing us to engage more fully and authentically when we are 'on.'</p>
      
      <h3>Building a Sustainable Routine</h3>
      <p>The goal is not to adopt a rigid, impossible-to-maintain wellness regimen, but rather to find small, sustainable practices that ground you daily. This might be a ten-minute morning meditation, a daily walk without your phone, or simply ensuring you drink enough water. These micro-habits compound over time, building a foundation of resilience against the inevitable stressors of modern life.</p>

      <p>Ultimately, treating personal care as a necessity rather than an indulgence is the most proactive step we can take toward a healthy, balanced lifestyle.</p>
    `,
    author: 'Apoorva Verma',
    date: 'Dec 24, 2024',
    category: 'Wellness',
    readTime: '5 min read',
    tags: ['Health', 'Mental Health', 'Lifestyle', 'Self-Care']
  },
  {
    id: 'personal-care-essential',
    title: 'Why Personal Care is Essential for Daily Living',
    excerpt: 'An in-depth look at how daily personal care routines can significantly boost productivity, reduce stress, and improve overall life satisfaction.',
    content: `
      <p>It is incredibly easy to get swept up in the tide of daily tasks, moving from one emergency to the next without pausing to check in with oneself. This reactionary mode of living is common, but it is ultimately unsustainable. Daily personal care routines are the anchor that keeps us grounded amidst the chaos.</p>
      
      <h3>The Productivity Paradox</h3>
      <p>There is a persistent myth that taking time out for personal care reduces the amount of time available for productive work. In reality, the opposite is true. Rest and rejuvenation are prerequisites for high-level cognitive work. A well-rested mind operates with greater efficiency and creativity. By dedicating time to personal care, we are actively investing in our future productivity.</p>
      
      <h3>Stress Reduction Through Predictability</h3>
      <p>One of the hidden benefits of a daily personal care routine is predictability. In a world fraught with uncertainty, establishing control over the first and last hours of our day provides a powerful psychological safety net. This structure reduces baseline anxiety and equips us to handle unexpected challenges with greater equanimity.</p>
      
      <p>Incorporating simple rituals—such as mindful morning coffee, stretching, or reading before bed—transforms personal care from an occasional luxury into an essential, non-negotiable part of daily living.</p>
    `,
    author: 'Apoorva Verma',
    date: 'Dec 23, 2024',
    category: 'Lifestyle',
    readTime: '4 min read',
    tags: ['Productivity', 'Stress Management', 'Routine']
  },
  {
    id: 'role-of-personal-care-well-being',
    title: 'The Role of Personal Care in Enhancing Well-Being',
    excerpt: 'Exploring the psychological and physiological benefits of maintaining a consistent personal care regimen for long-term well-being.',
    content: `
      <p>Well-being is a holistic concept that goes beyond simply the absence of illness. It involves thriving physically, mentally, and emotionally. Maintaining a consistent personal care regimen is arguably the most effective tool we possess to enhance all pillars of well-being simultaneously.</p>
      
      <h3>Physiological Benefits</h3>
      <p>From a biological standpoint, self-care practices directly influence our physical state. Quality sleep, regular movement, and proper nutrition profoundly impact our immune system, hormone regulation, and cellular repair processes. Prioritizing these activities drastically reduces the risk of chronic diseases and improves longevity.</p>
      
      <h3>Psychological Resilience</h3>
      <p>Mentally, personal care fosters resilience. Taking the time to engage in activities we enjoy, stepping away from constant stimulation, and practicing self-compassion actively rewires the brain to better handle stress. It prevents the accumulation of emotional fatigue, maintaining a healthy baseline of positivity and motivation.</p>
      
      <p>The journey toward enhanced well-being is ongoing, but the path is paved with the small, daily choices we make to care for ourselves physically and mentally.</p>
    `,
    author: 'Apoorva Verma',
    date: 'Dec 20, 2024',
    category: 'Health',
    readTime: '6 min read',
    tags: ['Well-being', 'Psychology', 'Health Science']
  },
  {
    id: 'balancing-work-personal-care',
    title: 'Balancing Work and Personal Care: Strategies for Success',
    excerpt: 'Learn practical techniques for integrating personal care into a demanding professional schedule without compromising career growth.',
    content: `
      <p>Striking the perfect balance between professional ambition and personal well-being is the defining challenge of the modern workforce. True success is rarely achieved in a vacuum of exhaustion; it is built on a foundation of sustainable practices.</p>
      
      <h3>The Myth of the Grind</h3>
      <p>We often celebrate overwork as a badge of honor, but chronic stress actively degrades the prefrontal cortex—the very part of the brain required for executive function, creativity, and strategic planning. A strategic approach to personal care is the ultimate competitive advantage.</p>
      
      <h3>Practical Integration</h3>
      <p>The secret lies in seamless integration rather than strict compartmentalization. This means blocking off "focus time" in your calendar, establishing rigid boundaries around after-hours communication, and learning to delegate effectively. Prioritize tasks based on true urgency rather than manufactured panic.</p>

      <p>Success means nothing if you lack the health and vitality to enjoy it. Let personal care be the engine that drives your career, not the casualty of it.</p>
    `,
    author: 'Apoorva Verma',
    date: 'Dec 18, 2024',
    category: 'Career',
    readTime: '4 min read',
    tags: ['Career', 'Balance', 'Work-Life']
  },
  {
    id: 'science-of-sleep-personal-care',
    title: 'The Science of Sleep and Personal Care',
    excerpt: 'Deep dive into how optimizing your sleep fundamentally underpins all other personal care efforts.',
    content: `
      <p>Of all the tenets of personal care, sleep is universally the most critical and universally the most neglected. Without adequate restorative sleep, all other wellness interventions—diet, exercise, mindfulness—are significantly compromised.</p>
      
      <h3>The Architecture of Sleep</h3>
      <p>Sleep is not merely a passive state of rest; it is a highly active neurological process. During the deep stages of sleep, the brain actively flushes out neurotoxins accumulated during waking hours. During REM sleep, emotional processing and memory consolidation occur. Skimping on these cycles severely impacts cognitive longevity.</p>
      
      <h3>Sleep Hygiene mastery</h3>
      <p>Optimizing this process requires treating sleep preparation as a formal routine. This means maintaining a cool, completely dark room, eliminating blue light exposure an hour prior to bed, and ensuring a consistent wake time, even on weekends.</p>

      <p>Treat sleep not as an obstacle to productivity, but as the foundational pillar of personal care upon which all true health rests.</p>
    `,
    author: 'Apoorva Verma',
    date: 'Dec 15, 2024',
    category: 'Health',
    readTime: '7 min read',
    tags: ['Sleep', 'Science', 'Recovery']
  },
]

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    return <Navigate to="/blogs" replace />
  }

  return (
    <div className="blogpost-page">
      <div className="blogpost-hero">
        <div className="container">
          <Link to="/blogs" className="back-link">
            <ArrowLeft size={16} /> Back to Insights
          </Link>
          <motion.div className="blogpost-header" {...fadeUp}>
            <div className="blogpost-meta">
              <span className="blogpost-category">{post.category}</span>
              <span className="blogpost-dot">•</span>
              <span className="blogpost-readtime">{post.readTime}</span>
            </div>
            <h1 className="blogpost-title">{post.title}</h1>
            <p className="blogpost-excerpt">{post.excerpt}</p>
            
            <div className="blogpost-author-bar">
              <div className="author-details">
                <div className="author-avatar">{post.author.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div className="author-name">{post.author}</div>
                  <div className="author-date">{post.date}</div>
                </div>
              </div>
              <div className="share-buttons">
                <span className="share-text">Share:</span>
                <button aria-label="Share on Facebook"><Facebook size={18} /></button>
                <button aria-label="Share on Twitter"><Twitter size={18} /></button>
                <button aria-label="Share on LinkedIn"><Linkedin size={18} /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="blogpost-layout">
          <motion.article 
            className="blogpost-content" 
            {...fadeUp} 
            transition={{ delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <motion.aside className="blogpost-sidebar" {...fadeUp} transition={{ delay: 0.3 }}>
            <div className="sidebar-widget">
              <h3>Tags</h3>
              <div className="tags-container">
                 {post.tags.map((tag, i) => (
                   <span key={i} className="tag">{tag}</span>
                 ))}
              </div>
            </div>
            
            <div className="sidebar-widget newsletter-widget">
              <h3>Subscribe</h3>
              <p>Get the latest research and intelligence delivered straight to your inbox.</p>
              <form onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="hero__btn">Subscribe</button>
              </form>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
