'use client'

import { useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { AlertModal, AlertModalHandle } from '../../ui/AlertModal'
import { NarrativeField } from './NarrativeField'
import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { saveExercisesDetails } from '@/utils/saveExercisesDetails'
import { getToken } from '@/utils/token'

const TOTAL_FIELDS = 8
const DISPLAY_OFFSET = 1
const DISPLAY_ZERO = 0
// const JSON_SPACING = 2

interface AnswerNarrative {
  words: string[]
  finalPhrase: string
}

interface ExerciseDetails {
  title: string
  description: string
  imageUrl: string
}

export function LimitedNarrative() {
  const searchParams = useSearchParams()
  const exerciseId = searchParams.get('exerciseId') || ''

  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetails>({
    title: '',
    description: '',
    imageUrl: '',
  })
  const [answer, setAnswer] = useState<AnswerNarrative>({
    words: Array(TOTAL_FIELDS).fill(''),
    finalPhrase: '',
  })
  const router = useRouter()
  const t = useTranslations('LimitedNarrative')

  useTokenCheck()

  const modalRef = useRef<AlertModalHandle>(null)

  const fetchExerciseDetails = async () => {
    try {
      const token = getToken()
      const response = await api(token).get(`/exercise/${exerciseId}`)

      setExerciseDetails({
        title: response.data.title,
        description: response.data.description,
        imageUrl: response.data.imageUrl,
      })
    } catch (error) {
      console.error('Error fetching exercise details:', error)
    }
  }

  if (exerciseId) {
    fetchExerciseDetails()
  }

  const handleChange = (index: number, value: string) => {
    const newWords = [...answer.words]
    newWords[index] = value
    setAnswer({
      words: newWords,
      finalPhrase: answer.finalPhrase,
    })
  }

  const handleConfirm = async () => {
    try {
      if (!exerciseId) {
        console.error('No exercise ID provided')
        return
      }

      const token = getToken()

      const processedWords = answer.words.map((word) => word.replace(/\s/g, ''))
      const finalPhrase = processedWords
        .filter((word) => word.trim() !== '')
        .join(' ')
      const content = { words: processedWords }
      await api(token).post('/exercise/register', {
        exerciseId,
        content,
      })

      saveExercisesDetails(
        exerciseDetails.title || t('title'),
        `Veja o texto que eu criei: ${finalPhrase}`,
        exerciseDetails.imageUrl || '',
      )

      router.push('/exercises/feedback')
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
        label={exerciseDetails.title || t('title')}
        answer={{ finalPhrase: answer.finalPhrase }}
        onConfirm={handleConfirm}
      />

      <Text
        as="h3"
        size="sub"
        className="text-text mb-6"
      >
        {exerciseDetails.description || t('description')}
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
