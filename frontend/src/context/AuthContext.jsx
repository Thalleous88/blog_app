import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { authService } from '../services/authService.js'
import { TOKEN_KEY } from '../utils/storage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(Boolean(token))

  const loadUser = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setLoading(false)
      return
    }

    try {
      const profile = await authService.me()
      setUser(profile)
    } catch {
      setUser(null)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    const onExpired = () => {
      setUser(null)
      setToken(null)
    }
    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [])

  const login = useCallback(async (payload) => {
    const response = await authService.login(payload)
    localStorage.setItem(TOKEN_KEY, response.access_token)
    setToken(response.access_token)
    const profile = await authService.me()
    setUser(profile)
  }, [])

  const register = useCallback(async (payload) => {
    await authService.register(payload)
    await login({ email: payload.email, password: payload.password })
  }, [login])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      setToken(null)
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      refreshUser: loadUser
    }),
    [user, token, loading, login, register, logout, loadUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
