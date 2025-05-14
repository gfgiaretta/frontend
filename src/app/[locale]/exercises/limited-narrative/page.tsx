'use client'

import { useSearchParams } from 'next/navigation'

import { LimitedNarrative } from '@/components/Exercises/LimitedNarrative/LimitedNarrative'

export default function LimitedNarrativePage() {
  const searchParams = useSearchParams()
  const exerciseId =
    searchParams.get('exerciseId') ?? '7a4fc39c-0f98-4cd6-9362-e161b142295a'
  return (
    <div className="w-screen h-screen justify-center items-center flex bg-background">
      <LimitedNarrative exerciseId={exerciseId} />
    </div>
  )
}
