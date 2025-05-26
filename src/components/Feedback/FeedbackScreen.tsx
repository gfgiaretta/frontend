'use client'

import React, { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import StreakCard from './StreakCard'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'

export default function FeedbackScreen() {
  const t = useTranslations('Feedback')
  const NumberOfDays = 1
  const router = useRouter()
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSharing(true)
    try {
      const title = 'Acabei de realizar o exercício diário!'
      router.push(`/post?title=${title}`)
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
          <StreakCard days={NumberOfDays} />
        </div>

        <div className="flex space-x-4 mt-10">
          <Link href="/home">
            <Button
              variant="outlined"
              size="md"
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
