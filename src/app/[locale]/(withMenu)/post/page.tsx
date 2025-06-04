'use client'

import { useSearchParams } from 'next/navigation'

import { Publication } from '@/components/Publication/Publication'

export default function CreatePostPage() {
  const searchParams = useSearchParams()
  const exerciseId = searchParams.get('exerciseId')
  return (
    <div className="w-screen h-screen justify-center items-center flex bg-background">
      <Publication exerciseId={exerciseId || null} />
    </div>
  )
}
