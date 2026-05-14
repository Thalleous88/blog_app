import { useCallback, useEffect, useState } from 'react'

export function useAsync(callback) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const execute = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await callback()
      setData(result)
      return result
    } catch (err) {
      setError(err.message || 'Request failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [callback])

  useEffect(() => {
    execute()
  }, [execute])

  return { data, error, loading, execute, setData }
}
