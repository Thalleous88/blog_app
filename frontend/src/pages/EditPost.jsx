import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import Loader from '../components/Loader.jsx'
import PostForm from '../components/PostForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { postService } from '../services/postService.js'

export default function EditPost() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    postService
      .get(id)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const updatePost = async (values) => {
    setSubmitting(true)
    try {
      const updated = await postService.update(id, { ...values, category: values.category || null })
      toast.success('Post updated')
      navigate(`/posts/${updated.id}`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader label="Opening editor" />
  if (error) return <p className="shell error-text py-12">{error}</p>
  if (post.author_id !== user?.id) return <Navigate to={`/posts/${id}`} replace />

  return (
    <section className="shell py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Edit post</p>
        <h1 className="mb-8 font-serif text-4xl">Refine the piece.</h1>
        <PostForm initialValues={post} onSubmit={updatePost} submitting={submitting} submitLabel="Save changes" />
      </div>
    </section>
  )
}
