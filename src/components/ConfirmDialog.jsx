export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal" style={{ borderTopColor: 'var(--status-inactive)' }}>
        <h2>{title}</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className="btn-primary"
            style={{ background: 'var(--status-inactive)' }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
