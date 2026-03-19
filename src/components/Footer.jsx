import { Link } from 'react-router-dom'
import { Search, Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react'
import './Footer.css'

const footerLinks = {
  'Services Offered': [
    { name: 'Content Analysis', path: '/services/content-analysis' },
    { name: 'Report Debriefs', path: '/services/report-debriefs' },
    { name: 'Project Management', path: '/services/project-management' },
    { name: 'Rural Outreach Programme', path: '/services/rural-outreach-programme' },
    { name: 'UX Research', path: '/services/ux-research' },
    { name: 'Social Research', path: '/services/social-research' },
    { name: 'BTI', path: '/services/bti' },
  ],
  Features: [
    { name: 'Consumer', path: '/consumer' },
    { name: 'Freelancer', path: '/freelancer' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Team Members', path: '/team' },
    { name: 'Recruitment', path: '/recruitment' },
    { name: 'Contact Us', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* CTA Bar */}
      <div className="footer__cta-section">
        <div className="container footer__cta-container">
          <div className="footer__cta-content">
            <h2 className="footer__cta-title">Ready to elevate your research?</h2>
            <p className="footer__cta-sub">Let's transform your data into actionable intelligence.</p>
          </div>
          <Link to="/contact" className="footer__cta-btn" id="footer-cta">
            Start a Project <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <div className="footer__logo-icon">
              <Search size={18} />
            </div>
            <span className="footer__logo-text">
              SEARCH<span className="gradient-text">LITE</span>
            </span>
          </Link>
          <p className="footer__description">
            Empowering businesses with research-driven marketing intelligence, data analytics, and strategic execution.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="footer__social" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" className="footer__social" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className="footer__social" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer__col">
            <h4 className="footer__col-title">{title}</h4>
            <ul className="footer__col-links">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer__link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Get in Touch</h4>
          <div className="footer__contact-items">
            <a href="mailto:manishmehra@searchliteinc.in" className="footer__contact-item">
              <Mail size={16} /> manishmehra@searchliteinc.in
            </a>
            <a href="tel:+918376884546" className="footer__contact-item">
              <Phone size={16} /> +91 83768 84546
            </a>
            <div className="footer__contact-item" style={{ alignItems: 'flex-start' }}>
              <MapPin size={16} style={{ marginTop: '4px', minWidth: '16px' }} />
              <span>Search Lite Inc, Panchsheel Greens 2, Sector 16 b, Greater Noida West - 201009</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} SearchLite Inc. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
