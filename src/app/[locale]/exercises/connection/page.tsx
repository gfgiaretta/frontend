'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { ConnectionCard } from '@/components/Exercises/Connection/ConnectionCard'
import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Text } from '@/components/ui/Text'

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

export default function InversionPage() {
  const t = useTranslations('ConnectionExercise')

  const handleConfirm = async () => {
    //TODO: WHEN THE BACKEND IS READY IMPLEMENT LOGIC HERE
    console.log('I am a log')
  }

  const allCards: CardData[] = [
    { id: '1', title: 'Van Gogh', imageSrc: '/test.jpg' },
    { id: '2', title: 'Monet', imageSrc: '/test.jpg' },
    { id: '3', title: 'Klimt', imageSrc: '/test.jpg' },
    { id: '4', title: 'Picasso', imageSrc: '/test.jpg' },
    { id: '5', title: 'Matisse', imageSrc: '/test.jpg' },
    { id: '6', title: 'Dali', imageSrc: '/test.jpg' },
  ]

  const [selectedPairs, setSelectedPairs] = useState<Pair[]>([])
  const [currentSelection, setCurrentSelection] = useState<CardData[]>([])

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
    <div className="flex flex-col p-6 bg-background overflow-hidden ">
      <div className="flex flex-col text-justify gap-6">
        <TitleBar
          label={t('title')}
          onConfirm={handleConfirm}
        />
        <Text
          as="h3"
          size="sub"
          className="text-text mb-6"
        >
          {t('description')}
        </Text>
      </div>

      <div className="w-screen h-screen flex flex-col items-center mt-20 bg-background">
        <div className="flex flex-col items-center justify-center w-1/2 gap-4">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="flex justify-between gap-3"
            >
              {allCards.slice(row * 2, row * 2 + 2).map((card) => {
                const color = getCardColor(card.id)
                const isSelected = Boolean(color)
                return (
                  <ConnectionCard
                    key={card.id}
                    imageSrc={card.imageSrc}
                    title={card.title}
                    borderColor={`border-${color}`}
                    isSelected={isSelected}
                    onClick={() => handleCardClick(card)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
