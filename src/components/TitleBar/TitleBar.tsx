import { useRouter } from 'next/navigation'

import { LucideCheck, LucideChevronLeft } from 'lucide-react'

import { Text } from '../ui/Text'

interface TitleBarProps {
  label: string
  answer?: { finalPhrase: string }
  onConfirm?: () => void
}

export function TitleBar({ label, answer, onConfirm }: TitleBarProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleSendExercise = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <div className="flex justify-between items-center text-primary">
      <button
        onClick={handleGoBack}
        className="flex items-center hover:cursor-pointer"
      >
        <LucideChevronLeft size={22} />
      </button>

      <Text
        as="h3"
        size="cap2"
        className={`flex-1 text-center ${answer ? '' : 'justify-self-center'}`}
      >
        {label}
      </Text>

      {answer && (
        <button
          onClick={handleSendExercise}
          className="flex items-center hover:cursor-pointer"
        >
          <LucideCheck size={22} />
        </button>
      )}
    </div>
  )
}
