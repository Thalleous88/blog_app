import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '../context/AuthContext.jsx'
import { commentService } from '../services/commentService.js'
import { formatDate } from '../utils/date.js'
import { commentSchema } from '../utils/validators.js'
import FormInput from './FormInput.jsx'

export default function CommentCard({ comment, onChanged, onDeleted }) {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const isOwner = user?.id === comment.author_id
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: comment.content }
  })

  const updateComment = async (values) => {
    try {
      const updated = await commentService.update(comment.id, values)
      onChanged(updated)
      setEditing(false)
      toast.success('Comment updated')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async () => {
    try {
      await commentService.remove(comment.id)
      onDeleted(comment.id)
      toast.success('Comment deleted')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <article className="border-b border-line py-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold">{comment.author?.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{formatDate(comment.created_at)}</p>
        </div>
        {isOwner && (
          <div className="flex items-center gap-2">
            <button className="text-sm font-semibold text-muted hover:text-ink" onClick={() => setEditing((value) => !value)}>
              {editing ? 'Cancel' : 'Edit'}
            </button>
            <button className="text-sm font-semibold text-ember hover:text-ink" onClick={deleteComment}>Delete</button>
          </div>
        )}
      </div>

      {editing ? (
        <form className="grid gap-3" onSubmit={handleSubmit(updateComment)}>
          <FormInput multiline rows={4} label="Comment" error={errors.content?.message} {...register('content')} />
          <button disabled={isSubmitting} className="btn-primary w-fit">{isSubmitting ? 'Saving' : 'Save comment'}</button>
        </form>
      ) : (
        <p className="whitespace-pre-wrap leading-7 text-muted">{comment.content}</p>
      )}
    </article>
  )
}
