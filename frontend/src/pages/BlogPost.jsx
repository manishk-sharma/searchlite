import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import api from '../api'
import { fadeUp } from '../animations'
import './BlogPost.css'

export default function BlogPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | sending | done | error
  const [subMsg, setSubMsg] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.request(`/blogs/${id}`)
        setPost(data)
      } catch (err) {
        console.error("Failed to fetch blog post:", err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setSubStatus('sending')
    try {
      const data = await api.subscribe(subEmail)
      setSubStatus('done')
      setSubMsg(data.message)
      setSubEmail('')
    } catch (err) {
      setSubStatus('error')
      setSubMsg(err.message)
    }
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '10rem 0' }}>Loading article...</div>
  }

  if (error || !post) {
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
              <span className="blogpost-readtime">{post.readTime || '5 min read'}</span>
            </div>
            <h1 className="blogpost-title">{post.title}</h1>
            <p className="blogpost-excerpt">{post.excerpt}</p>
            
            <div className="blogpost-author-bar">
              <div className="author-details">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4E03AQH2CovZZGIiVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720032078845?e=2147483647&v=beta&t=WRbUTeL7sqiq0WsYCg0_cpiCLsbTJjAsaCaCn9PNRAU"
                  alt={post.author || 'Author'} 
                  className="author-avatar" 
                  style={{ objectFit: 'cover', background: '#fff' }}
                />
                <div>
                  <div className="author-name">{post.author}</div>
                  <div className="author-date">{new Date(post.createdAt).toLocaleDateString()}</div>
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
            {post.tags && post.tags.length > 0 && (
              <div className="sidebar-widget">
                <h3>Tags</h3>
                <div className="tags-container">
                   {post.tags.map((tag, i) => (
                     <span key={i} className="tag">{tag}</span>
                   ))}
                </div>
              </div>
            )}
            
            <div className="sidebar-widget newsletter-widget">
              <h3>Subscribe</h3>
              <p>Get the latest research and intelligence delivered straight to your inbox.</p>
              <form onSubmit={handleSubscribe}>
                <input type="email" placeholder="Your email address" required value={subEmail} onChange={e => setSubEmail(e.target.value)} />
                <button type="submit" className="hero__btn" disabled={subStatus === 'sending'}>
                  {subStatus === 'sending' ? 'Subscribing...' : subStatus === 'done' ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </form>
              {subMsg && <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: subStatus === 'error' ? '#ef4444' : '#22c55e' }}>{subMsg}</p>}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
