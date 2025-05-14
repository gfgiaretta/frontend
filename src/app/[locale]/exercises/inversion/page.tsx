'use client'

import { useSearchParams } from 'next/navigation'

import { Inversion } from '@/components/Exercises/Inversion/Inversion'

export default function InversionPage() {
  const searchParams = useSearchParams()
  const exerciseId =
    searchParams.get('exerciseId') ?? '7a4fc39c-0f98-4cd6-9362-e161b142295a'

  return (
    <div className="w-screen h-screen justify-center items-center flex bg-background">
      <Inversion exerciseId={exerciseId} />
    </div>
  )
}
