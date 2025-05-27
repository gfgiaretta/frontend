'use client'

import { useSearchParams } from 'next/navigation'

import { EditUser } from '@/components/EditUser/EditUser'

export default function EditProfilePage() {
  const searchParams = useSearchParams()
  const bio = searchParams.get('bio') ?? ''
  const userImage = searchParams.get('userImage') ?? ''

  return (
    <EditUser
      bio={bio}
      userImage={userImage}
    />
  )
}
