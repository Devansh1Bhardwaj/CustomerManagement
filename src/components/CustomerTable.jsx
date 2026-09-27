export default function CustomerTable({ customers, onEdit, onDelete, canDelete }) {
  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <h3>No customers match your search</h3>
        <p>Try a different name, email, or filter.</p>
      </div>
    )
  }

  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Joined</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.company}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td><span className={`status-pill ${c.status}`}>{c.status}</span></td>
            <td>{c.joinedDate}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
              <button className="btn-link" onClick={() => onEdit(c)}>Edit</button>
              {canDelete && (
                <button className="btn-danger-text" onClick={() => onDelete(c)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}