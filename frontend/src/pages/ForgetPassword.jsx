import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import api from '../api'
import './ForgetPassword.css'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      await api.forgotPassword(email)
      setShowSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="forget-password-page">
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
              <h2>Secure Access to Your Insights.</h2>
              <p>Protecting your account is our top priority. Follow the steps to safely reset your password and regain access to your data dashboards.</p>
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
              <Link to="/login" className="back-to-login">
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </Link>
              <h1>Forgot Password?</h1>
              <p>Enter your email address and we'll send you a link to reset your password.</p>
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

              <button 
                type="submit" 
                className={`login-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || showSuccess}
              >
                {isSubmitting ? <span className="spinner"></span> : (showSuccess ? 'Link Sent' : 'Send Reset Link')}
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
                    <span>Success! Check your email for instructions.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="login-footer-text" style={{ marginTop: '2.5rem' }}>
              Still having trouble? <Link to="/contact">Contact Support</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
