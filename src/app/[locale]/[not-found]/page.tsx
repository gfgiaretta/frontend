'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function RedirectToHome() {
  // this is to ensure no one goes to a page that doesn't exist
  const router = useRouter()

  useEffect(() => {
    router.replace('/home')
  }, [router])

  return null
}
