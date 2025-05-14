'use client'

import React from 'react'

import { SplashScreen } from '@/components/SplashScreen/SplashScreen'
import { useAuthentication } from '@/hooks/AuthenticationContext'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isLoadingAuthentication } = useAuthentication()

  if (isLoadingAuthentication) {
    return <SplashScreen isLoading={isLoadingAuthentication} />
  }

  return children
}
