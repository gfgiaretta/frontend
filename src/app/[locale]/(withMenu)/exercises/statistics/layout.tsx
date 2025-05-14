import React, { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

export default async function CalendarExamplePageLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MantineProvider>{children}</MantineProvider>
}
