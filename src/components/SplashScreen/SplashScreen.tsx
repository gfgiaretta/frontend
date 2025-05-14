'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

interface SplashScreenProps {
  isLoading: boolean
}

export function SplashScreen({ isLoading }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShowLogo(true)
    } else {
      setShowLogo(false)
    }
  }, [isLoading])

  return (
    <div className="w-full h-dvh bg-background flex items-center justify-center overflow-hidden">
      <Image
        src="/logo-c-flow.svg"
        alt="Logo cflow"
        width={370}
        height={214}
        className={`h-auto transform transition-all duration-[2400ms] ease-[cubic-bezier(0.33, 1, 0.68, 1)] 
          ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
      />
    </div>
  )
}
