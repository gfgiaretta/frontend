'use client'

import { Bookmark, SquarePen } from 'lucide-react'

import ProfileScreen from '@/components/Profile/ProfileScreen'

export default function ProfilePage() {
  const icon = [Bookmark, SquarePen]

  return (
    <div className="w-full h-full min-h-screen bg-background ">
      <ProfileScreen
        userName={'@Lucas'}
        userImage={'/userimage.jpg'}
        description={'Description'}
        streak={'21'}
        iconName={icon[0]}
      />
    </div>
  )
}
