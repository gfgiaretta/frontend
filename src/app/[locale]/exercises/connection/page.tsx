'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { ConnectionCard } from '@/components/Exercises/Connection/ConnectionCard'
import { TitleBar } from '@/components/TitleBar/TitleBar'
import { AlertModal, AlertModalHandle } from '@/components/ui/AlertModal'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { ConnectionExerciseDTO, getExercise } from '@/services/ExerciseService'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

const BORDER_COLORS = ['secondary', 'primary', 'support-blue']

type CardData = {
  id: string
  title: string
  imageSrc: string
}

type Pair = {
  color: string
  cards: CardData[]
}

type AnswerPair = {
  a1: string
  a2: string
}

function normalizePair(pair: AnswerPair): string {
  return [pair.a1, pair.a2].sort().join('::')
}

function comparePairs(
  userAnswers: AnswerPair[],
  correctAnswers: AnswerPair[],
): boolean {
  const normalizeSet = (pairs: AnswerPair[]) =>
    new Set(pairs.map(normalizePair))

  const userSet = normalizeSet(userAnswers)
  const correctSet = normalizeSet(correctAnswers)

  if (userSet.size !== correctSet.size) return false

  for (const pair of correctSet) {
    if (!userSet.has(pair)) return false
  }

  return true
}

export default function InversionPage() {
  useTokenCheck()
  const t = useTranslations('ConnectionExercise')
  const searchParams = useSearchParams()
  const router = useRouter()
  const exerciseId =
    searchParams.get('exerciseId') ?? '802e0adf-55c3-466d-82d7-b3390abc0be5' //For a demo purpose its ok to have a hardcoded fallback id, but ideally this shouldnt be here

  const modalRef = useRef<AlertModalHandle>(null)

  const [selectedPairs, setSelectedPairs] = useState<Pair[]>([])
  const [currentSelection, setCurrentSelection] = useState<CardData[]>([])
  const [allCards, setAllCards] = useState<CardData[]>([])
  const [answer, setAnswer] = useState<AnswerPair[]>([])

  const handleConfirm = async () => {
    if (selectedPairs.length < 3) {
      modalRef.current?.show()
      return
    }

    const userAnswers: AnswerPair[] = selectedPairs.map((pair) => ({
      a1: pair.cards[0].title,
      a2: pair.cards[1].title,
    }))

    const isCorrect = comparePairs(userAnswers, answer)
    if (!isCorrect) {
      modalRef.current?.show()
      return
    }

    try {
      const token = getToken()
      await api(token).post('/exercise/register', {
        exerciseId,
        content: {
          answer,
        },
      })

      router.push(`/exercises/feedback?exerciseId=${exerciseId}`)
    } catch {}
  }

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = getToken()
        const cardDataArr: CardData[] = []
        const answerPairs: AnswerPair[] = []

        const resp = await getExercise(exerciseId)
        const exercise = resp as ConnectionExerciseDTO

        await Promise.all(
          exercise.content.map(async (item) => {
            const { artist, artwork } = item

            let artistImageUrl = artist.image
            try {
              const res = await api(token).get(
                `/presigned/${encodeURIComponent(artist.image)}`,
              )
              artistImageUrl = res.data || artist.image
            } catch {}

            let artworkImageUrl = artwork.image
            try {
              const res = await api(token).get(
                `/presigned/${encodeURIComponent(artwork.image)}`,
              )
              artworkImageUrl = res.data || artwork.image
            } catch {}

            cardDataArr.push({
              id: artist.name,
              title: artist.name,
              imageSrc: artistImageUrl,
            })
            cardDataArr.push({
              id: artwork.name,
              title: artwork.name,
              imageSrc: artworkImageUrl,
            })
            answerPairs.push({ a1: artist.name, a2: artwork.name })
          }),
        )

        setAnswer(answerPairs)

        // Shuffle the cards
        // eslint-disable-next-line no-magic-numbers
        cardDataArr.sort(() => Math.random() - 0.5)
        setAllCards(cardDataArr)
      } catch {}
    }

    fetchExercises()
  }, [exerciseId])

  const getNextColor = () =>
    BORDER_COLORS[selectedPairs.length % BORDER_COLORS.length]

  const isCardInPair = (cardId: string) =>
    selectedPairs.some((pair) => pair.cards.some((c) => c.id === cardId))

  const getCardColor = (cardId: string): string | undefined => {
    const pair = selectedPairs.find((pair) =>
      pair.cards.some((c) => c.id === cardId),
    )
    if (pair) return pair.color

    const idxInCurrent = currentSelection.findIndex((c) => c.id === cardId)
    if (idxInCurrent !== -1) {
      return getNextColor()
    }

    return undefined
  }

  const removeCardFromPairs = (cardId: string) => {
    const newPairs: Pair[] = []
    for (const pair of selectedPairs) {
      const remaining = pair.cards.filter((c) => c.id !== cardId)
      if (remaining.length === 2) newPairs.push(pair) // unchanged
      if (remaining.length === 1) {
        setCurrentSelection([remaining[0]])
      }
    }
    setSelectedPairs(newPairs)
  }

  const handleCardClick = (card: CardData) => {
    if (isCardInPair(card.id)) {
      removeCardFromPairs(card.id)
      return
    }
    if (currentSelection.some((c) => c.id === card.id)) {
      setCurrentSelection((prev) => prev.filter((c) => c.id !== card.id))
      return
    }
    const newSelection = [...currentSelection, card]

    if (newSelection.length === 2) {
      const color = getNextColor()
      setSelectedPairs((prev) => [...prev, { color, cards: newSelection }])
      setCurrentSelection([])
    } else {
      setCurrentSelection(newSelection)
    }
  }

  return (
    <div className="flex flex-col p-6 bg-background overflow-y-auto w-screen h-screen">
      <div className="flex flex-col text-justify gap-2">
        <AlertModal
          ref={modalRef}
          title={t('alertTitle')}
          description={t('alertDescription')}
        ></AlertModal>
        <TitleBar
          label={t('title')}
          onConfirm={handleConfirm}
          answer={{ finalPhrase: '' }}
        />
        <Text
          as="h2"
          size="t2"
          className="text-text text-center mb-6"
        >
          {t('description')}
        </Text>

        <div className="grid grid-cols-2 gap-4">
          {allCards.map((card) => (
            <ConnectionCard
              key={card.id}
              imageSrc={card.imageSrc}
              title={card.title}
              borderColor={`border-${getCardColor(card.id) ?? 'default'}`}
              isSelected={
                isCardInPair(card.id) ||
                currentSelection.some((c) => c.id === card.id)
              }
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
