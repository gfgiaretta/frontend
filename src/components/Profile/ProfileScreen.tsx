'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Bookmark, SquarePen } from 'lucide-react'

import SmallPostCard from '@/components/SmallPostCard/SmallPostCard'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface Post {
  id: string
  userName: string
  title: string
  description: string
  createdAt: string
  userImage: string
  postImage: string
  saved: boolean
}

interface UserInfo {
  name: string
  description: string
  streak: number
  userImage: string
  posts: Post[]
}

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Name',
    description: '',
    streak: 0,
    userImage: '',
    posts: [],
  })
  const router = useRouter()
  useTokenCheck()
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken()
        const response = await api(token).get('user/profile')
        const user = response.data.data
        setUserInfo({
          name: user.name,
          description: user.description,
          streak: user.streak,
          userImage: user.profilePictureUrl,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          posts: user.posts.map((post: any) => ({
            id: post.post_id,
            userName: post.owner.name,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            userImage: post.owner.profile_picture_url,
            postImage: post.image_url,
            saved: post.isSaved,
          })),
        })
      } catch {}
    }
    fetchUserInfo()
  }, [])

  const handleEditClick = () => {
    const bioParam = encodeURIComponent(userInfo.description || '')
    const imageParam = encodeURIComponent(userInfo.userImage || '')
    router.push(`profile/edit-profile?bio=${bioParam}&userImage=${imageParam}`)
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col relative bg-background">
      <div className="flex relative justify-between items-start px-4 py-4 w-full h-[15vh] bg-[url('/profile-top-wave.svg')] bg-no-repeat bg-cover bg-bottom">
        <div>
          <button
            className="text-white px-1 py-1"
            onClick={handleEditClick}
          >
            <SquarePen
              size={25}
              strokeWidth={2}
            />
          </button>
        </div>
        <div>
          <button
            className="text-white px-1 py-1"
            onClick={() => router.push('/saved')}
          >
            <Bookmark
              size={25}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center px-4 absolute top-13 left-1/2 -translate-x-1/2">
        <div className="relative w-max">
          {/* Streak */}
          <div className="absolute top-0 right-0 z-20 flex items-center justify-center w-8 h-8 bg-support-orange rounded-full p-1">
            <Image
              src="/streak.svg"
              width={14}
              height={14}
              className="rounded-full mr-1"
              alt="streak"
            />
            <Text
              as="span"
              size="notes"
              className="text-xs text-background"
            >
              {userInfo.streak}
            </Text>
          </div>

          {/* User Image */}
          <div className="relative w-24 h-24 aspect-square z-10">
            <Image
              src={userInfo.userImage || '/userimage.jpg'}
              fill
              alt="User image"
              className="rounded-full object-cover border border-grey-1 shadow"
            />
          </div>
        </div>
        <div className="py-1 px-1">
          <Text
            as="span"
            size="body"
          >
            {userInfo.name}
          </Text>
        </div>
        <div className="px-2 py-2 mt-2">
          <Text
            as="h3"
            size="sub"
          >
            {userInfo.description}
          </Text>
        </div>
        <div className="px-3 py-3">
          <Text
            as="span"
            size="notes"
            className="text-grey-1"
          >
            Posts
          </Text>
        </div>
      </div>
      <div className="items-center flex flex-col gap-8 w-full px-6 py-3 pb-20 pt-44">
        {userInfo.posts.map((post) => (
          <SmallPostCard
            key={post.id}
            postId={post.id}
            userName={post.userName}
            userImage={post.userImage}
            title={post.title}
            postImage={post.postImage}
            description={post.description}
            iconName={Bookmark}
            createdAt={post.createdAt}
            favorite={post.saved}
          />
        ))}
      </div>
    </div>
  )
}
