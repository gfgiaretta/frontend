import { create } from 'zustand'

import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface User {
  userId: string
  userName: string
  interests: string[]
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export async function useInitUser() {
  const token = getToken()
  const userData = (await api(token).get('/auth/token')) as User
  if (!userData) {
    return
  }
  useUserStore.setState({ user: userData })
  return userData
}

//TODO: actually use this on our app context
