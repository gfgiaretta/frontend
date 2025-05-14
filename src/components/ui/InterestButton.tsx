import React from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from './Text'

export type Colors = 'primary' | 'secondary' | 'support'
type sizes = 'sm' | 'md' | 'lg'
type textSizes = 'notes' | 'sub' | 'cap1'

type SizeMap = {
  [key in sizes]: string
}

type TextMap = {
  [key in sizes]: textSizes
}

type AllColors = Colors | 'notSelected'

interface InterestButtonProps {
  icon: React.JSX.Element
  title: string
  onClick: () => void
  isSelected: boolean
  color: Colors
  size: sizes
}

const sizeMap: SizeMap = {
  sm: 'w-[7.75rem] h-[2.5rem] text-[var(--text-xs)]',
  md: 'w-[10.75rem] h-[2.5rem] text-[var(--text-sm)]',
  lg: 'w-[12.4375rem] h-[2.5rem] text-[var(--text-base)]',
}

const textSizeMap: TextMap = {
  sm: 'notes',
  md: 'sub',
  lg: 'cap1',
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
>(({ icon, title, onClick, isSelected, color, size }, ref) => {
  const { t } = useTranslation('Interests')

  const baseClasses = `${sizeMap[size]} inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 hover:bg-grey-2`

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${baseClasses}, border-2 ${isSelected ? `border-${colorMap[color]} bg-${colorMap[color]} text-background` : `border-${colorMap.notSelected} bg-transparent text-text`}`}
    >
      <div className="flex items-center gap-2">
        {icon}
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
