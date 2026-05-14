import { forwardRef } from 'react'

const FormInput = forwardRef(function FormInput({ label, error, multiline = false, rows = 6, ...props }, ref) {
  const Input = multiline ? 'textarea' : 'input'

  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <Input ref={ref} className="input resize-y" rows={multiline ? rows : undefined} {...props} />
      {error && <span className="error-text">{error}</span>}
    </label>
  )
})

export default FormInput
