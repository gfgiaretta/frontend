import axios, { AxiosInstance } from 'axios'

export const baseApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const addAuth = (api: AxiosInstance, token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`
  return api
}

export const api = (token: string) => addAuth(baseApi, token)
