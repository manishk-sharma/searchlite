import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import api from '../api'
import { fadeUp } from '../animations'
import './Contact.css'

const contactInfo = [
  { icon: <Mail size={22} />, title: 'Email', value: 'manishmehra@searchliteinc.in', link: 'mailto:manishmehra@searchliteinc.in' },
  { icon: <Phone size={22} />, title: 'Mobile', value: '8376884546', link: 'tel:+918376884546' },
  { icon: <MapPin size={22} />, title: 'Office', value: 'Search Lite Inc, Panchsheel Greens 2, Sector 16 b, Greater Noida West - 201009', link: null },
]

export default function Contact() {
  const [formState, setFormState] = useState('idle') // idle | sending | sent | error
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('sending')
    setError('')
    try {
      await api.submitContact(formData)
      setFormState('sent')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
      setTimeout(() => setFormState('idle'), 3000)
    } catch (err) {
      setError(err.message)
      setFormState('idle')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero__glow" />
        <div className="container">
          <motion.div className="page-hero__content" {...fadeUp}>
            <span className="section-tag">Contact Us</span>
            <h1 className="page-hero__title">
              Let's Build Something <span className="gradient-text">Great Together</span>
            </h1>
            <p className="page-hero__subtitle">
              Have a project in mind? We'd love to hear about it. Reach out and let's start the conversation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact section">
        <div className="container">
          <div className="contact__grid">
            {/* Form */}
            <motion.div className="contact__form-wrapper" {...fadeUp}>
              <h2 className="contact__form-title">Send us a message</h2>
              <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Full Name</label>
                    <input type="text" id="contact-name" name="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email">Email</label>
                    <input type="email" id="contact-email" name="email" placeholder="john@company.com" required value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-company">Company</label>
                    <input type="text" id="contact-company" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-service">Service Interested In</label>
                    <select id="contact-service" name="service" value={formData.service} onChange={handleChange}>
                      <option value="">Select a service</option>
                      <option value="research">Market Research</option>
                      <option value="analytics">Data Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" rows="5" placeholder="Tell us about your project..." required value={formData.message} onChange={handleChange} />
                </div>
                <button type="submit" className="contact__submit" disabled={formState !== 'idle'} id="contact-submit">
                  {formState === 'idle' && <><Send size={18} /> Send Message</>}
                  {formState === 'sending' && <><Loader2 size={18} className="spin" /> Sending...</>}
                  {formState === 'sent' && <><CheckCircle2 size={18} /> Message Sent!</>}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div className="contact__info" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <h2 className="contact__info-title">Get in touch</h2>
              <p className="contact__info-desc">
                We typically respond within 24 hours. Alternatively, reach out to us directly through the following channels.
              </p>
              <div className="contact__info-items">
                {contactInfo.map((item, i) => (
                  <div key={i} className="contact__info-item">
                    <div className="contact__info-icon">{item.icon}</div>
                    <div>
                      <div className="contact__info-label">{item.title}</div>
                      {item.link ? (
                        <a href={item.link} className="contact__info-value">{item.value}</a>
                      ) : (
                        <span className="contact__info-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact__map" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-light)', minHeight: '350px' }}>
                <iframe
                  title="SearchLite Office Location"
                  src="https://maps.google.com/maps?q=Panchsheel%20Greens%202,%20Greater%20Noida&t=k&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '350px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
