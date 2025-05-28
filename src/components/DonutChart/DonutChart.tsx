import { FC } from 'react'

import Image from 'next/image'

import { DonutChart as MantineDonutChart } from '@mantine/charts'

import { Text } from '../ui/Text'

export interface DonutChartCategory {
  name: string
  value: number
  color: string
  icon: string
}

interface DonutChartProps {
  data: DonutChartCategory[]
}

export const DonutChart: FC<DonutChartProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-6">
      <MantineDonutChart
        data={data.map(({ name, value, color }) => ({
          name,
          value,
          color,
        }))}
        size={180}
        thickness={32}
        paddingAngle={0}
        withTooltip={false}
        strokeWidth={0}
        withLabelsLine={false}
        labelsType="value"
        withLabels
      />
      <div className="flex flex-col gap-3">
        {data.map(({ name, color, icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 mb-2"
          >
            <span
              className="inline-block rounded-full"
              style={{ background: color, width: 24, height: 24 }}
            />
            <Image
              src={icon}
              alt={name}
              width={16}
              height={16}
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(13%) sepia(0%) saturate(7482%) hue-rotate(146deg) brightness(98%) contrast(87%)',
              }}
            />
            <Text
              as="span"
              size="sub"
            >
              {name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
