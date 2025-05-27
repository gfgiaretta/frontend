'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Bookmark, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PostCard from '@/components/postCard/PostCard'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getTimeSince } from '@/utils/dateUtils'
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()
  useTokenCheck()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken()
        const response = await api(token).get('/post/1')
        setPosts(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.data.map((item: any) => {
            return {
              id: item.post_id,
              userName: item.owner.name,
              title: item.title,
              description: item.description,
              createdAt: item.createdAt,
              userImage: item.owner.profile_picture_url,
              postImage: item.image_url,
              saved: item.isSaved,
            }
          }) as Post[],
        )
        console.log(response)
      } catch {}
    }

    fetchPosts()
  }, [])

  const icon = [Bookmark, Plus]
  const t = useTranslations('PostCard')

  return (
    <div className="h-full w-full flex flex-col px-6 py-6 bg-background">
      <div className="mb-5 flex flex-row w-full justify-between items-center">
        <div>
          <Image
            src="/creative-flow-logo-completo.svg"
            alt={''}
            width={100}
            height={100}
          />
        </div>
        <div className="flex ml-auto rounded-full bg-primary">
          <button
            className="w-8 h-8 flex justify-center items-center"
            onClick={() => router.push('/post')}
          >
            <Plus
              className="text-white"
              size={20}
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 pb-[76px]">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            userName={post.userName}
            title={post.title}
            description={post.description}
            postAt={getTimeSince(post.createdAt, t)}
            userImage={post.userImage}
            postImage={post.postImage}
            iconName={icon[0]}
          />
        ))}
      </div>
    </div>
  )
}
