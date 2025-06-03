'use client'

import React from 'react'

import Image from 'next/image'

import { Text } from '@/components/ui/Text'

export type VariantType = 'primary' | 'secondary' | 'support-blue'

const variantConfig: Record<VariantType, { image: string }> = {
  primary: { image: '/imgColorPrimary.svg' },
  secondary: { image: '/imgColorSecondary.svg' },
  'support-blue': { image: '/imgColorSupportBlue.svg' },
}

interface HistoryCardProps {
  id: string
  title: string
  description: string
  variant: VariantType
  className?: string
}

export function HistoryCard({
  title,
  description,
  variant,
  className = '',
}: HistoryCardProps) {
  const { image } = variantConfig[variant]

  return (
    <div
      className={`
        transform transition-transform duration-200 ease-out
        hover:scale-105 hover:shadow-lg
        w-[21.375rem] h-[8.75rem]
        rounded-2xl
        bg-background
        drop-shadow-lg
        overflow-hidden
        p-4
        flex items-center justify-between
        ${className}
      `}
    >
      <div className="flex flex-col justify-start text-left h-full w-2/3">
        <Text
          as="h3"
          size="cap2"
          className=" text-primary leading-tight mb-1 mt-1"
        >
          {title}
        </Text>
        <Text
          as="p"
          size="notes"
          className="line-clamp-2"
        >
          {description}
        </Text>
      </div>

      <div className="relative w-20 h-20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}
