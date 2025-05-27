'use client'

import { Book, Image as ImageIcon, Pen } from 'lucide-react'

import { DonutChart } from '@/components/DonutChart/DonutChart'

const chartData = [
  { name: 'Reading', value: 10, color: '#4d716a', icon: Book },
  { name: 'Writing', value: 8, color: '#da7584', icon: Pen },
  { name: 'Image', value: 3, color: '#8fd3fd', icon: ImageIcon },
]

export default function DonutChartExamplePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <DonutChart data={chartData} />
    </div>
  )
}
