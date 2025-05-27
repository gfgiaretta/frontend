'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { HistoryCard } from '@/components/HistoryCard/HistoryCard'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { HistoryItem, getHistory } from '@/services/HistoryService'

export default function HistoryPage() {
    useTokenCheck()
    const t = useTranslations('History')
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await getHistory()
                setHistoryItems(historyData)
            } catch (error) {
                console.error('Erro ao buscar histórico:', error)
            }
        }

        fetchHistory()
    }, [])

    const getVariant = (interest: string): 'primary' | 'secondary' | 'support-blue' => {
        switch (interest.toLowerCase()) {
            case 'arte':
                return 'primary'
            case 'design':
                return 'secondary'
            default:
                return 'support-blue'
        }
    }

    return (
        <div className="bg-background flex flex-col min-h-screen p-6 space-y-4">
            <Text
                as="h1"
                size="t1"
                className="text-[44px] font-[174] text-primary"
            >
                {t('title')}
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyItems.map((item, index) => (
                    <HistoryCard
                        key={index}
                        title={item.title}
                        description={`${item.description} - Realizado em: ${new Date(item.date).toLocaleDateString()}`}
                        variant={getVariant(item.interest)} id={''} />
                ))}
            </div>
        </div>
    )
}