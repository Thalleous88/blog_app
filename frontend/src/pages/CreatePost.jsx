import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import PostForm from '../components/PostForm.jsx'
import { postService } from '../services/postService.js'

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const createPost = async (values) => {
    setSubmitting(true)
    try {
      const post = await postService.create({ ...values, category: values.category || null })
      toast.success('Post published')
      navigate(`/posts/${post.id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="shell py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">New post</p>
        <h1 className="mb-8 font-serif text-4xl">Shape a useful argument.</h1>
        <PostForm onSubmit={createPost} submitting={submitting} submitLabel="Publish post" />
      </div>
    </section>
  )
}
