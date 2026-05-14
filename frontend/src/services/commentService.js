import { api } from '../api/client.js'

export const commentService = {
  async list(postId) {
    const { data } = await api.get(`/posts/${postId}/comments`)
    return data
  },
  async create(postId, payload) {
    const { data } = await api.post(`/posts/${postId}/comments`, payload)
    return data
  },
  async update(commentId, payload) {
    const { data } = await api.put(`/comments/${commentId}`, payload)
    return data
  },
  async remove(commentId) {
    await api.delete(`/comments/${commentId}`)
  }
}
