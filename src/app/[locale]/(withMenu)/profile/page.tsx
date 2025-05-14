import { useTranslations } from 'next-intl'

import { Text } from '@/components/ui/Text'

export default function ProfilePage() {
  const t = useTranslations('Profile')
  return (
    <div className="bg-background flex flex-col h-screen p-6 space-y-4">
      <h1 className="text-primary text-5xl font-[174]">{t('title')}</h1>
      <Text
        size="body"
        className="text-base text-center "
      >
        {t('description')}
      </Text>
    </div>
  )
}
