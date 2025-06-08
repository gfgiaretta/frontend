import Image from 'next/image'

import { Text } from '@/components/ui/Text'

interface CommentProps {
  commentId: string
  ownerName: string
  ownerProfilePictureUrl: string
  content: string
}

export function Comment({
  ownerName,
  ownerProfilePictureUrl,
  content,
}: CommentProps) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-grey-1/20">
      <Image
        src={ownerProfilePictureUrl}
        alt="User avatar"
        width={30}
        height={30}
        className="rounded-full object-cover aspect-square"
      />
      <div>
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
          className="text-sm"
        >
          {content}
        </Text>
      </div>
    </div>
  )
}
