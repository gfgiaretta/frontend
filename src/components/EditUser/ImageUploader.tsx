import { useRef } from 'react'

import Image from 'next/image'

type Props = {
  image: string
  onChange: (newImage: string) => void
}

export const ImageUploader = ({ image, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // eslint-disable-next-line no-undef
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0])
      onChange(fileURL)
    }
  }

  return (
    <div className="relative w-40 h-40">
      <Image
        src={image}
        alt="Profile Picture"
        className="w-full h-full rounded-full bg-grey-1 object-cover shadow-md"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-25 right-1 "
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
        onChange={handleFileChange}
      />
    </div>
  )
}
