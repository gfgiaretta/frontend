import React from 'react'

import { Input } from '@/components/ui/Input'

interface NarrativeFields {
  index: number
  onChange: (_valor: string) => void
  disabled: boolean
}

const DISPLAY_OFFSET = 1
export function NarrativeField({ index, onChange }: NarrativeFields) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordWithoutSpace = e.target.value.replace(/\s/g, '')
    onChange(wordWithoutSpace)
  }

  return (
    <div className="w-full px-14 justify-center flex items-center gap-3">
      <span className="w-2 text-primary font-medium text-center font-neulis">
        {index + DISPLAY_OFFSET}
      </span>

      <Input
        type="text"
        variant="outlined"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault()
        }}
        disabled={false}
        className="h-6"
      />
    </div>
  )
}
