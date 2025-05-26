'use client'

import { useSearchParams } from 'next/navigation'

import FeedbackScreen from '@/components/Feedback/FeedbackScreen'

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const exerciseId = searchParams.get('exerciseId')

  return (
    <div className="w-screen h-screen justify-center items-center flex bg-background">
      {exerciseId && <FeedbackScreen />}
      {exerciseId == null && <div>Erro</div>}
    </div>
  )
}
