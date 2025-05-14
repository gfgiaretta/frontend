//import { ReactNode } from 'react'
//import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Text } from '@/components/ui/Text'

interface CardsProps {
  value: number
  textAux: string
  img: ReactNode
  color: 'support-orange' | 'text'
}

export default function CardsProps({ value, textAux, img, color }: CardsProps) {
  return (
    <div
      className={`flex w-full items-center gap-2 border-2 border-${color} text-${color} rounded-lg px-4 py-2`}
    >
      <div className="md:w-8 md:h-8">{img}</div>
      <div>
        <Text
          as="p"
          size="cap1"
          className={`text-text`}
        >
          {value}
        </Text>
        <Text
          as="p"
          size="notes"
          className={`text-text`}
        >
          {textAux}
        </Text>
      </div>
    </div>
  )
}
