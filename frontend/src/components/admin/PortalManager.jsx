import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layout, Image, MessageSquare, List, Search, X, Save, Loader2 } from 'lucide-react'
import api from '../../api'

const types = [
  { id: 'carousel', label: 'Carousel', icon: <Image size={18} /> },
  { id: 'testimonial', label: 'Testimonials', icon: <MessageSquare size={18} /> },
  { id: 'team_member', label: 'Team Members', icon: <List size={18} /> },
  { id: 'timeline_milestone', label: 'Timeline', icon: <Layout size={18} /> },
]

const emptyComp = { title: '', subtitle: '', content: '', imageUrl: '', linkUrl: '', order: 0, active: true }

export default function PortalManager() {
  const [components, setComponents] = useState([])
  const [activeType, setActiveType] = useState('carousel')
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingComp, setEditingComp] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState(emptyComp)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchComponents() }, [activeType])

  useEffect(() => {
    if (showModal || deletingId) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => { document.body.classList.remove('modal-open') }
  }, [showModal, deletingId])

  const fetchComponents = async () => {
    setIsLoading(true)
    try {
      const data = await api.request(`/portal?type=${activeType}`)
      setComponents(data)
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }

  const openCreate = () => {
    setEditingComp(null)
    setForm(emptyComp)
    setError('')
    setShowModal(true)
  }

  const openEdit = (comp) => {
    setEditingComp(comp)
    setForm({
      title: comp.title,
      subtitle: comp.subtitle || '',
      content: comp.content || '',
      imageUrl: comp.imageUrl || '',
      linkUrl: comp.linkUrl || '',
      order: comp.order || 0,
      active: comp.active !== false,
    })
    setError('')
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, type: activeType }
    try {
      if (editingComp) {
        const updated = await api.request(`/portal/${editingComp._id}`, {
          method: 'PUT', body: JSON.stringify(payload),
        })
        setComponents(components.map(c => c._id === editingComp._id ? updated : c))
      } else {
        const created = await api.request('/portal', {
          method: 'POST', body: JSON.stringify(payload),
        })
        setComponents([created, ...components])
      }
      setShowModal(false)
    } catch (err) { setError(err.message) }
    finally { setSaving(false) }
  }

  const handleDeleteRequest = (id) => {
    setDeletingId(id)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    setSaving(true)
    try {
      await api.request(`/portal/${deletingId}`, { method: 'DELETE' })
      setComponents(components.filter(c => c._id !== deletingId))
      setDeletingId(null)
    } catch (err) { 
      alert(err.message) 
    } finally {
      setSaving(false)
    }
  }

  const filtered = components.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const typeLabel = types.find(t => t.id === activeType)?.label || activeType

  return (
    <div className="admin-module">
      <div className="module-tabs">
        {types.map(type => (
          <button key={type.id} className={`tab-btn ${activeType === type.id ? 'active' : ''}`} onClick={() => setActiveType(type.id)}>
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      <div className="module-header">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder={`Search ${typeLabel}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button className="primary-btn" onClick={openCreate}><Plus size={18} /> New {typeLabel}</button>
      </div>

      <div className="data-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Content</th><th>Order</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No {typeLabel} found. Click "New {typeLabel}" to add one.</td></tr>
            ) : filtered.map(comp => (
              <tr key={comp._id}>
                <td>
                  <div className="table-title-cell">
                    <strong>{comp.title}</strong>
                    <span>{comp.subtitle || 'No subtitle'}</span>
                  </div>
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {comp.content || '—'}
                </td>
                <td>{comp.order}</td>
                <td><span className={`badge status ${comp.active ? 'published' : 'draft'}`}>{comp.active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn" onClick={() => openEdit(comp)} title="Edit"><Edit2 size={16} /></button>
                    <button className="icon-btn delete" onClick={() => handleDeleteRequest(comp._id)} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingComp ? `Edit ${typeLabel}` : `Add New ${typeLabel}`}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form id="portal-form" className="modal-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-field">
                  <label>Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Subtitle</label>
                  <input type="text" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} />
                </div>
              </div>
              <div className="form-field">
                <label>Content / Description</label>
                <textarea rows="3" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Image URL</label>
                  <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-field">
                  <label>Link URL</label>
                  <input type="text" value={form.linkUrl} onChange={e => setForm({...form, linkUrl: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} />
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select value={form.active ? 'active' : 'inactive'} onChange={e => setForm({...form, active: e.target.value === 'active'})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {error && <div className="modal-error">{error}</div>}
            </form>
            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" form="portal-form" className="primary-btn" disabled={saving}>
                {saving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                {editingComp ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="modal-overlay" onClick={() => !saving && setDeletingId(null)}>
          <div className="modal-box" style={{ maxWidth: '400px', maxHeight: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ color: 'var(--accent-rose)' }}>Confirm Deletion</h2>
              <button className="modal-close" onClick={() => !saving && setDeletingId(null)}><X size={20} /></button>
            </div>
            <div className="modal-form" style={{ padding: '1rem 2rem 2rem', overflow: 'visible' }}>
              Are you sure you want to permanently delete this {typeLabel}? This action cannot be undone.
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeletingId(null)} disabled={saving}>Cancel</button>
              <button className="primary-btn" style={{ background: 'var(--accent-rose)' }} onClick={confirmDelete} disabled={saving}>
                {saving ? <Loader2 size={18} className="spin" /> : <Trash2 size={18} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
