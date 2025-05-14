import React from 'react'

import { Menu } from '@/components/Menu/Menu'

export default async function RootMenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <Menu />
    </div>
  )
}
