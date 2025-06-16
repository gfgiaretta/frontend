import { FC } from 'react'

import Image from 'next/image'

import { DonutChart as MantineDonutChart } from '@mantine/charts'

import { Text } from '@/components/ui/Text'

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
    <div className="flex items-center flex-wrap justify-center">
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
            <div
              style={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                src={icon}
                alt={name}
                width={16}
                height={16}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter:
                    'brightness(0) saturate(100%) invert(13%) sepia(0%) saturate(7482%) hue-rotate(146deg) brightness(98%) contrast(87%)',
                  display: 'block',
                }}
              />
            </div>
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
