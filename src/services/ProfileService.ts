import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export interface patchProfileParams {
  description?: string
  profilePictureUrl?: string
}

export const patchProfile = async ({
  description,
  profilePictureUrl,
}: patchProfileParams) => {
  const token = getToken()
  const response = await api(token).patch('/user/profile', {
    description,
    profilePictureUrl,
  })

  // eslint-disable-next-line no-magic-numbers
  return response.status === 200
}
