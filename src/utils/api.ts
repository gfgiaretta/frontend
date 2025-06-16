import axios, { AxiosInstance } from 'axios'

export const baseApi = axios.create({
  baseURL: 'http://18.190.86.246/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const addAuth = (api: AxiosInstance, token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`
  return api
}

export const api = (token: string) => addAuth(baseApi, token)
