import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogPosts } from './BlogPost'
import './Blogs.css'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export default function Blogs() {
  return (
    <div className="blogs-page">
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <motion.div className="page-hero__content" {...fadeUp}>
            <div className="blogs-icon-wrapper">
              <BookOpen size={40} />
            </div>
            <h1 className="page-hero__title">
              Our Latest <span className="gradient-text">Thinking</span>
            </h1>
            <p className="page-hero__subtitle">
              Perspectives, research, and insights from the SearchLite team to help you navigate the modern landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Banner */}
      <section className="blogs-hero-image" style={{ padding: '0 2rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <motion.img 
            src="/images/blog-hero.png" 
            alt="SearchLite Insights and Market Data" 
            style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', objectFit: 'cover' }} 
            {...fadeUp} 
          />
        </div>
      </section>

      <section className="blogs-content section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div className="blogs-grid">
            {blogPosts.map((blog, i) => (
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
