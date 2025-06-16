'use client'

import React, { useEffect, useState } from 'react'

import { Book, Bookmark } from 'lucide-react'
import { useTranslations } from 'next-intl'

import LibraryCard from '../LibraryCard/LibraryCard'
import { Text } from '../ui/Text'
import SmallPostCard from '@/components/SmallPostCard/SmallPostCard'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface PostData {
  post_id: string
  owner: {
    name: string
    profile_picture_url: string
  }
  title: string
  description: string
  createdAt: string
  image_url: string
  isSaved: boolean
}

interface LibraryData {
  library_id: string
  image_url: string
  description: string
  link: string
}

type SavedItem =
  | { type: 'post'; data: PostData }
  | { type: 'library'; data: LibraryData }

export function Saved() {
  const t = useTranslations('Saved')
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const token = getToken()
        const response = await api(token).get('/user/savedItems')

        setSavedItems(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.data.data.map((item: any) => {
            let savedItem

            if (item.post_id) {
              savedItem = {
                type: 'post',
                data: item as PostData,
              }
            } else if (item.library_id) {
              savedItem = {
                type: 'library',
                data: item as LibraryData,
              }
            }
            return savedItem
          }) as SavedItem[],
        )
      } catch (error) {
        console.error('Failed to fetch savedItems', error)
      }
    }

    fetchSavedItems()
  }, [])

  function generateItemCard(item: SavedItem) {
    let card

    if (item.type === 'post') {
      card = (
        <SmallPostCard
          key={item.data.post_id}
          postId={item.data.post_id}
          userName={item.data.owner.name}
          title={item.data.title}
          description={item.data.description}
          createdAt={item.data.createdAt}
          postImage={item.data.image_url}
          userImage={item.data.owner.profile_picture_url}
          iconName={Bookmark}
        />
      )
    } else {
      card = (
        <LibraryCard
          key={item.data.library_id}
          image={item.data.image_url}
          title={item.data.description}
          descriptions={''}
          className="w-full shadow-md"
          iconName={Book}
          link={item.data.link}
        />
      )
    }
    return card
  }

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
        {savedItems.map((item) => generateItemCard(item))}
      </div>
    </div>
  )
}
