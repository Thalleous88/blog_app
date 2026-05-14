import { Link } from 'react-router-dom'

import { formatDate } from '../utils/date.js'
import { excerpt } from '../utils/text.js'

export default function PostCard({ post, featured = false }) {
  return (
    <article className={`group border-b border-line py-7 ${featured ? 'md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-12' : ''}`}>
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {post.category && <span className="text-accent">{post.category}</span>}
          <span>{formatDate(post.created_at)}</span>
          <span>{post.author?.name}</span>
        </div>
        <Link to={`/posts/${post.id}`} className="block">
          <h2 className={`${featured ? 'font-serif text-4xl leading-tight md:text-5xl' : 'font-serif text-2xl leading-tight'} transition group-hover:text-accent`}>
            {post.title}
          </h2>
        </Link>
      </div>
      <div className={`${featured ? 'mt-5 md:mt-1' : 'mt-4'} flex flex-col items-start gap-4`}>
        <p className="max-w-2xl text-base leading-7 text-muted">{excerpt(post.content, featured ? 260 : 180)}</p>
        <Link to={`/posts/${post.id}`} className="text-sm font-bold text-ink underline decoration-line underline-offset-4 transition hover:text-accent">
          Read more
        </Link>
      </div>
    </article>
  )
}
