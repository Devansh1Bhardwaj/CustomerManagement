import { useMemo, useState } from 'react'
import { useCustomers } from '../context/CustomerContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import CustomerTable from '../components/CustomerTable.jsx'
import CustomerFormModal from '../components/CustomerFormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers()
  const { user } = useAuth()
  const canDelete = user?.role === 'Admin'

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [deletingCustomer, setDeletingCustomer] = useState(null)

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [customers, searchTerm, statusFilter])

  function openAddForm() {
    setEditingCustomer(null)
    setShowForm(true)
  }

  function openEditForm(customer) {
    setEditingCustomer(customer)
    setShowForm(true)
  }

  function handleSave(formData) {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData)
    } else {
      addCustomer({ ...formData, joinedDate: new Date().toISOString().slice(0, 10) })
    }
    setShowForm(false)
    setEditingCustomer(null)
  }

  function handleConfirmDelete() {
    deleteCustomer(deletingCustomer.id)
    setDeletingCustomer(null)
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <div className="count">{customers.length} total on file</div>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by name, email, or company"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Lead">Lead</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="btn-primary" onClick={openAddForm}>+ Add customer</button>
      </div>

      <CustomerTable
        customers={filteredCustomers}
        onEdit={openEditForm}
        onDelete={setDeletingCustomer}
        canDelete={canDelete}
      />

      {showForm && (
        <CustomerFormModal
          initialData={editingCustomer}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingCustomer(null) }}
        />
      )}

      {deletingCustomer && (
        <ConfirmDialog
          title="Delete this customer?"
          message={`This will permanently remove ${deletingCustomer.name} from your records.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingCustomer(null)}
        />
      )}
    </div>
  )
}