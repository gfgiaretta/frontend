'use client'

import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import StreakCard from './StreakCard'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { getToken } from '@/utils/token'
import { api } from '@/utils/api'


export default function FeedbackScreen() {
  const DEFAULT_VALUE = 0
  const t = useTranslations('Feedback')
  const router = useRouter()
  const [isSharing, setIsSharing] = useState(false)
  const [streak, setStreak] = useState(DEFAULT_VALUE)

  useEffect(() => {
    const fetchStreak = async () => {
      const token = getToken()
      try {
        const response = await api(token).get(`/user/streak`)
        const streakDays = response.data.streak

        setStreak(streakDays)
      } catch (error) {
        console.error('Erro ao buscar streak:', error)
      }
    }

    fetchStreak()
  }, [])

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSharing(true)
    try {
      router.push(`/post?hasExercise=true`)
    } catch (err) {
      console.error('Erro ao compartilhar:', err)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t('feedbackTitle')}</title>
      </Head>
      <div className="flex flex-col space-x-2 items-center justify-center min-h-screen bg-background text-text p-4">
        <Text
          as="h3"
          className="text-text text-center"
        >
          {t('feedbackMessage')}
        </Text>

        <div className="my-4 ml-16">
          <Image
            src="/feedbackimage.svg"
            alt="Feedback Image"
            width={300}
            height={300}
          />
        </div>

        <Text
          as="p"
          size="sub"
          className="text-base space-x-2 text-grey1 text-center max-w-lg"
        >
          {t('motivation')}
        </Text>

        <div className="flex space-x-4 mt-6 mb-10">
          <StreakCard days={streak} />
        </div>

        <div className="flex space-x-4 mt-10">
          <Link href="/home">
            <Button
              variant="outlined"
              size="md"
              onClick={() => document.cookie = 'exerciseDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'}
            >
              {t('backToFeed')}
            </Button>
          </Link>

          <Link
            href="#"
            onClick={handleShare}
            passHref
          >
            <Button
              variant="filled"
              size="md"
              disabled={isSharing}
            >
              {isSharing ? t('sharing') : t('share')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
