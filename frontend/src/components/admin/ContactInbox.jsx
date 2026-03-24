import { useState, useEffect } from 'react'
import { Mail, Phone, Trash2, Search, X, Eye, Calendar } from 'lucide-react'
import api from '../../api'

export default function ContactInbox() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMsg, setSelectedMsg] = useState(null)

  useEffect(() => {
    if (selectedMsg) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => { document.body.classList.remove('modal-open') }
  }, [selectedMsg])

  const fetchMessages = async () => {
    try {
      const data = await api.request('/contact')
      setMessages(data)
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    try {
      await api.request(`/contact/${id}`, { method: 'DELETE' })
      setMessages(messages.filter(m => m._id !== id))
      if (selectedMsg?._id === id) setSelectedMsg(null)
    } catch (err) { alert(err.message) }
  }

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.service || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-module">
      <div className="module-header">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search inquiries..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="data-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Sender</th><th>Contact</th><th>Service</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No inquiries found.</td></tr>
            ) : filtered.map(msg => (
              <tr key={msg._id}>
                <td>
                  <div className="table-title-cell">
                    <strong>{msg.name}</strong>
                    <span>{msg.company || 'Private'}</span>
                  </div>
                </td>
                <td>
                  <div className="table-contact-cell">
                    <div className="contact-link"><Mail size={14} /> {msg.email}</div>
                  </div>
                </td>
                <td><span className="badge service">{msg.service || 'General'}</span></td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn" onClick={() => setSelectedMsg(msg)} title="View Message"><Eye size={16} /></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(msg._id)} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedMsg && (
        <div className="modal-overlay" onClick={() => setSelectedMsg(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Inquiry from {selectedMsg.name}</h2>
              <button className="modal-close" onClick={() => setSelectedMsg(null)}><X size={20} /></button>
            </div>
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field"><label>Name</label><input type="text" value={selectedMsg.name} disabled /></div>
                <div className="form-field"><label>Company</label><input type="text" value={selectedMsg.company || 'N/A'} disabled /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Email</label><input type="email" value={selectedMsg.email} disabled /></div>
                <div className="form-field"><label>Service</label><input type="text" value={selectedMsg.service || 'General'} disabled /></div>
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea rows="6" value={selectedMsg.message} disabled style={{ resize: 'none' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                <Calendar size={14} /> Submitted on {new Date(selectedMsg.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => handleDelete(selectedMsg._id)} style={{ color: 'var(--accent-rose)' }}>Delete Inquiry</button>
              <a href={`mailto:${selectedMsg.email}`} className="primary-btn"><Mail size={18} /> Reply via Email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
