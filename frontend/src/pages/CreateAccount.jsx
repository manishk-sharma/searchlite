import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mail, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react'
import api from '../api'
import './CreateAccount.css'

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!")
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      await api.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-account-page">
      <div className="login-split">
        {/* Left Side - Visual */}
        <div className="login-visual">
          <div className="login-visual__overlay"></div>
          <div className="login-visual__content">
            <Link to="/" className="login-logo">
              <div className="login-logo-icon"><Search size={24} /></div>
              <span>SEARCH<strong className="gradient-text">LITE</strong></span>
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="login-visual__text"
            >
              <h2>Join the Future of Research.</h2>
              <p>Create an account to start building custom dashboards, tracking market trends, and collaborating with your team on data-driven strategies.</p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-container">
          <motion.div 
            className="login-form-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="login-header">
              <h1>Create Account</h1>
              <p>Join SearchLite and unlock powerful insights.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="John Doe" 
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="name@company.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="••••••••" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="login-error-msg" style={{ color: '#ef4444', background: '#ef444415', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className={`login-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || showSuccess}
              >
                {isSubmitting ? <span className="spinner"></span> : (showSuccess ? 'Account Created' : 'Create Account')}
              </button>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="login-success-msg"
                  >
                    <CheckCircle2 size={16} />
                    <span>Registration successful! Redirecting to login...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="login-divider">
              <span>Or sign up with</span>
            </div>

            <div className="login-socials">
              <button type="button" className="social-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                Google
              </button>
              <button type="button" className="social-btn">
                <img src="https://www.svgrepo.com/show/475662/microsoft-color.svg" alt="Microsoft" width="20" height="20" />
                Microsoft
              </button>
            </div>

            <p className="login-footer-text">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
