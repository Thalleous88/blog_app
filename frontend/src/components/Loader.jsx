export default function Loader({ label = 'Loading' }) {
  return (
    <div className="shell py-16">
      <div className="flex items-center gap-3 text-sm font-semibold text-muted">
        <span className="h-2 w-2 animate-pulse bg-accent" />
        <span>{label}</span>
      </div>
    </div>
  )
}
