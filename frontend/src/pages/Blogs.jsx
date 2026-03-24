import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api'
import { fadeUp } from '../animations'
import './Blogs.css'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getBlogs()
        setBlogs(data)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

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
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>No articles published yet. Check back soon!</div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog, i) => (
                <motion.div key={blog.slug} className="blog-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                  <div className="blog-card__header">
                    <span className="blog-card__category">{blog.category}</span>
                    <span className="blog-card__readtime">{blog.readTime || '5 min read'}</span>
                  </div>
                  
                  <h2 className="blog-card__title">{blog.title}</h2>
                  <p className="blog-card__excerpt">{blog.excerpt}</p>
                  
                  <div className="blog-card__footer">
                    <div className="blog-card__author-info">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D4E03AQH2CovZZGIiVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720032078845?e=2147483647&v=beta&t=WRbUTeL7sqiq0WsYCg0_cpiCLsbTJjAsaCaCn9PNRAU"
                        alt={blog.author || 'Author'} 
                        className="blog-card__avatar" 
                        style={{ objectFit: 'cover', background: '#fff', padding: 0 }}
                      />
                      <div>
                        <div className="blog-card__author-name">{blog.author}</div>
                        <div className="blog-card__date">{new Date(blog.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Link to={`/blogs/${blog.slug}`} className="blog-card__read-more">
                      Read Article <ArrowRight size={16} />
                    </Link>
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
