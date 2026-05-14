import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Loader from '../components/Loader.jsx'
import Pagination from '../components/Pagination.jsx'
import PostCard from '../components/PostCard.jsx'
import { postService } from '../services/postService.js'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const search = searchParams.get('search') || ''
  const [query, setQuery] = useState(search)
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    postService
      .list({ page, limit: 8, search })
      .then((data) => active && setPosts(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [page, search])

  const submitSearch = (event) => {
    event.preventDefault()
    const next = {}
    if (query.trim()) next.search = query.trim()
    next.page = 1
    setSearchParams(next)
  }

  const changePage = (nextPage) => {
    const next = { page: nextPage }
    if (search) next.search = search
    setSearchParams(next)
  }

  return (
    <section className="shell py-10 md:py-14">
      <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
        <div>
          <p className="eyebrow mb-4">Journal writing</p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Notes on building better products, teams, and careers.
          </h1>
        </div>
        <div className="grid gap-5">
          <p className="max-w-xl text-base leading-7 text-muted md:ml-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
          </p>
          <form onSubmit={submitSearch} className="flex gap-2 md:ml-auto md:w-full md:max-w-xl">
            <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or content" />
            <button className="btn-primary">Search</button>
          </form>
        </div>
      </div>

      {loading && <Loader label="Finding the latest posts" />}
      {error && <p className="error-text py-10">{error}</p>}

      {!loading && posts?.items?.length === 0 && (
        <div className="py-16">
          <p className="eyebrow mb-3">No posts found</p>
          <h2 className="font-serif text-3xl">The archive is quiet for this search.</h2>
          <Link to="/" className="mt-5 inline-flex text-sm font-bold text-accent">Clear search</Link>
        </div>
      )}

      {!loading && posts?.items?.length > 0 && (
        <div>
          {posts.items.map((post, index) => (
            <PostCard key={post.id} post={post} featured={index === 0 && page === 1 && !search} />
          ))}
          <div className="mt-8">
            <Pagination page={posts.page} pages={posts.pages} onPageChange={changePage} />
          </div>
        </div>
      )}
    </section>
  )
}
