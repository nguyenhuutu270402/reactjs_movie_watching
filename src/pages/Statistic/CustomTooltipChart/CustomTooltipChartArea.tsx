import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { formatDateStatitis } from 'src/utils/utils'

const CustomTooltipChartArea = <TValue extends ValueType, TName extends NameType>({
  active,
  payload
}: TooltipProps<TValue, TName>) => {
  if (active && payload && payload.length) {
    return (
      <div
        className='flex flex-col items-start gap-1 rounded-2xl p-3 text-[#FFF]'
        style={{ background: 'rgba(18, 24, 31, 0.53)' }}
      >
        <div className='flex w-full items-center  font-bold'>
          <div className='mr-[6px]'>
            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'>
              <ellipse
                cx='3.46608'
                cy='4'
                rx='3.46608'
                ry='4'
                transform='matrix(1 0 0 -1 0.537109 8.60352)'
                fill='#246CF9'
              />
            </svg>
          </div>
          <div className='text-[16px] text-[#FFF]'>{payload[0].payload.bandwidth} Mb/s</div>
        </div>
        <div className='flex w-full items-center  font-bold'>
          <div className='mr-[6px]'>
            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='9' viewBox='0 0 8 9' fill='none'>
              <ellipse
                cx='3.46608'
                cy='4'
                rx='3.46608'
                ry='4'
                transform='matrix(1 0 0 -1 0.537109 8.60352)'
                fill='#FB774A'
              />
            </svg>
          </div>
          <div className='text-[10px] text-[#81818A]'>{formatDateStatitis(payload[0].payload.time)}</div>
        </div>
      </div>
    )
  }

  return null
}

export default CustomTooltipChartArea
