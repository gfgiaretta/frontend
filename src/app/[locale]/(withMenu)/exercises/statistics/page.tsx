import { Statistics } from '@/components/Statistics/Statistics'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

export default function StatisticsPage() {
  return (
    <MantineProvider>
      <div className="w-full min-h-screen bg-background px-6 pt-4 pb-10">
        <Statistics />
      </div>
    </MantineProvider>
  )
}
