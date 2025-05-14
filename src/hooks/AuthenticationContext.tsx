'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
}

interface AuthenticationContextType {
  user: User | null | undefined
  isLoadingAuthentication: boolean
  setUser: (_user: User | null) => void
}

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined)

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const TIME_OUT = 2000
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingAuthentication(true)

      try {
        // const fakeNullUser = null
        const fakeUser = {
          id: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
        }

        // Simula delay
        await new Promise((res) => setTimeout(res, TIME_OUT))

        if (fakeUser == null) {
          router.replace('/login')
        } else {
          setUser(fakeUser)
        }
      } catch {
        setUser(null)
      } finally {
        setIsLoadingAuthentication(false)
      }
    }

    loadUser()
  }, [router])

  return (
    <AuthenticationContext.Provider
      value={{ user, isLoadingAuthentication, setUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error(
      'useAuthentication deve ser usado dentro de AuthenticationProvider',
    )
  }
  return context
}
