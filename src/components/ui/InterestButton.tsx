import React, { ComponentType } from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from './Text'

export type Colors = 'primary' | 'secondary' | 'support'
type sizes = 'sm' | 'md' | 'lg'
type textSizes = 'notes' | 'sub' | 'cap1'

type TextMap = {
  [key in sizes]: textSizes
}

type AllColors = Colors | 'notSelected'

interface InterestButtonProps {
  icon: ComponentType<{ className?: string }>
  title: string
  onClick: () => void
  isSelected: boolean
  color: Colors
  size: sizes
}

const sizeMap = {
  sm: 'py-1 px-2',
  md: 'py-2 px-3',
  lg: 'py-3 px-4',
}

const textSizeMap: TextMap = {
  sm: 'notes',
  md: 'sub',
  lg: 'cap1',
}

const iconSize = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
}

const colorMap: Record<AllColors, string> = {
  primary: 'primary',
  secondary: 'secondary',
  support: 'support-blue',
  notSelected: 'grey-1',
}

export const InterestButton = React.forwardRef<
  HTMLButtonElement,
  InterestButtonProps
>(({ icon: Icon, title, onClick, isSelected, color, size }, ref) => {
  const { t } = useTranslation('Interests')

  const baseClasses = `${sizeMap[size]} inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 hover:bg-grey-2`

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${baseClasses}, border-2 ${isSelected ? `border-${colorMap[color]} bg-${colorMap[color]} text-background` : `border-${colorMap.notSelected} bg-transparent text-text`}`}
    >
      <div className="flex items-center gap-2">
        <Icon className={iconSize[size]} />
        <Text
          as="span"
          size={textSizeMap[size]}
        >
          {t(title)}
        </Text>
      </div>
    </button>
  )
})

InterestButton.displayName = 'InterestButton'
