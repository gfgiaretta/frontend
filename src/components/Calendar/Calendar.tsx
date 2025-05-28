'use client'

import { Indicator } from '@mantine/core'
import { Calendar } from '@mantine/dates'

interface Days {
  date: string
  color: string
}

const elipseColor = {
  green: 'var(--color-primary)',
  pink: 'var(--color-secondary)',
  blue: 'var(--color-support-blue)',
}

const FORMAT_MAX_LENGTH = 2
const MONTH_VALUE_FIXED = 1

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(FORMAT_MAX_LENGTH, '0')
  const month = String(date.getMonth() + MONTH_VALUE_FIXED).padStart(
    FORMAT_MAX_LENGTH,
    '0',
  )
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function MonthCalendar({ calendar }: { calendar: Days[] }) {
  return (
    <Calendar
      className="w-fit border-2 border-text rounded-2xl z-20 px-3 pb-4 pt-2"
      hideWeekdays
      hideOutsideDates
      static
      level="month"
      monthLabelFormat="MMMM"
      renderDay={(date) => {
        const day = date.getDate()
        const formatted = formatDate(date)
        const match = calendar.find((d) => d.date === formatted)

        return (
          <Indicator
            size={6}
            color={
              match
                ? elipseColor[match.color as keyof typeof elipseColor]
                : 'transparent'
            }
            offset={-2}
            position="top-center"
            disabled={!match}
          >
            <div>{day}</div>
          </Indicator>
        )
      }}
      styles={{
        calendarHeaderControl: { display: 'none' },
        calendarHeaderLevel: {
          pointerEvents: 'none',
          fontFamily: 'var(--font-neulis)',
          fontSize: 'var(--text-base)',
        },
        day: {
          color: 'var(--text-text)',
          fontFamily: 'var(--font-sfPro)',
          height: '0',
          padding: '0',
          lineHeight: 'auto',
        },
      }}
    />
  )
}
