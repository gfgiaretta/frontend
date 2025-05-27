'use client'

import React, { useState } from 'react'
import { useRef } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface EditUserProps {
  bio?: string
  userImage?: string
}

export const EditUser = ({ bio, userImage }: EditUserProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0])
      setProfilePicture(fileURL)
    }
  }

  const description = useTranslations('EditProfile')

  const router = useRouter()

  const defaultUserBio = bio
  const defaultUserImage = userImage

  const [userBio, setUserBio] = useState<string | null>(bio || null)
  const [profilePicture, setProfilePicture] = useState(userImage || null)

  const handleExit = () => {
    router.push('/profile')
  }

  const handleSave = () => {
    console.log(defaultUserBio)
    if (defaultUserImage === profilePicture && defaultUserBio === userBio) {
      console.log('sem alteração')
    }
    if (defaultUserImage !== profilePicture) {
      console.log('alterou foto')
      //chamar metodo back com bio=null e sair da pagina
    }
    if (defaultUserBio !== userBio) {
      console.log('alterou bio')
      setProfilePicture(null)
      console.log(profilePicture)
      //chamar metodo back com pic = null e sair da pagina
    }

    //chamar metodo do upload da imagem pro banco
    //chamar metodo do back
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="relative w-full h-[42vh] bg-[url('/background-edit-profile.svg')] bg-no-repeat bg-cover bg-bottom">
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 pt-4">
          <button onClick={handleExit}>
            <X
              className="text-white"
              size={30}
            />
          </button>
          <button onClick={handleSave}>
            <Check
              className="text-white"
              size={30}
            />
          </button>
        </div>
      </div>
      <div className="relative flex justify-center -mt-[164px]">
        <div className="relative w-40 h-40">
          <Image
            src={profilePicture || '/userimage.jpg'}
            alt="Profile Picture"
            className="w-44 h-44 rounded-full border-1 border-grey-1 shadow object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-25 right-1"
          >
            <Image
              src="/pencil.svg"
              alt="Edit Pencil"
              width={60}
              height={60}
              className="w-10 h-10"
            />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="px-6 mt-12">
        <textarea
          onChange={(e) => setUserBio(e.target.value)}
          placeholder={description('description')}
          className="w-full bg-grey-2/30 rounded-[10px] p-4 placeholder-text/30 resize-none drop-shadow-md"
          rows={3}
        />
      </div>
    </div>
  )
}
