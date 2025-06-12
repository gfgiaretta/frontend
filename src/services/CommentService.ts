import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export interface CommentDTO {
  comment_id: string
  owner: {
    id: string
    name: string
    profile_picture_url: string
  }
  content: string
}

export async function fetchComments(postId: string): Promise<CommentDTO[]> {
  const token = getToken()
  const response = await api(token).get('/comment', {
    params: { postId: postId },
  })
  return response.data
}

export async function sendComment(postId: string, content: string) {
  const token = getToken()
  return api(token).post('/comment', {
    postId: postId,
    content,
  })
}

export async function deleteComment(commentId: string) {
  const token = getToken()
  return api(token).delete(`/api/comment/${commentId}`)
}
