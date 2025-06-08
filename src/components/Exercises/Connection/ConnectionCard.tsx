/* eslint-disable @next/next/no-img-element */
'use client'

import { Text } from '@/components/ui/Text'

/* eslint-disable @next/next/no-img-element */

type ConnectionCardProps = {
  imageSrc: string
  title: string
  borderColor?: string
  isSelected: boolean
  onClick: () => void
}

export function ConnectionCard({
  imageSrc,
  title,
  borderColor,
  isSelected,
  onClick,
}: ConnectionCardProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={onClick}
        className={`aspect-[4/3] overflow-hidden rounded-xl border-5 transition-colors duration-300 ${
          isSelected ? borderColor : 'border-transparent'
        }`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
      </button>
      <Text
        as="h3"
        size="t3"
        className="pt-2"
      >
        {title}
      </Text>
    </div>
  )
}
