import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3, Users, BookOpen, MessageSquare,
  Settings, LogOut, ChevronLeft, ChevronRight,
  Plus, Search, Layout, Clock, TrendingUp,
  FileText, Mail, UserCheck
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import ArticleManager from '../components/admin/ArticleManager'
import ContactInbox from '../components/admin/ContactInbox'
import RecruitmentManager from '../components/admin/RecruitmentManager'
import PortalManager from '../components/admin/PortalManager'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [adminData, setAdminData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      navigate('/login')
      return
    }
    const user = JSON.parse(userStr)
    if (user.role !== 'admin') {
      navigate('/')
      return
    }
    setAdminData(user)
  }, [navigate])

  if (!adminData) return null

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'recruitment', label: 'Recruitment', icon: <Users size={20} /> },
    { id: 'portal', label: 'Portal', icon: <Layout size={20} /> },
    { id: 'articles', label: 'Articles', icon: <BookOpen size={20} /> },
    { id: 'inbox', label: 'Contact Inbox', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">A</div>
            {!isSidebarCollapsed && <span className="logo-text">Admin</span>}
          </div>
          <button
            className="collapse-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isSidebarCollapsed && <span className="nav-label">{item.label}</span>}
              {activeModule === item.id && !isSidebarCollapsed && (
                <motion.div layoutId="active-indicator" className="active-indicator" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon"><LogOut size={20} /></span>
            {!isSidebarCollapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>{navItems.find(i => i.id === activeModule)?.label}</h1>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <span className="admin-name">{adminData.fullName}</span>
              <div className="admin-avatar">{adminData.fullName[0]}</div>
            </div>
          </div>
        </header>

        <section className="module-content">
          <AnimatePresence mode="wait">
            {activeModule === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminOverview onNavigate={setActiveModule} />
              </motion.div>
            )}
            {activeModule === 'recruitment' && (
              <motion.div key="recruitment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <RecruitmentManager />
              </motion.div>
            )}
            {activeModule === 'articles' && (
              <motion.div key="articles" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <ArticleManager />
              </motion.div>
            )}
            {activeModule === 'portal' && (
              <motion.div key="portal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <PortalManager />
              </motion.div>
            )}
            {activeModule === 'inbox' && (
              <motion.div key="inbox" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <ContactInbox />
              </motion.div>
            )}
            {activeModule === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminSettings admin={adminData} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  )
}

/* ─── OVERVIEW ─── */
function AdminOverview({ onNavigate }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await api.request('/admin/stats')
        setData(result)
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="admin-overview">
        <div className="stats-grid">
          {[1, 2, 3, 4].map(i => <div key={i} className="stat-card skeleton" />)}
        </div>
      </div>
    )
  }

  const stats = data ? [
    { label: 'Total Blogs', value: data.stats.blogs, icon: <BookOpen />, color: 'var(--accent-blue)' },
    { label: 'Active Jobs', value: data.stats.openings, icon: <Users />, color: 'var(--accent-violet)' },
    { label: 'Inquiries', value: data.stats.contacts, icon: <MessageSquare />, color: 'var(--accent-emerald)' },
    { label: 'Subscribers', value: data.stats.subscribers, icon: <Mail />, color: 'var(--accent-amber)' },
    { label: 'Applications', value: data.stats.applications, icon: <UserCheck />, color: 'var(--accent-cyan)' },
    { label: 'Users', value: data.stats.users, icon: <Users />, color: 'var(--accent-rose)' },
  ] : []

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card large">
          <div className="card-header">
            <h3><Clock size={18} /> Recent Inquiries</h3>
            <button className="card-link" onClick={() => onNavigate('inbox')}>View All →</button>
          </div>
          <div className="activity-list">
            {data?.recentContacts?.length === 0 ? (
              <p className="empty-text">No inquiries yet.</p>
            ) : data?.recentContacts?.map((c, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot" />
                <div className="activity-info">
                  <strong>{c.name}</strong>
                  <span>{c.service || 'General Inquiry'}</span>
                </div>
                <span className="activity-time">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3><TrendingUp size={18} /> Recent Blogs</h3>
            <button className="card-link" onClick={() => onNavigate('articles')}>View All →</button>
          </div>
          <div className="activity-list">
            {data?.recentBlogs?.length === 0 ? (
              <p className="empty-text">No blog posts yet.</p>
            ) : data?.recentBlogs?.map((b, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot blog" />
                <div className="activity-info">
                  <strong>{b.title}</strong>
                  <span>/{b.slug}</span>
                </div>
                <span className="activity-time">{new Date(b.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-actions-row">
        <button className="quick-action-card" onClick={() => onNavigate('articles')}>
          <div className="qa-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>
            <FileText size={24} />
          </div>
          <span>New Blog Post</span>
        </button>
        <button className="quick-action-card" onClick={() => onNavigate('recruitment')}>
          <div className="qa-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-violet)' }}>
            <Plus size={24} />
          </div>
          <span>Post Job Opening</span>
        </button>
        <button className="quick-action-card" onClick={() => onNavigate('inbox')}>
          <div className="qa-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)' }}>
            <MessageSquare size={24} />
          </div>
          <span>View Inbox</span>
        </button>
        <button className="quick-action-card" onClick={() => onNavigate('portal')}>
          <div className="qa-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-amber)' }}>
            <Layout size={24} />
          </div>
          <span>Edit Portal</span>
        </button>
      </div>
    </div>
  )
}

/* ─── SETTINGS ─── */
function AdminSettings({ admin }) {
  return (
    <div className="admin-module settings-module">
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Account Information</h3>
          <div className="settings-field">
            <label>Full Name</label>
            <input type="text" defaultValue={admin.fullName} disabled />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input type="email" defaultValue={admin.email} disabled />
          </div>
          <div className="settings-field">
            <label>Role</label>
            <input type="text" defaultValue={admin.role} disabled />
          </div>
        </div>

        <div className="settings-card">
          <h3>System Info</h3>
          <div className="settings-field">
            <label>API Base URL</label>
            <input type="text" defaultValue={import.meta.env.VITE_API_URL || 'http://localhost:5000/api'} disabled />
          </div>
          <div className="settings-field">
            <label>Frontend Version</label>
            <input type="text" defaultValue="1.0.0" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
