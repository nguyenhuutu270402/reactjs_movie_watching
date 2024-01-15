import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import CustomTooltipChartArea from '../CustomTooltipChart/CustomTooltipChartArea'

interface Props {
  bandwidth_usage?: {
    time: string
    bandwidth: number
  }[]
}
export default function ChartArea({ bandwidth_usage }: Props) {
  const dataInMB = bandwidth_usage?.map((item) => ({
    time: item.time,
    bandwidth: parseFloat((item.bandwidth / (1024 * 1024)).toFixed(2))
  }))
  if (!dataInMB) return null
  return (
    <>
      <div className='text-[16px] font-bold text-white'>Bandwidth usage</div>
      <ResponsiveContainer width={'100%'} height={'92%'}>
        <AreaChart
          data={dataInMB}
          margin={{
            top: 20,
            bottom: 20
          }}
        >
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#246CF9' stopOpacity={0.4} />
              <stop offset='75%' stopColor='#246CF9' stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <YAxis tickMargin={6} axisLine={false} tickLine={false} fontSize={12} tick={{ stroke: '#A4A8AB' }} />
          <XAxis
            tickMargin={20}
            tickFormatter={(value: string) => {
              if (dataInMB.length <= 8) {
                return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(value))
              } else if (dataInMB.length <= 366) {
                return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' })
                  .format(new Date(value))
                  .replace('-', '/')
              } else {
                return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })
                  .format(new Date(value))
                  .replace('-', '/')
              }
            }}
            dataKey='time'
            axisLine={false}
            tickLine={false}
            fontSize={12}
            tickCount={2}
            tick={{ stroke: '#A4A8AB' }}
          />
          <CartesianGrid strokeDasharray='none' strokeWidth={0.1} vertical={false} />
          <Tooltip cursor={false} content={CustomTooltipChartArea} />
          <Area
            dataKey='bandwidth'
            type='monotone'
            fill='url(#color)'
            stroke='#246CF9'
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}
