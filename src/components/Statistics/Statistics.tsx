'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Text } from '../ui/Text'
import { StreaksAndSavedPosts } from './StreaksAndSavedPosts'
import { MonthCalendar } from '@/components/Calendar/Calendar'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface Days {
  date: string
  color: string
}

export const Statistics = () => {
  const pageTitle = useTranslations('Statistics')
  const exercises = useTranslations('Exercises')
  const defaultStatisticsDataCount = {
    graph: {},
    calendar: [{ date: '0', color: 'white' }],
    savedItems: 0,
  }
  const [statisticsData, setStatisticsData] = useState(
    defaultStatisticsDataCount,
  )

  async function GetData() {
    const token = getToken()
    const userInfo = await api(token).get('/auth/token')
    const responseStatisitcs = await api(token).get('user/stats')
    const responseData = responseStatisitcs.data

    const interests = {
      [userInfo.data.interests[0]?.title]: 'green',
      [userInfo.data.interests[1]?.title]: 'pink',
      [userInfo.data.interests[2]?.title]: 'blue',
    }

    const now = new Date()
    const year = now.getFullYear()
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
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div className="w-full h-full bg-background">
      <div className="justify-start">
        <Text
          as="h1"
          size="t1"
          className="text-primary"
        >
          {pageTitle('title')}
        </Text>
      </div>
      <div>
        <div>
          <StreaksAndSavedPosts savedPosts={statisticsData.savedItems} />
        </div>
      </div>
      <div className="w-full h-full pt-8 bg-background">
        <div className="justify-start">
          <Text
            as="h2"
            size="t2"
            className="text-text"
          >
            {exercises('title')}
          </Text>
        </div>
        <div className="w-full flex m-10">
          <MonthCalendar calendar={statisticsData.calendar} />
        </div>
      </div>
    </div>
  )
}
