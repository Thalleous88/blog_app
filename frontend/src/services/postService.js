import { api } from '../api/client.js'

export const postService = {
  async list({ page = 1, limit = 10, search = '' } = {}) {
    const params = new URLSearchParams({ page, limit })
    if (search) params.set('search', search)
    const { data } = await api.get(`/posts?${params.toString()}`)
    return data
  },
  async get(id) {
    const { data } = await api.get(`/posts/${id}`)
    return data
  },
  async create(payload) {
    const { data } = await api.post('/posts', payload)
    return data
  },
  async update(id, payload) {
    const { data } = await api.put(`/posts/${id}`, payload)
    return data
  },
  async remove(id) {
    await api.delete(`/posts/${id}`)
  }
}
