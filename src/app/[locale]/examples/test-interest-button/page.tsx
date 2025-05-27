'use client'

import React, { useState } from 'react'

import { InterestButton } from '@/components/ui/InterestButton'
import { PencilIcon } from '@/components/ui/icons/icons'

export default function TestButtonPage() {
  const [selected, setSelected] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
      <InterestButton
        icon={PencilIcon}
        title="Fotografia"
        color="primary"
        size="lg"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
      <InterestButton
        icon={PencilIcon}
        title="Fotografia"
        color="secondary"
        size="md"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
      <InterestButton
        icon={PencilIcon}
        title="Texto Muito Longo "
        color="support"
        size="sm"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  )
}
