'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { LucideIcon } from 'lucide-react'

import { Text } from '@/components/ui/Text'

interface ExerciseCardProps {
  id: string
  icon: LucideIcon
  title: string
  description: string
  variant: VariantType
  type: string
  className?: string
}

type VariantType = 'primary' | 'secondary' | 'support-blue'

interface VariantConfig {
  image: string
  style: string
}

const variantConfig: Record<VariantType, VariantConfig> = {
  primary: {
    image: '/imgColorPrimary.svg',
    style: 'bg-primary text-background',
  },
  secondary: {
    image: '/imgColorSecondary.svg',
    style: 'bg-secondary text-background',
  },
  'support-blue': {
    image: '/imgColorSupportBlue.svg',
    style: 'bg-support-blue text-text',
  },
}

export default function ExerciseCard({
  id,
  icon: Icon,
  title,
  description,
  variant,
  type,
  className = '',
}: ExerciseCardProps) {
  const { image, style } = variantConfig[variant]
  const router = useRouter()

  const handleClick = () => {
    router.push(`${type}?exerciseId=${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        shrink-0
        transform transition-transform duration-200 ease-out
        hover:scale-105 hover:shadow-lg
        flex flex-col
        w-[16.5rem]
        h-[22.125rem]
        rounded-2xl
        bg-background
        drop-shadow-2xl
        overflow-hidden
        ${className}
      `}
    >
      <div className="flex items-center gap-2 p-4">
        {Icon && (
          <Icon
            size={16}
            className="text-text"
          />
        )}
        <Text
          as="h2"
          size="cap2"
          className="text-text"
        >
          {title}
        </Text>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-32 h-32">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className={`${style} p-3`}>
        <Text
          as="p"
          size="notes"
        >
          {description}
        </Text>
      </div>
    </div>
  )
}
