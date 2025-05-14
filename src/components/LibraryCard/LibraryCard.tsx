import { ReactNode } from 'react'

import Image from 'next/image'

import { Bookmark, LucideIcon } from 'lucide-react'

import { Text } from '@/components/ui/Text'

// Interface para as propriedades do componente LibraryCard
interface LibraryCardProps {
  image: string
  title: string
  descriptions: string
  className?: string
  children?: ReactNode
  iconName?: LucideIcon
  link?: string
}

// Componente LibraryCard
export default function LibraryCard({
  image,
  title,
  descriptions,
  className = '',
  iconName: Icon,
  link = '',
}: LibraryCardProps) {
  return (
    // Div principal do card
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
      {/* Imagem do card */}
      <div className="w-[7.75rem] h-[7.75rem] self-center rounded-2xl overflow-hidden bg-background flex-shrink-0">
        <Image
          src={image}
          alt="Ícone"
          width={124}
          height={124}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Título + bookmark */}
      <div className="ml-3 flex flex-col flex-1 relative">
        <div className="flex justify-between items-center gap-1 text-primary">
          <Text
            as="h1"
            size="cap2"
          >
            {title}
          </Text>

          {/*icone bookmark*/}
          <div className="ml-auto flex border-1 border-primary rounded-full">
            <button className="text-primary px-0.5 py-0.5">
              <Bookmark
                className="fill-primary"
                size={14}
                strokeWidth={0}
              />
            </button>
          </div>
        </div>
        {/* Ícon dinâmico com base nos cards */}
        {Icon && (
          <button className="text-text hover:text-primary">
            <Icon size={14} />
          </button>
        )}
        {/* Descrição do card */}
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
