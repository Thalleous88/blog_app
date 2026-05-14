import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center bg-ink text-sm font-black text-white">TG</span>
          <span className="text-sm font-extrabold uppercase tracking-[0.22em]">Journal</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navClass}>Explore</NavLink>
          {isAuthenticated && <NavLink to="/profile" className={navClass}>Profile</NavLink>}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/posts/new" className="btn-primary hidden sm:inline-flex">Write</Link>
              <button onClick={handleLogout} className="btn-secondary">Logout</button>
              
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Join</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
