'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from 'next-intl'

import ExerciseCard from '@/components/ExercisesCard/ExerciseCard'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { InterestsData } from '@/utils/interestUtils'
import { getToken } from '@/utils/token'

type VariantType = 'primary' | 'secondary' | 'support-blue'

const typeConfig: Record<string, { variant: VariantType; route: string }> = {
  Inversão: {
    variant: 'primary',
    route: '/exercises/inversion',
  },
  'Narrativa Limitada': {
    variant: 'secondary',
    route: '/exercises/limited-narrative',
  },
  'Conexão Artística': {
    variant: 'support-blue',
    route: '/exercises/conexao-artistica', // TODO: Corrigir rota
  },
}

interface Exercise {
  exercise_id: string
  title: string
  description: string
  type: string
  interest_id: string
}

interface UserInterest {
  title: string
  interestId: string
  [key: string]: string
}

interface Interest {
  [key: string]: VariantType
}

export default function ExercisesPage() {
  const t = useTranslations('Exercises')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [interests, setInterests] = useState<Interest>({})
  useTokenCheck()

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = getToken()
        const response = await api(token).get('/exercise')
        const userInfo = await api(token).get('/auth/token')

        const userInterests = userInfo.data.interests as UserInterest[]
        console.log('userInterests: ', userInterests)
        setInterests({
          [userInterests[0].interestId]: 'primary' as VariantType,
          [userInterests[1].interestId]: 'secondary' as VariantType,
          [userInterests[2].interestId]: 'support-blue' as VariantType,
        })

        setExercises(response.data)
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error)
      }
    }

    fetchExercises()
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-background">
      {/* Cabeçalho */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <Text
          as="h1"
          size="t1"
          className="text-primary font-semibold"
        >
          {t('title')}
        </Text>
        <div className="flex items-center gap-3">
          <Link href="/history">
            <Image
              src="/arquivoPaginaExercicio.svg"
              alt="History icon"
              width={35}
              height={35}
            />
          </Link>
          <Link href="/exercises/statistics">
            <Image
              src="/streakOrange.svg"
              alt="Streak Icon"
              width={35}
              height={35}
            />
          </Link>
        </div>
      </div>

      {/* Subtítulo */}
      <div className="px-6 pt-7 mb-4">
        <Text
          as="p"
          size="body"
          className="text-text"
        >
          {t('subtitle')}
        </Text>
        <Text
          as="p"
          size="sub"
          className="text-text"
        >
          {t('next')}
        </Text>
      </div>

      {/* Scroll horizontal */}
      <div className="flex-1 flex items-center md:justify-center">
        <div className="overflow-x-auto w-full py-[6.6875rem] mt-[-7rem]">
          <div className="flex gap-4 w-max scroll-x-auto pl-4">
            {exercises.map((exercise) => {
              const config = typeConfig[exercise.type]
              const icon = InterestsData[exercise.interest_id]?.icon || ''
              if (!config) return null

              return (
                <Link
                  key={exercise.exercise_id}
                  href={`${config.route}?exerciseId=${exercise.exercise_id}`}
                  className="snap-center flex-shrink-0 block cursor-pointer transition-transform active:scale-95"
                >
                  <ExerciseCard
                    icon={icon}
                    title={exercise.title}
                    description={exercise.description}
                    variant={interests[exercise.interest_id]}
                    id={exercise.exercise_id}
                    type={config.route}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
