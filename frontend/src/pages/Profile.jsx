import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader.jsx'
import PostCard from '../components/PostCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { authService } from '../services/authService.js'
import { formatDate } from '../utils/date.js'

export default function Profile() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    authService
      .myPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Loading your profile" />

  return (
    <section className="shell py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <aside className="h-fit border border-line bg-white p-5">
          <div className="mb-5 grid h-16 w-16 place-items-center bg-ink text-xl font-black text-white">
            {user?.name?.slice(0, 1)}
          </div>
          <p className="eyebrow mb-2">Profile</p>
          <h1 className="font-serif text-3xl">{user?.name}</h1>
          <p className="mt-2 text-sm text-muted">{user?.email}</p>
          <p className="mt-5 border-t border-line pt-5 text-sm text-muted">
            Joined {user?.created_at ? formatDate(user.created_at) : ''}
          </p>
          <Link to="/posts/new" className="btn-primary mt-6 w-full">Write a post</Link>
        </aside>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="eyebrow mb-2">Your archive</p>
              <h2 className="font-serif text-4xl">{posts.length} published pieces</h2>
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
          {!error && posts.length === 0 && (
            <div className="border border-line bg-white p-6">
              <h3 className="font-serif text-2xl">Your first essay belongs here.</h3>
              <p className="mt-2 text-muted">Publish a note, a tutorial, or a field report from the work you know best.</p>
            </div>
          )}
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  )
}
