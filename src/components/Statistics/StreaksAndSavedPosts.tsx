'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { Text } from '../ui/Text'
import CardsProps from './CardsProps'
import useTokenCheck from '@/hooks/useToken'

type Props = {
  streak: number
  savedPosts: number
}

export const StreaksAndSavedPosts = ({ streak, savedPosts }: Props) => {
  useTokenCheck()
  const t = useTranslations('General')
  const textAuxStreaks = useTranslations('consecutive days')
  const textAuxPost = useTranslations('saved posts')

  return (
    <div className="w-full h-full pt-8 bg-background">
      <div className="justify-start">
        <Text
          as="h2"
          size="t2"
          className="text-text"
        >
          {t('title')}
        </Text>
      </div>
      <div className="flex gap-4 w-full mx-auto pt-2">
        <CardsProps
          value={streak}
          textAux={textAuxStreaks('text')}
          img={
            <Image
              src="/streakStatistics.svg"
              alt="Streak"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          }
          color={'support-orange'}
        />
        <CardsProps
          value={savedPosts}
          textAux={textAuxPost('text')}
          img={
            <Image
              src="/bookmark.svg"
              alt="Bookmark"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          }
          color={'text'}
        />
      </div>
    </div>
  )
}
