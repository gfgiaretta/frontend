'use client'

import React from 'react'

import { Bookmark } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Text } from '../ui/Text'
import SmallPostCard from '@/components/SmallPostCard/SmallPostCard'

type SavedPost = {
  id: string
  title: string
  description: string
  image: string
  author?: {
    name: string
    avatar: string
  }
}

const mockSavedPosts: SavedPost[] = [
  {
    id: '1',
    title: 'Dados mockados ',
    description: 'Dados mockados ',
    image: '/public/creative.png',
  },
  {
    id: '2',
    title: 'Dados mockados ',
    description: 'Dados mockados ',
    image: '/images/saved2.png',
    author: {
      name: '@Dados mockados',
      avatar: '/public/author1.png',
    },
  },
  {
    id: '3',
    title: 'Dados mockados ',
    description: 'Dados mockados',
    image: '/images/saved3.png',
  },
  {
    id: '4',
    title: 'Dados mockados',
    description: 'Dados mockados',
    image: '/images/saved4.png',
    author: {
      name: '@Dados mockados',
      avatar: '/images/author2.png',
    },
  },
]

export function Saved() {
  const t = useTranslations('Saved')

  return (
    <div className="py-12 px-6 max-w-md mx-auto">
      <Text
        as="h1"
        size="t1"
        className="text-primary pb-4"
      >
        {t('title')}
      </Text>
      <div className="flex flex-col items-center gap-4">
        {mockSavedPosts.map((item) => (
          <SmallPostCard
            key={item.id}
            userName={item.author?.name || t('unknownAuthor')}
            userImage={item.author?.avatar || '/images/default-avatar.png'}
            title={item.title}
            description={item.description}
            postImage={item.image}
            iconName={Bookmark}
          />
        ))}
      </div>
    </div>
  )
}
