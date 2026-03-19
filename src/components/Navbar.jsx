import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about' },
  {
    name: 'Features',
    path: '#',
    dropdown: [
      { name: 'Consumer', path: '/consumer' },
      { name: 'Freelancer', path: '/freelancer' },
    ],
  },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Team Members', path: '/team' },
  { name: 'Recruitment', path: '/recruitment' },
  { name: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  const navbarClass = `navbar ${isScrolled ? 'navbar--scrolled' : ''}`

  return (
    <nav className={navbarClass} id="main-nav">
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="nav-logo">
          <div className="navbar__logo-icon">
            <Search size={20} />
          </div>
          <span className="navbar__logo-text">
            SEARCH<span style={{ color: 'var(--accent-blue)' }}>LITE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`navbar__item ${link.dropdown ? 'navbar__item--dropdown' : ''}`}
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="navbar__chevron" />}
              </Link>
              {link.dropdown && activeDropdown === link.name && (
                <div className="navbar__dropdown glass-strong">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="navbar__dropdown-link"
                      id={`nav-sub-${sub.name.toLowerCase().replace(/\s/g, '-')}`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/login" className="navbar__cta" id="nav-login">
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar__toggle" onClick={() => setIsMobileOpen(!isMobileOpen)} id="nav-mobile-toggle" aria-label="Toggle menu">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="navbar__mobile glass-strong">
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="navbar__mobile-sub">
                    {link.dropdown.map((sub) => (
                      <Link key={sub.name} to={sub.path} className="navbar__mobile-sublink">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link to="/login" className="navbar__cta navbar__cta--mobile" onClick={() => setIsMobileOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}
