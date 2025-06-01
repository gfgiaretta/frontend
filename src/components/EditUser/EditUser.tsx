'use client'

import React, { useState } from 'react'
import { useRef } from 'react'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useImageUpload } from '@/hooks/useImageUpload'
import { patchProfile, patchProfileParams } from '@/services/ProfileService'

export const EditUser = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const description = useTranslations('EditProfile')

  const defaultBio = searchParams.get('bio') || ''
  const defaultProfileImageURL = searchParams.get('userImage') || ''

  const [userBio, setUserBio] = useState<string>(defaultBio)
  const [profileImageURL, setProfileImageURL] = useState<string>(
    defaultProfileImageURL,
  )
  const [profileImageFile, setProfileImageFile] = useState<File>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExit = () => {
    router.push('/profile')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    const imageURL = URL.createObjectURL(imageFile!)

    setProfileImageFile(imageFile)
    setProfileImageURL(imageURL)
  }

  const handleSave = async () => {
    const bioChanged = defaultBio !== userBio
    const imageChanged = defaultProfileImageURL !== profileImageURL

    if (!bioChanged && !imageChanged) {
      router.push('/profile')
      return
    }

    let imageUrl: string | null | undefined = profileImageURL

    if (imageChanged) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      imageUrl = await useImageUpload(profileImageFile)
    }
    const payload: patchProfileParams = {
      description: userBio ?? '',
      profilePictureUrl: imageUrl ?? '',
    }

    patchProfile(payload)
    router.push('/profile')
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
        <div className="relative w-40 h-40 aspect-square">
          <Image
            src={profileImageURL || '/userimage.jpg'}
            fill
            alt="Profile Picture"
            className="rounded-full border border-grey-1 shadow object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-1 right-1"
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
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="px-6 mt-12">
        <textarea
          value={userBio ?? ''}
          onChange={(e) => setUserBio(e.target.value)}
          placeholder={description('description')}
          className="w-full bg-grey-2/30 rounded-[10px] p-4 placeholder-text/30 resize-none drop-shadow-md"
          rows={3}
        />
      </div>
    </div>
  )
}
