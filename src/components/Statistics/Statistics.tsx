'use client'

import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Text } from '../ui/Text'
import { DonutChart } from './DonutChart/DonutChart'
import { StreaksAndSavedPosts } from './StreaksAndSavedPosts'
import { MonthCalendar } from '@/components/Statistics/Calendar/Calendar'
import { api } from '@/utils/api'
import { InterestsData } from '@/utils/interestUtils'
import { getToken } from '@/utils/token'

interface Days {
  date: string
  color: string
}

const INTERESTS_COLORS = ['#4d716a', '#da7584', '#8fd3fd']

export const Statistics = () => {
  const pageTitle = useTranslations('Statistics')
  const exercises = useTranslations('Exercises')
  const tInterests = useTranslations('Interests')

  const defaultStatisticsDataCount = {
    graph: {},
    calendar: [{ date: '0', color: 'white' }],
    savedItems: 0,
  }
  const [statisticsData, setStatisticsData] = useState(
    defaultStatisticsDataCount,
  )
  // eslint-disable-next-line no-magic-numbers
  const [streak, setStreak] = useState(0)
  interface ChartDataItem {
    name: string
    value: number
    color: string
    icon: string
  }
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  async function GetData() {
    const token = getToken()
    const userInfo = await api(token).get('/auth/token')
    const responseStatisitcs = await api(token).get('user/stats')
    const userStreak = await api(token).get('/user/streak')
    const responseData = responseStatisitcs.data

    interface UserInterest {
      title: string
      interestId: string
      [key: string]: unknown
    }
    const userInterests = userInfo.data.interests as UserInterest[]
    const graph = responseData.graph || {}

    const chartDataFromApi: ChartDataItem[] = []

    userInterests.forEach((item, idx) => {
      chartDataFromApi.push({
        name: tInterests(item.interestId),
        value: graph[item.title] || '',
        color: INTERESTS_COLORS[idx] || '#ccc',
        icon: InterestsData[item.interestId]?.icon || '',
      })
    })

    setChartData(chartDataFromApi)

    const interests = {
      [userInterests[0].title]: 'green',
      [userInterests[1].title]: 'pink',
      [userInterests[2].title]: 'blue',
    }

    const now = new Date()
    const year = now.getFullYear()
    // eslint-disable-next-line no-magic-numbers
    const month = now.getMonth() + 1

    const days: Days[] = []

    for (const dayStr in responseData.calendar) {
      const interestTitle = responseData.calendar[dayStr]
      const color = interests[interestTitle]
      const pad = 2
      const dayNum = String(dayStr).padStart(pad, '0')
      const monthStr = String(month).padStart(pad, '0')
      const date = `${dayNum}/${monthStr}/${year}`

      days.push({ date, color })
    }
    responseData.calendar = days
    setStatisticsData(responseData)
    setStreak(userStreak.data.streak)
  }

  useEffect(() => {
    GetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <Text
        as="h1"
        size="t1"
        className="text-primary"
      >
        {pageTitle('title')}
      </Text>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <StreaksAndSavedPosts
            savedPosts={statisticsData.savedItems}
            streak={streak}
          />
          <div className="w-full h-full pt-8 bg-background">
            <div>
              <Text
                as="h2"
                size="t2"
                className="text-text"
              >
                {exercises('title')}
              </Text>
            </div>
            {
              // eslint-disable-next-line no-magic-numbers
              chartData && chartData.length > 0 && (
                <div className="flex flex-col items-center py-6">
                  <DonutChart data={chartData} />
                </div>
              )
            }
            <div className="w-full flex py-10">
              <MonthCalendar calendar={statisticsData.calendar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
