import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, Search, X, Save, Loader2 } from 'lucide-react'
import api from '../../api'

const emptyBlog = { title: '', slug: '', excerpt: '', content: '', author: '', category: '', readTime: '5 min read', tags: '' }

export default function ArticleManager() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [deletingSlug, setDeletingSlug] = useState(null)
  const [form, setForm] = useState(emptyBlog)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchArticles() }, [])

  useEffect(() => {
    if (showModal || deletingSlug) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => { document.body.classList.remove('modal-open') }
  }, [showModal, deletingSlug])

  const fetchArticles = async () => {
    try {
      const data = await api.getBlogs()
      setArticles(data)
    } catch (err) { console.error(err) }
    finally { setIsLoading(false) }
  }

  const openCreate = () => {
    setEditingArticle(null)
    setForm(emptyBlog)
    setError('')
    setShowModal(true)
  }

  const openEdit = (article) => {
    setEditingArticle(article)
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      category: article.category,
      readTime: article.readTime || '5 min read',
      tags: (article.tags || []).join(', '),
    })
    setError('')
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    
    // Auto-generate slug from title if empty
    if (!payload.slug) {
      payload.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    try {
      if (editingArticle) {
        const updated = await api.request(`/blogs/${editingArticle.slug}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setArticles(articles.map(a => a.slug === editingArticle.slug ? updated : a))
      } else {
        const created = await api.request('/blogs', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setArticles([created, ...articles])
      }
      setShowModal(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteRequest = (slug) => {
    setDeletingSlug(slug)
  }

  const confirmDelete = async () => {
    if (!deletingSlug) return
    setSaving(true)
    try {
      await api.request(`/blogs/${deletingSlug}`, { method: 'DELETE' })
      setArticles(articles.filter(a => a.slug !== deletingSlug))
      setDeletingSlug(null)
    } catch (err) { 
      alert(err.message) 
    } finally {
      setSaving(false)
    }
  }

  const filtered = articles.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-module">
      <div className="module-header">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button className="primary-btn" onClick={openCreate}><Plus size={18} /> New Article</button>
      </div>

      <div className="data-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No articles found.</td></tr>
            ) : filtered.map(article => (
              <tr key={article._id || article.slug}>
                <td>
                  <div className="table-title-cell">
                    <strong>{article.title}</strong>
                    <span>/{article.slug}</span>
                  </div>
                </td>
                <td><span className="badge category">{article.category}</span></td>
                <td>{article.author}</td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn" onClick={() => openEdit(article)} title="Edit"><Edit2 size={16} /></button>
                    <button className="icon-btn delete" onClick={() => handleDeleteRequest(article.slug)} title="Delete"><Trash2 size={16} /></button>
                    <a href={`/blogs/${article.slug}`} target="_blank" rel="noreferrer" className="icon-btn" title="View"><ExternalLink size={16} /></a>
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
              <h2>{editingArticle ? 'Edit Article' : 'Create New Article'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form id="article-form" className="modal-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-field">
                  <label>Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Slug (auto-generated if empty)</label>
                  <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="auto-from-title" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Author *</label>
                  <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Category *</label>
                  <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Read Time</label>
                  <input type="text" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} />
                </div>
                <div className="form-field">
                  <label>Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="tag1, tag2" />
                </div>
              </div>
              <div className="form-field">
                <label>Excerpt *</label>
                <textarea rows="2" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />
              </div>
              <div className="form-field">
                <label>Content (HTML) *</label>
                <textarea rows="8" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
              </div>
              {error && <div className="modal-error">{error}</div>}
            </form>
            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" form="article-form" className="primary-btn" disabled={saving}>
                {saving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                {editingArticle ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingSlug && (
        <div className="modal-overlay" onClick={() => !saving && setDeletingSlug(null)}>
          <div className="modal-box" style={{ maxWidth: '400px', maxHeight: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ color: 'var(--accent-rose)' }}>Confirm Deletion</h2>
              <button className="modal-close" onClick={() => !saving && setDeletingSlug(null)}><X size={20} /></button>
            </div>
            <div className="modal-form" style={{ padding: '1rem 2rem 2rem', overflow: 'visible' }}>
              Are you sure you want to permanently delete this article? This action cannot be undone.
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeletingSlug(null)} disabled={saving}>Cancel</button>
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
