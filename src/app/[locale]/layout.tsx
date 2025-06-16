import React from 'react'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

//import '@mantine/charts/styles.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'

import { RootLayout } from '@/components/RootLayout/RootLayout'
import { AuthenticationProvider } from '@/hooks/AuthenticationContext'
import { routing } from '@/i18n/routing'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Creative Flow',
  description: 'Developed by AGES - Pucrs',
  icons: {
    icon: './creative-flow-logo.png',
    apple: './creative-flow-logo.png',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0"
        />
      </head>
      <body>
        <MantineProvider>
          <NextIntlClientProvider>
            <AuthenticationProvider>
              <RootLayout>
                <div>{children}</div>
              </RootLayout>
            </AuthenticationProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
