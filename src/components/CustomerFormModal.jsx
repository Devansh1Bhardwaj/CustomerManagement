import { useState } from 'react'

const emptyForm = { name: '', email: '', phone: '', company: '', status: 'Lead' }

export default function CustomerFormModal({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(initialData || emptyForm)
  const [errors, setErrors] = useState({})
  const isEditing = !!initialData

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) next.phone = 'Phone number is required.'
    if (!form.company.trim()) next.company = 'Company is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? 'Edit customer' : 'Add customer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input value={form.name} onChange={e => handleChange('name', e.target.value)} autoFocus />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-row">
            <label>Email</label>
            <input value={form.email} onChange={e => handleChange('email', e.target.value)} />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
            {errors.phone && <div className="form-error">{errors.phone}</div>}
          </div>

          <div className="form-row">
            <label>Company</label>
            <input value={form.company} onChange={e => handleChange('company', e.target.value)} />
            {errors.company && <div className="form-error">{errors.company}</div>}
          </div>

          <div className="form-row">
            <label>Status</label>
            <select value={form.status} onChange={e => handleChange('status', e.target.value)}>
              <option value="Lead">Lead</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary">{isEditing ? 'Save changes' : 'Add customer'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
