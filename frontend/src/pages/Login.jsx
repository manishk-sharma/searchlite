import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mail, Lock, CheckCircle2 } from 'lucide-react'
import api from '../api'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const data = await api.login({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({ _id: data._id, fullName: data.fullName, email: data.email, role: data.role }))
      setShowSuccess(true)
      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
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
              <h2>Empowering your decisions with data.</h2>
              <p>Sign in to access your custom dashboards, download analytical reports, and gain deep market research insights.</p>
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
              <h1>Welcome Back</h1>
              <p>Please enter your details to sign in.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label>Password</label>
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="spinner"></span> : 'Sign In'}
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
                    <span>Login successful! Redirecting...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="login-divider">
              <span>Or continue with</span>
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
              Don't have an account? <Link to="/create-account">Create Account</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
