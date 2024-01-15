import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

import CustomTooltipChartLline from '../CustomTooltipChart/CustomTooltipChartLine'

interface Props {
  current_active_connect?: number
  active_connect?: {
    time: string
    connections: number
  }[]
}

export default function ChartLine({ active_connect, current_active_connect }: Props) {
  return (
    <>
      <div className='text-[16px] font-bold text-white'>Active connections</div>
      <ResponsiveContainer width={'100%'} height={'75%'}>
        <LineChart
          data={active_connect}
          margin={{
            top: 20,
            bottom: 20
          }}
        >
          <YAxis
            tickMargin={20}
            axisLine={false}
            tickLine={false}
            fontSize={12}
            tickCount={4}
            tick={{ stroke: '#3C4254' }}
          />
          <CartesianGrid strokeDasharray='4' strokeWidth={0.1} vertical={false} />
          <Tooltip cursor={false} content={CustomTooltipChartLline} />
          <Line
            dataKey='connections'
            stroke='#246CF9'
            filter='blur(20px)'
            strokeWidth={6}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line dataKey='connections' stroke='#246CF9' strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className=' flex items-center text-[16px] font-normal text-white'>
        <span className='mr-4 text-[36px] font-medium'>{current_active_connect}</span> Active connections
      </div>
    </>
  )
}
