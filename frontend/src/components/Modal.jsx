export default function Modal({ title, children, onCancel, onConfirm, confirmLabel = 'Confirm', danger = false }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4">
      <div className="w-full max-w-md border border-line bg-paper p-6 shadow-soft">
        <h2 className="font-serif text-2xl">{title}</h2>
        <div className="mt-3 text-sm leading-6 text-muted">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
