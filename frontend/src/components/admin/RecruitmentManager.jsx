import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Users, Briefcase, MapPin, Search, X, Save, Loader2 } from 'lucide-react'
import api from '../../api'

const emptyJob = { title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' }

export default function RecruitmentManager() {
  const [openings, setOpenings] = useState([])
  const [applications, setApplications] = useState([])
  const [activeTab, setActiveTab] = useState('openings')
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState(emptyJob)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchData() }, [activeTab])

  useEffect(() => {
    if (showModal || deletingId) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => { document.body.classList.remove('modal-open') }
  }, [showModal, deletingId])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (activeTab === 'openings') {
        const data = await api.request('/recruitment/openings')
        setOpenings(data)
      } else {
        const data = await api.request('/recruitment/applications')
        setApplications(data)
      }
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }

  const openCreate = () => {
    setEditingJob(null)
    setForm(emptyJob)
    setError('')
    setShowModal(true)
  }

  const openEdit = (job) => {
    setEditingJob(job)
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: (job.requirements || []).join('\n'),
    })
    setError('')
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean) }
    try {
      if (editingJob) {
        const updated = await api.request(`/recruitment/openings/${editingJob._id}`, {
          method: 'PUT', body: JSON.stringify(payload),
        })
        setOpenings(openings.map(o => o._id === editingJob._id ? updated : o))
      } else {
        const created = await api.request('/recruitment/openings', {
          method: 'POST', body: JSON.stringify(payload),
        })
        setOpenings([created, ...openings])
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
      await api.request(`/recruitment/openings/${deletingId}`, { method: 'DELETE' })
      setOpenings(openings.filter(o => o._id !== deletingId))
      setDeletingId(null)
    } catch (err) { 
      alert(err.message) 
    } finally {
      setSaving(false)
    }
  }

  const filteredOpenings = openings.filter(o => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredApps = applications.filter(a => (a.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-module">
      <div className="module-tabs">
        <button className={`tab-btn ${activeTab === 'openings' ? 'active' : ''}`} onClick={() => setActiveTab('openings')}>
          <Briefcase size={18} /> Job Openings
        </button>
        <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          <Users size={18} /> Applications
        </button>
      </div>

      <div className="module-header">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        {activeTab === 'openings' && (
          <button className="primary-btn" onClick={openCreate}><Plus size={18} /> Add Opening</button>
        )}
      </div>

      <div className="data-table-container">
        <table className="admin-table">
          <thead>
            {activeTab === 'openings' ? (
              <tr><th>Position</th><th>Department</th><th>Location</th><th>Type</th><th>Actions</th></tr>
            ) : (
              <tr><th>Applicant</th><th>Position</th><th>Status</th><th>Applied</th><th>Actions</th></tr>
            )}
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : activeTab === 'openings' ? (
              filteredOpenings.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No job openings. Click "Add Opening" to create one.</td></tr>
              ) : filteredOpenings.map(job => (
                <tr key={job._id}>
                  <td>
                    <div className="table-title-cell">
                      <strong>{job.title}</strong>
                      <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>{job.department}</td>
                  <td><div className="contact-link"><MapPin size={14} /> {job.location}</div></td>
                  <td><span className="badge service">{job.type}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" onClick={() => openEdit(job)} title="Edit"><Edit2 size={16} /></button>
                      <button className="icon-btn delete" onClick={() => handleDeleteRequest(job._id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              filteredApps.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No applications received yet.</td></tr>
              ) : filteredApps.map(app => (
                <tr key={app._id}>
                  <td>
                    <div className="table-title-cell">
                      <strong>{app.fullName}</strong>
                      <span>{app.email}</span>
                    </div>
                  </td>
                  <td>{app.jobId?.title || 'Unknown'}</td>
                  <td><span className={`badge status ${app.status.toLowerCase()}`}>{app.status}</span></td>
                  <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" onClick={() => alert(`Resume: ${app.resumeUrl || 'Not provided'}\nCover Letter: ${app.coverLetter || 'None'}`)}>View</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingJob ? 'Edit Job Opening' : 'Create Job Opening'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form id="job-form" className="modal-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-field">
                  <label>Job Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Department *</label>
                  <input type="text" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Location *</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Description *</label>
                <textarea rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div className="form-field">
                <label>Requirements (one per line)</label>
                <textarea rows="4" value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} placeholder="2+ years experience&#10;Knowledge of React" />
              </div>
              {error && <div className="modal-error">{error}</div>}
            </form>
            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" form="job-form" className="primary-btn" disabled={saving}>
                {saving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                {editingJob ? 'Update' : 'Create'}
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
              Are you sure you want to permanently delete this job opening? This action cannot be undone.
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
