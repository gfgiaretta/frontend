'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useImageUpload } from '@/hooks/useImageUpload'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

const SUCCESS_UPLOAD_STATUS = [200, 201]

export function Publication() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const t = useTranslations('Post')
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultPostImageUrl = '/PostDefault.png'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [postImage, setPostImage] = useState<string | null>(null)
  useEffect(() => {
    const defaultTitle = searchParams.get('title') || ''
    const defaultDescription = searchParams.get('description') || ''

    setTitle(defaultTitle)
    setDescription(defaultDescription)
  }, [searchParams])

  const useHandleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log('FILE: ', file)
    const fileURL = URL.createObjectURL(file!)
    setPostImage(fileURL)

    useImageUpload(file).then((url) => {
      if (url) {
        setImageUrl(url)
      }
    })
  }

  const useSendPost = async () => {
    const token = getToken()
    const resp = await api(token).post('/post', {
      title,
      description,
      image: imageUrl,
    })
    if (SUCCESS_UPLOAD_STATUS.includes(resp.status)) {
      router.push('/home')
    } else {
      // TODO: criar uma toast
      //console.error('Failed to create post:', resp.data)
    }
  }

  const isFormFilled = title.trim() !== '' && description.trim() !== ''

  return (
    <div className="flex flex-col px-6 py-8 w-full justify-between h-screen max-w-md mx-auto text-text">
      <div>
        <div className="mb-6">
          <TitleBar label={t('title')} />
        </div>

        <label className="text-xl font-semibold font-neulis text-primary mb-2">
          {t('back')}
        </label>

        <Input
          placeholder={t('placeholderTitle')}
          className="bg-grey-2 border border-transparent focus:border-transparent focus:ring-0 outline-none rounded-md mb-4 placeholder:text-grey-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-xl font-semibold font-neulis text-primary mb-2">
          {t('description')}
        </label>

        <div className="relative mb-4">
          <textarea
            placeholder={t('placeholderDescription')}
            maxLength={200}
            className="bg-grey-2 placeholder:text-grey-1 text-sm text-grey-1 rounded-md h-28 resize-none p-3 pr-10 pb-6 outline-none w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="absolute bottom-1 right-2 text-xs text-grey-1">
            {description.length}/200
          </span>
        </div>

        <label className="text-xl font-semibold font-neulis text-primary mb-2">
          {t('image')}
        </label>
      </div>

      <img
        src={postImage || defaultPostImageUrl}
        alt="Post Image"
        className="h-50 rounded border-1 border-grey-1 shadow object-cover"
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={useHandleImageUpload}
      />

      <div className="flex justify-center mb-3">
        <Button
          variant="outlined"
          className="rounded-full"
          size="lg"
          onClick={() => inputRef.current?.click()}
        >
          {t('addImage')}
        </Button>
      </div>

      <div className="flex justify-center mb-3">
        <Button
          variant="post"
          className="rounded-full"
          size="lg"
          onClick={() => {
            setImageUrl(null)
            if (inputRef.current) {
              inputRef.current.value = ''
            }
            if (postImage) {
              setPostImage(null)
            }
            if (imageUrl) {
              setImageUrl(null)
            }
          }}
        >
          {t('removeImage')}
        </Button>
      </div>

      <div className="flex justify-between gap-4 px-4 pb-20">
        <Button
          variant="outlined"
          className="w-1/2 rounded-full"
          onClick={() => router.back()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant={isFormFilled ? 'filled' : 'negative'}
          className="w-1/2 rounded-full"
          onClick={useSendPost}
        >
          {t('create')}
        </Button>
      </div>
    </div>
  )
}
