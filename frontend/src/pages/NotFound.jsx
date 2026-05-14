import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="shell grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="max-w-xl">
        <p className="eyebrow mb-3">404</p>
        <h1 className="font-serif text-5xl">This page is off the map.</h1>
        <p className="mt-4 leading-7 text-muted">The story may have moved, or the link points to a page that does not exist.</p>
        <Link to="/" className="btn-primary mt-7">Return home</Link>
      </div>
    </section>
  )
}
