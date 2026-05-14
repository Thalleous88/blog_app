import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { postSchema } from '../utils/validators.js'
import FormInput from './FormInput.jsx'

export default function PostForm({ initialValues, onSubmit, submitting, submitLabel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues || { title: '', category: '', content: '' }
  })

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Title" placeholder="A clear title that invites the right reader" error={errors.title?.message} {...register('title')} />
      <FormInput label="Category" placeholder="Engineering, product, growth..." error={errors.category?.message} {...register('category')} />
      <FormInput multiline rows={18} label="Content" placeholder="Write with Markdown. Use headings, lists, links, and code blocks when useful." error={errors.content?.message} {...register('content')} />
      <button disabled={submitting} className="btn-primary w-fit">{submitting ? 'Saving' : submitLabel}</button>
    </form>
  )
}
