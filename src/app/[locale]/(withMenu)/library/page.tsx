'use client'

import { useEffect, useState } from 'react'

import { Book, Eye, FileText, Image } from 'lucide-react'
import { useTranslations } from 'next-intl'

import LibraryCard from '@/components/LibraryCard/LibraryCard'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { Reference, getReferences } from '@/services/LibraryService'

export default function LibraryPage() {
  useTokenCheck()
  const t = useTranslations('Library')
  const [reference, setReference] = useState<Reference[]>([])

  useEffect(() => {
    const fetchReference = async () => {
      try {
        const newReferences = await getReferences()
        setReference(newReferences)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      }
    }

    fetchReference()
  }, [])

  const arrayIcons = [Book, Eye, FileText, Image]

  return (
    <div className="bg-background flex flex-col h-screen p-6 space-y-4">
      <Text
        as="h1"
        size="t1"
        className="text-[44px] font-[174] text-primary"
      >
        {t('title')}
      </Text>

      {reference.map((item, index) => (
        <LibraryCard
          key={index}
          image={item.image_url}
          title={item.description}
          descriptions={''}
          className="w-full shadow-md"
          iconName={arrayIcons[index]}
          link={item.link}
        />
      ))}
    </div>
  )
}
