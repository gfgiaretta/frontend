'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Bookmark, LucideIcon, SquarePen } from 'lucide-react'

import SmallPostCard from '@/components/SmallPostCard/SmallPostCard'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface UserProps {
  iconName?: LucideIcon
}

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

export default function ProfileScreen({ iconName: icon }: UserProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Name',
    description: '',
    streak: 0,
    userImage: '',
    posts: [],
  })
  const Icon = [Bookmark]
  const router = useRouter()
  useTokenCheck()
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken()
        const response = await api(token).get('user/profile')
        console.log('RESPONSE: ', response)
        const user = response.data.data
        setUserInfo({
          name: user.name,
          description: user.description,
          streak: user.streak,
          userImage: user.profile_picture_url,
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
    console.log('UserInfor pre call: ', userInfo)
    fetchUserInfo()
    console.log('UserInfor post call: ', userInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full min-h-screen flex flex-col relative bg-background">
      <div className="w-full flex relative justify-between items-start px-4 py-4 bg-cover w-full h-[15vh] bg-[url('/profile-top-wave.svg')] bg-no-repeat bg-cover bg-bottom relative">
        <div>
          {icon && (
            <button
              className="text-white px-1 py-1"
              onClick={() => router.push('/profile/edit-profile')}
            >
              <SquarePen
                className=""
                size={25}
                strokeWidth={2}
              />
            </button>
          )}
        </div>
        <div>
          {icon && (
            <button className="text-white px-1 py-1">
              <Bookmark
                className=""
                size={25}
                strokeWidth={2}
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center px-4 absolute top-13 left-1/2 -translate-x-1/2">
        <div className="relative w-max">
          {/* Streak*/}
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
          <div className="z-10">
            <Image
              src={userInfo.userImage}
              width={90}
              height={90}
              className="rounded-full"
              alt="User image"
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
      <div className="absolute w-full px-6 py-3 pb-20 pt-44 left-1/2 -translate-x-1/2 top-25">
        {userInfo.posts.map((post) => (
          <SmallPostCard
            key={post.id}
            userName={post.userName}
            userImage={post.userImage}
            title={post.title}
            postImage={post.postImage}
            description={post.description}
            iconName={Icon[0]}
          />
        ))}
      </div>
    </div>
  )
}
