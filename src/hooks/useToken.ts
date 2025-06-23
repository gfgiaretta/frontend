'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

const SUCCESS = 200

export default function useTokenCheck() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkToken = async () => {
      return
      try {
        const token = getToken()
        if (!token) {
          return
        }

        const response = await api(token).get('/auth/token')
        if (response.status !== SUCCESS) {
          throw new Error('Invalid token')
        }
      } catch (_) {
        setTimeout(() => {
          router.replace('/login')
          // eslint-disable-next-line no-magic-numbers
        }, 1)
      }
    }

    checkToken()
  }, [router])
}
