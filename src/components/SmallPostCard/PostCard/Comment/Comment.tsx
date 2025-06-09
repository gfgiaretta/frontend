import { useState } from 'react'

import Image from 'next/image'

import { Text } from '@/components/ui/Text'

interface CommentProps {
  commentId: string
  ownerName: string
  ownerProfilePictureUrl: string
  content: string
}

const MAX_LENGTH = 120

export function Comment({
  ownerName,
  ownerProfilePictureUrl,
  content,
}: CommentProps) {
  const [expanded, setExpanded] = useState(false)

  const isLong = content.length > MAX_LENGTH
  const visibleContent =
    expanded || !isLong ? content : `${content.slice(0, MAX_LENGTH)}...`

  return (
    <div className="relative flex items-start gap-3 py-2 border-b border-grey-1/20">
      <Image
        src={ownerProfilePictureUrl}
        alt="User avatar"
        width={30}
        height={30}
        className="rounded-full object-cover aspect-square"
      />
      <div className="flex-1">
        <Text
          as="h1"
          size="t1"
          className="font-semibold text-sm"
        >
          {ownerName}
        </Text>
        <Text
          as="p"
          size="sub"
          className="text-sm leading-snug break-all"
        >
          {visibleContent}
          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="ml-1 text-grey-1 hover:underline text-xs font-medium"
            >
              {expanded ? 'Mostrar menos' : 'Ler mais'}
            </button>
          )}
        </Text>
      </div>
    </div>
  )
}
