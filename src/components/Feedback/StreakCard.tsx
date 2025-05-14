import { ReactNode } from 'react'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { Text } from '@/components/ui/Text'

// Interface para as propriedades do componente StreakCard
interface StreakCardProps {
  days: number
  className?: string
  children?: ReactNode
}

// Componente StreakCard
export default function StreakCard({ days, className = '' }: StreakCardProps) {
  const t = useTranslations('Feedback')

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-xl
        bg-support-orange
        text-white
        ${className}
      `}
    >
      {/* Ícone como SVG via Image */}
      <Image
        src="/streak.svg"
        alt="Streak Icon"
        width={24}
        height={24}
      />

      {/* Texto da streak */}
      <Text
        as="h2"
        size="t2"
        className="text-white"
      >
        {days} {t('days')}
      </Text>
    </div>
  )
}
