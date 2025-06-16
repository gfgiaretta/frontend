'use client'

import { useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { ConnectionCard } from '@/components/Exercises/Connection/ConnectionCard'
import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Text } from '@/components/ui/Text'
import { useRouter, useSearchParams } from 'next/navigation'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'
import { AlertModal, AlertModalHandle } from '@/components/ui/AlertModal'

const BORDER_COLORS = ['primary', 'secondary', 'support-blue']

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
  artist: string
  artwork: string
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
    try {
      const token = getToken()
      await api(token).post('/exercise/register', {
        exerciseId,
        content: {
          answer
        }
      })

      router.push(`/exercises/feedback?exerciseId=${exerciseId}`)
    } catch { }
  }

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = getToken()
        const response = await api(token).get(`/exercise/${exerciseId}`)
        const cardDataArr: CardData[] = []
        const answerPairs: AnswerPair[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.content.forEach((item: any) => {
          const artwork = item.artwork
          const artist = item.artist
          cardDataArr.push({ id: artist.name, title: artist.name, imageSrc: artist.image })
          cardDataArr.push({ id: artwork.name, title: artwork.name, imageSrc: artwork.image })
          answerPairs.push({ artist: artist.name, artwork: artwork.name })
        })

        console.log('Card Data Array:', cardDataArr)

        setAnswer(answerPairs)

        // this is just an easy way to shuffle the cards
        const shuffler = 0.5
        cardDataArr.sort(() => Math.random() - shuffler)
        setAllCards(cardDataArr)
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error)
      }
    }

    fetchExercises()
  }, [])



  const getNextColor = () =>
    BORDER_COLORS[selectedPairs.length % BORDER_COLORS.length]

  const isCardInPair = (cardId: string) =>
    selectedPairs.some((pair) => pair.cards.some((c) => c.id === cardId))

  const getCardColor = (cardId: string): string | undefined => {
    const pair = selectedPairs.find((pair) =>
      pair.cards.some((c) => c.id === cardId),
    )
    if (pair) return pair.color

    if (currentSelection.some((c) => c.id === cardId)) {
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
              borderColor={getCardColor(card.id)}
              isSelected={isCardInPair(card.id)}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
