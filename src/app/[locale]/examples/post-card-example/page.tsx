'use client'

import { useState } from 'react'

import { Menu } from '@/components/Menu/Menu'
import PostCard from '@/components/SmallPostCard/PostCard/PostCard'
import { Button } from '@/components/ui/Button'

export default function PostCardExample() {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <span className="text-white">Open Post Card</span>
      </Button>
      <PostCard
        userName="User Name"
        userImage="/userimage.jpg"
        title="Título do projeto"
        postImage="/post.jpg"
        description="Descrição do projeto"
        postAt="3 dias atrás"
        favorite={true}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Menu />
    </div>
  )
}
