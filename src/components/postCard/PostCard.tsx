import { ReactNode } from 'react'

import Image from 'next/image'

import { Bookmark, LucideIcon } from 'lucide-react'

import { Text } from '@/components/ui/Text'

interface PostCardProps {
  userName: string
  userImage: string
  title: string
  postImage: string
  description: string
  postAt: string
  className?: string
  children?: ReactNode
  iconName?: LucideIcon
}

export default function PostCard({
  userName,
  userImage,
  title,
  postImage,
  description,
  postAt,
  className = '',
  iconName: Icon,
}: PostCardProps) {
  return (
    <div
      className={`
                flex-col
                relative
                w-full
                rounded-2xl
                items-start
                ${className}    
                `}
    >
      <div className="flex flex-row justify-between items-center mb-2 w-full">
        <div className="w-8 h-8 relative rounded-full overflow-hidden">
          <Image
            src={userImage}
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-2 flex-grow">
          <Text
            as="h1"
            size="t1"
            className="text-sm font-bold"
          >
            {userName}
          </Text>
        </div>
        <div className="flex ml-auto border-3 border-secondary rounded-full">
          {Icon && (
            <button className="text-secondary px-1 py-1">
              <Bookmark
                className="fill-secondary"
                size={18}
                strokeWidth={2}
              />
            </button>
          )}
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
        <div className="mt-2 font-bold">
          <Text
            as="h1"
            size="t1"
            className="text-xl"
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
  )
}
