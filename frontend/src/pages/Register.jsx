import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { registerSchema } from '../utils/validators.js'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (values) => {
    try {
      await registerUser(values)
      toast.success('Account created')
      navigate('/profile')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className="shell grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="w-full max-w-md border border-line bg-white p-6 shadow-soft">
        <p className="eyebrow mb-3">Register</p>
        <h1 className="font-serif text-3xl">Start publishing with care.</h1>
        <form className="mt-7 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Name" error={errors.name?.message} {...register('name')} />
          <FormInput label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <FormInput label="Password" type="password" error={errors.password?.message} {...register('password')} />
          <button disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Creating account' : 'Create account'}</button>
        </form>
        <p className="mt-5 text-sm text-muted">
          Already have an account? <Link className="font-semibold text-accent" to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
