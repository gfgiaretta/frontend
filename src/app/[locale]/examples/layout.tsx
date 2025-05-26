import React, { ReactNode } from 'react'

import '@mantine/charts/styles.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

export default function ExamplesPageLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MantineProvider>{children}</MantineProvider>
}
