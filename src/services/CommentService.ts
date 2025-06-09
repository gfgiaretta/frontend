import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export interface CommentDTO {
  comment_id: string
  owner: {
    name: string
    profile_picture_url: string
  }
  content: string
}

export async function fetchComments(postId: string): Promise<CommentDTO[]> {
  const token = getToken()
  const response = await api(token).get('/comment', {
    params: { post_id: postId },
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
