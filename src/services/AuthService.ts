import { AxiosResponse } from 'axios'

import { baseApi } from '@/utils/api'

export const CREATED_STATUS = 201

export type AccessToken = {
  accessToken: string
}

type SignUpResponse = {
  userId: string
  statusCode: number
  message: string
}

export async function signIn(email: string, password: string) {
  const data = { email, password }
  type Body = typeof data
  const response = await baseApi.post<Body, AxiosResponse<AccessToken>>(
    '/auth/login',
    data,
  )
  return response.data
}

export async function signUp(
  email: string,
  password: string,
  username: string,
) {
  const data = { email, password, name: username }
  type Body = typeof data
  const response = await baseApi.post<Body, AxiosResponse<SignUpResponse>>(
    '/user/register',
    data,
  )
  return response.data
}
