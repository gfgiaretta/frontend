// components/CommentInput.tsx
'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { sendComment } from '@/services/CommentService'

// components/CommentInput.tsx

interface CommentInputProps {
  postId: string
  onCommentSent: () => void
}

export function CommentInput({ postId, onCommentSent }: CommentInputProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      await sendComment(postId, content.trim())
      setContent('')

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }

      onCommentSent()
    } catch (error) {
      console.error('Failed to send comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight > 0
          ? `${textareaRef.current.scrollHeight}px`
          : 'auto'
    }
  }

  return (
    <div className="flex items-end gap-2 mt-3">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onInput={handleInput}
        placeholder="Escreva um comentário..."
        rows={1}
        className="resize-none overflow-hidden flex-grow"
      />
      <Button
        variant="post"
        size="sm"
        onClick={handleSend}
        disabled={loading || content.trim() === ''}
      >
        Send
      </Button>
    </div>
  )
}
