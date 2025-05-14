import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export const CREATED_STATUS = 201

export type Reference = {
  library_id: string
  description: string
  link: string
  image_url: string
  createdAt: string
  updatedAt: string
  isSaved: boolean
}

export async function getReferences() {
  const token = getToken()
  const response = await api(token).get('/library')
  return response.data as Reference[]
}
