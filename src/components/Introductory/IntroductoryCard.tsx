import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { Text } from '@/components/ui/Text'

const stepperArray = [
  {
    image: '/introductory-support-blue.svg',
    color: 'text-support-blue',
  },
  {
    image: '/introductory-secondary.svg',
    color: 'text-secondary',
  },
  {
    image: '/introductory-primary.svg',
    color: 'text-primary',
  },
]

type IntroductoryCardProps = {
  currentStep: number
}

export default function IntroductoryCard({
  currentStep,
}: IntroductoryCardProps) {
  const t = useTranslations('Onboarding')

  const { image, color } = stepperArray[currentStep]

  const title = t(`steps.${currentStep}.title`)
  const description = t(`steps.${currentStep}.description`)

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className="object-contain mx-auto"
      />

      <div className="flex flex-col gap-2">
        <Text
          as="h1"
          size="t1"
          className={`${color} text-2xl font-neulis text-center`}
        >
          {title}
        </Text>

        <Text
          as="p"
          size="body"
          className="text-center"
        >
          {description}
        </Text>
      </div>
    </div>
  )
}
