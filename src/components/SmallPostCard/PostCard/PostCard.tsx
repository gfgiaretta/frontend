'use client'

import { ReactNode, useState } from 'react'

import Image from 'next/image'

import { Bookmark } from 'lucide-react'

import { Text } from '@/components/ui/Text'

interface PostCardProps {
  userName: string
  userImage: string
  title: string
  postImage: string
  description: string
  postAt: string
  favorite: boolean
  className?: string
  children?: ReactNode
  open: boolean
  onClose: () => void
}

export default function PostCard({
  userName,
  userImage,
  title,
  postImage,
  description,
  postAt,
  favorite,
  className = '',
  open,
  onClose,
}: PostCardProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      // eslint-disable-next-line no-magic-numbers
    }, 300)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30">
      <div
        className={`absolute inset-0 bg-black/50 ${isClosing ? 'animate-[fadeOut_300ms_ease-in-out]' : 'animate-[fadeIn_300ms_ease-in-out]'}`}
        onClick={handleClose}
      />

      <div
        className={`
          absolute bottom-16 left-0 w-full h-fit 
          bg-background rounded-t-3xl 
          p-4 pb-9 shadow-xl
          ${isClosing ? 'animate-[slideDown_300ms_ease-in-out]' : 'animate-[slideUp_300ms_ease-in-out]'}
        `}
      >
        <div className="w-full flex items-center justify-center">
          <div
            className={`
            flex flex-col relative w-full max-w-md ${className}
          `}
          >
            <div className="flex flex-row justify-between items-center mb-4 w-full">
              <div className="flex-shrink-0">
                <Image
                  src={userImage}
                  alt="User avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
              <div className="ml-2 flex-grow">
                <Text
                  as="h1"
                  size="t1"
                  className="text-sm font-medium"
                >
                  {userName}
                </Text>
              </div>
              <div className="flex ml-auto border-2 border-secondary rounded-full">
                <button className="text-secondary px-1 py-1">
                  <Bookmark
                    className={`${favorite && 'fill-secondary'}`}
                    size={18}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <Image
                src={postImage}
                alt="Post content"
                width={342}
                height={296}
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>

            <div>
              <div className="mt-2">
                <Text
                  as="h1"
                  size="t1"
                  className="text-xl font-medium"
                >
                  {title}
                </Text>
              </div>
              <div>
                <Text
                  as="h1"
                  size="sub"
                >
                  {description}
                </Text>
              </div>
              <div className="mt-2">
                <Text
                  as="h1"
                  size="notes"
                  className="text-grey-1"
                >
                  {postAt}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
