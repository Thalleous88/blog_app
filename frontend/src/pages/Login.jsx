import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { loginSchema } from '../utils/validators.js'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values) => {
    try {
      await login(values)
      toast.success('Welcome back')
      navigate(location.state?.from?.pathname || '/profile')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className="shell grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="w-full max-w-md border border-line bg-white p-6 shadow-soft">
        <p className="eyebrow mb-3">Login</p>
        <h1 className="font-serif text-3xl">Continue your writing desk.</h1>
        <form className="mt-7 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <FormInput label="Password" type="password" error={errors.password?.message} {...register('password')} />
          <button disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Signing in' : 'Sign in'}</button>
        </form>
        <p className="mt-5 text-sm text-muted">
          New here? <Link className="font-semibold text-accent" to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  )
}
