'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { Bookmark, LucideIcon } from 'lucide-react'

import PostCard from './PostCard/PostCard'
import { Text } from '@/components/ui/Text'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface SmallPostCardProps {
  key: string
  postId: string
  userName: string
  userImage: string
  title: string
  postImage: string
  description: string
  createdAt: string
  favorite: boolean
  iconName?: LucideIcon
}

export default function SmallPostCard({
  postId,
  userName,
  userImage,
  title,
  postImage,
  description,
  createdAt,
  favorite,
  iconName: Icon,
}: SmallPostCardProps) {
  const [openPost, setOpenPost] = useState(false)
  const [isSaved, setIsSaved] = useState(favorite)

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      const token = getToken()
      const save = !isSaved
      if (!isSaved) {
        const response = await api(token).put('/post/save', {
          postId,
          save,
        })
        console.log('Save post response: ', response)
        setIsSaved(true)
      } else {
        const response = await api(token).put('/post/save', {
          postId,
          save,
        })

        console.log('Save post response: ', response)
        setIsSaved(false)
      }
    } catch (error) {
      console.error('Erro ao salvar/remover o post:', error)
    }
  }

  useEffect(() => {
    if (openPost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [openPost])

  return (
    <>
      <div
        className="mb-5 w-full max-w-md"
        onClick={() => setOpenPost(true)}
      >
        <div className="relative">
          <div className="overflow-hidden w-full h-[150px] relative">
            <Image
              src={postImage}
              alt="Post image"
              fill
              className="rounded-t-2xl object-cover"
            />
          </div>

          <div className="flex flex-row bg-text rounded-b-2xl justify-between items-center w-full top-30">
            <div className="flex flex-col text-background mx-3 my-3">
              <div>
                <Text
                  as="span"
                  size="body"
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
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center"
                  >
                    <Bookmark
                      className={`mx-1 my-1 ${
                        isSaved
                          ? 'fill-secondary text-secondary'
                          : 'fill-none text-secondary'
                      }`}
                      size={23}
                      strokeWidth={2}
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
        postId={postId}
        userName={userName}
        userImage={userImage}
        title={title}
        postImage={postImage}
        description={description}
        open={openPost}
        onClose={() => setOpenPost(false)}
        createdAt={createdAt}
        favorite={isSaved}
      />
    </>
  )
}
