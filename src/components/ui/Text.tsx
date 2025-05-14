'use client'

import { FC, ReactNode } from 'react'

interface TextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'
  size?: 't1' | 't2' | 't3' | 'body' | 'cap1' | 'cap2' | 'sub' | 'notes'
  className?: string
  children: ReactNode
}

const textStyles: Record<NonNullable<TextProps['size']>, string> = {
  t1: 'text-2xl font-neulis', // Title Large -> 34px
  t2: 'text-xl font-sfPro', // Title Medium -> 22px
  t3: 'text-lg font-sfPro font-semibold', // Title Regular -> 17px
  body: 'text-lg font-sfPro', // Body -> 17px
  cap1: 'text-base font-sfPro', // Caption -> 16px (SF Pro)
  cap2: 'text-base font-neulis', // Caption 2 -> 16px (Neulis)
  sub: 'text-sm font-sfPro', // Subtitle -> 15px
  notes: 'text-xs font-sfPro', // Notes -> 13px
}

export const Text: FC<TextProps> = ({
  as = 'p',
  size = 'body',
  className = '',
  children,
}) => {
  const Component = as

  return (
    <Component className={`${textStyles[size]} ${className}`}>
      {children}
    </Component>
  )
}
