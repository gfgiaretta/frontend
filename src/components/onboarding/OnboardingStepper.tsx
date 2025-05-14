import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import IntroductoryCard from '@/components/Introductory/IntroductoryCard'
import { Button } from '@/components/ui/Button'

export default function OnboardingStepper() {
  const START = 0
  const FIRSTSCREEN = 1
  const SECONDSCREEN = 2
  const THIRDSCREEN = 3

  const [currentStep, setCurrentStep] = useState(START)
  const router = useRouter()
  const t = useTranslations('Onboarding')

  const goToNextStep = () => {
    if (currentStep <= SECONDSCREEN) {
      setCurrentStep(currentStep + FIRSTSCREEN)
    }
  }

  useEffect(() => {
    if (currentStep === THIRDSCREEN) {
      router.push('/login')
    }
  }, [currentStep, router])

  return (
    currentStep <= SECONDSCREEN && (
      <div className="flex flex-col items-center gap-6 w-full max-w-md sm:gap-9">
        <IntroductoryCard currentStep={currentStep} />
        <div className="flex justify-center space-x-2">
          {[START, FIRSTSCREEN, SECONDSCREEN].map((step) => (
            <div
              key={step}
              className={`w-2.5 h-2.5 rounded-full ${
                currentStep === step ? 'bg-primary' : 'bg-grey-2'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={goToNextStep}
          variant="filled"
          size="md"
          className="mt-4"
        >
          {currentStep === SECONDSCREEN ? t('start') : t('next')}
        </Button>
      </div>
    )
  )
}
