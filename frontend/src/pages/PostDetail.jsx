import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CommentCard from '../components/CommentCard.jsx'
import FormInput from '../components/FormInput.jsx'
import Loader from '../components/Loader.jsx'
import Modal from '../components/Modal.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { commentService } from '../services/commentService.js'
import { postService } from '../services/postService.js'
import { formatDate } from '../utils/date.js'
import { commentSchema } from '../utils/validators.js'

export default function PostDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(commentSchema)
  })

  useEffect(() => {
    let active = true
    Promise.all([postService.get(id), commentService.list(id)])
      .then(([postData, commentData]) => {
        if (!active) return
        setPost(postData)
        setComments(commentData)
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [id])

  const addComment = async (values) => {
    try {
      const created = await commentService.create(id, values)
      setComments((current) => [...current, created])
      reset({ content: '' })
      toast.success('Comment added')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const deletePost = async () => {
    try {
      await postService.remove(id)
      toast.success('Post deleted')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) return <Loader label="Loading article" />
  if (error) return <p className="shell error-text py-12">{error}</p>
  if (!post) return null

  const isAuthor = user?.id === post.author_id

  return (
    <article className="shell py-10 md:py-14">
      <header className="mx-auto max-w-3xl border-b border-line pb-8">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {post.category && <span className="text-accent">{post.category}</span>}
          <span>{formatDate(post.created_at)}</span>
          <span>{post.author?.name}</span>
        </div>
        <h1 className="font-serif text-4xl leading-tight md:text-6xl">{post.title}</h1>
        {isAuthor && (
          <div className="mt-7 flex gap-3">
            <Link to={`/posts/${post.id}/edit`} className="btn-secondary">Edit</Link>
            <button className="btn-danger" onClick={() => setConfirmDelete(true)}>Delete</button>
          </div>
        )}
      </header>

      <div className="mx-auto mt-10 max-w-3xl reading-prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <section className="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Discussion</p>
            <h2 className="font-serif text-3xl">{comments.length} comments</h2>
          </div>
        </div>

        {isAuthenticated ? (
          <form className="mb-6 grid gap-3 border border-line bg-white p-4" onSubmit={handleSubmit(addComment)}>
            <FormInput multiline rows={4} label="Add a comment" error={errors.content?.message} {...register('content')} />
            <button disabled={isSubmitting} className="btn-primary w-fit">{isSubmitting ? 'Posting' : 'Post comment'}</button>
          </form>
        ) : (
          <div className="mb-6 border border-line bg-white p-4 text-sm text-muted">
            <Link to="/login" className="font-semibold text-accent">Login</Link> to join the discussion.
          </div>
        )}

        {comments.length === 0 ? (
          <p className="py-8 text-muted">No comments yet. Start with a useful question or a thoughtful note.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onChanged={(updated) => setComments((current) => current.map((item) => (item.id === updated.id ? updated : item)))}
              onDeleted={(commentId) => setComments((current) => current.filter((item) => item.id !== commentId))}
            />
          ))
        )}
      </section>

      {confirmDelete && (
        <Modal title="Delete this post?" danger confirmLabel="Delete post" onCancel={() => setConfirmDelete(false)} onConfirm={deletePost}>
          This will permanently remove the post and its discussion.
        </Modal>
      )}
    </article>
  )
}
