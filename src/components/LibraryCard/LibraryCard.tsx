'use client'

import { ReactNode, useState } from 'react'
import React from 'react'

import Image from 'next/image'

import { Bookmark, LucideIcon } from 'lucide-react'

import { Text } from '@/components/ui/Text'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface LibraryCardProps {
  library_id: string
  image: string
  title: string
  descriptions: string
  className?: string
  children?: ReactNode
  iconName?: LucideIcon
  link?: string
  favorite: boolean
}

export default function LibraryCard({
  library_id,
  image,
  title,
  descriptions,
  className = '',
  iconName: Icon,
  link = '',
  favorite,
}: LibraryCardProps) {
  const [isSaved, setIsSaved] = useState(favorite)

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      const token = getToken()
      await api(token).put('/library/save', {
        library_id,
        save: !isSaved,
      })
      setIsSaved(!isSaved)
    } catch (error) {
      console.error('Erro ao salvar/remover o card:', error)
    }
  }

  return (
    <div
      onClick={() => {
        window.open(link, '_blank')
      }}
      className={`
        relative
        w-full       
        rounded-2xl
        bg-background
        flex
        items-start
        p-2                          
        ${className}
      `}
    >
      <div className="w-[7.75rem] h-[7.75rem] self-center rounded-2xl overflow-hidden bg-background flex-shrink-0">
        <Image
          src={image}
          alt="Ícone"
          width={124}
          height={124}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="ml-3 flex flex-col flex-1 relative">
        <div className="flex justify-between items-center gap-1 text-primary">
          <Text
            as="h1"
            size="cap2"
          >
            {title}
          </Text>

          <div className="ml-auto flex border-1 border-secondary rounded-full">
            <button
              onClick={handleSave}
              className="text-primary px-0.5 py-0.5 flex items-center justify-center"
            >
              <Bookmark
                className={`mx-1 my-1 ${
                  isSaved
                    ? 'fill-secondary text-secondary'
                    : 'fill-none text-secondary'
                }`}
                size={20}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {Icon && (
          <button className="text-text hover:text-primary">
            <Icon size={14} />
          </button>
        )}

        <Text
          as="p"
          size="notes"
          className="py-3 text-text line-clamp-4 break-all"
        >
          {descriptions}
        </Text>
      </div>
    </div>
  )
}
