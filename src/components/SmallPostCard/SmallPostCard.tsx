'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Bookmark, LucideIcon } from 'lucide-react'

import PostCard from './PostCard/PostCard'
import { Text } from '@/components/ui/Text'

interface SmallPostCardProps {
  userName: string
  userImage: string
  title: string
  postImage: string
  description: string
  iconName?: LucideIcon
}

export default function SmallPostCard({
  userName,
  userImage,
  title,
  postImage,
  description,
  iconName: Icon,
}: SmallPostCardProps) {
  const [openPost, setOpenPost] = useState(false)

  return (
    <>
      <div
        className="mb-20 w-full max-w-md"
        onClick={() => setOpenPost(true)}
      >
        <div className="relative">
          <div className="overflow-hidden w-[300px] h-[150px]">
            <Image
              src={postImage}
              alt="Post image"
              fill
              className="rounded-t-2xl object-cover"
            />
          </div>
          <div className="absolute flex flex-row bg-text rounded-b-2xl justify-between items-center w-full top-30">
            <div className="flex flex-col text-background mx-3 my-3">
              <div>
                <Text
                  as="span"
                  size="body"
                  className=""
                >
                  {title}
                </Text>
              </div>
              <div>
                <Text
                  as="h3"
                  size="sub"
                  className="text-sm"
                >
                  {description}
                </Text>
              </div>
            </div>
            <div className="my-3 mx-3">
              <div className="rounded-full bg-text ml-auto border-3 border-secondary">
                {Icon && (
                  <button className="flex items-center justify-center">
                    <Bookmark
                      className="fill-secondary mx-1 my-1"
                      size={25}
                      strokeWidth={0}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row absolute top-0 bg-text/70 rounded-br-2xl rounded-tl-2xl">
            <div className="relative w-8 aspect-square mx-2 my-2">
              <Image
                src={userImage}
                alt="User avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-1 mr-3 flex items-center">
              <Text
                as="h1"
                size="t1"
                className="text-background text-sm"
              >
                {userName}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <PostCard
        userName={userName}
        userImage={userImage}
        title={title}
        postImage={postImage}
        description={description}
        open={openPost}
        onClose={() => setOpenPost(false)}
        postAt={''}
        favorite={false}
      />
    </>
  )
}
