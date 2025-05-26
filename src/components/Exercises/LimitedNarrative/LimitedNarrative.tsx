'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { AlertModal, AlertModalHandle } from '../../ui/AlertModal'
import { NarrativeField } from './NarrativeField'
import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

const TOTAL_FIELDS = 8
const DISPLAY_OFFSET = 1
const DISPLAY_ZERO = 0
// const JSON_SPACING = 2

interface AnswerNarrative {
  words: string[]
  finalPhrase: string
}

type LimitedNarrativeProps = {
  exerciseId: string
}

export function LimitedNarrative({ exerciseId }: LimitedNarrativeProps) {
  const [answer, setAnswer] = useState<AnswerNarrative>({
    words: Array(TOTAL_FIELDS).fill(''),
    finalPhrase: '',
  })
  const router = useRouter()
  const t = useTranslations('LimitedNarrative')

  useTokenCheck()

  const modalRef = useRef<AlertModalHandle>(null)

  const handleChange = (index: number, value: string) => {
    const wordWithoutSpace = value.replace(/\s/g, '')
    const newWords = [...answer.words]
    newWords[index] = wordWithoutSpace
    const newPhrase = newWords.filter((p) => p.trim() !== '').join(' ')

    setAnswer({
      words: newWords,
      finalPhrase: newPhrase,
    })
  }

  const handleConfirm = async () => {
    // const exerciseId = '7a4fc39c-0f98-4cd6-9362-e161b142295a'

    try {
      const token = getToken()

      const response = await api(token).get('/auth/token')
      const userId = response.data.userId

      await api(token).post('/exercise/register', {
        userId,
        exerciseId,
      })

      router.push(`/exercises/feedback?exerciseId=${exerciseId}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message)
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background text-text font-sfPro md:max-w-[50%]">
      <AlertModal
        ref={modalRef}
        title={t('alertTitle')}
        description={t('alertDescription')}
      ></AlertModal>

      <TitleBar
        label={t('title')}
        answer={{ finalPhrase: answer.finalPhrase }}
        onConfirm={handleConfirm}
      />

      <Text
        as="h3"
        size="sub"
        className="text-text mb-6"
      >
        {t('description')}
      </Text>

      <div className="flex flex-col items-center gap-4">
        {answer.words.map((_word, index) => (
          <NarrativeField
            key={index}
            index={index}
            onChange={(value) => handleChange(index, value)}
            disabled={
              index > DISPLAY_ZERO &&
              answer.words[index - DISPLAY_OFFSET].trim() === ''
            }
          />
        ))}
      </div>
    </div>
  )
}
