import { Bookmark } from 'lucide-react'

import PostCard from '@/components/postCard/PostCard'

export default function PostCardExample() {
  return (
    <div>
      <PostCard
        userName={'User Name'}
        userImage="/userimage.jpg"
        title={'Título do projeto'}
        postImage="/post.jpg"
        description={'Descrição do projeto'}
        postAt={'3 dias atrás'}
        className="w-full"
        iconName={Bookmark}
      />
    </div>
  )
}
