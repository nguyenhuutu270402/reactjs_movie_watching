import CustomPopover from '../CustomPopover'

interface Props {
  name: string
  data?: {
    type?: string
    limit?: string
  }
  onChangeType?: (type: string) => void
  onChangeLimit?: (limit: string) => void
}
export default function LoggingAndReport({ name, data, onChangeType, onChangeLimit }: Props) {
  const month = [
    { name: '1 month', id: '1 month' },
    { name: '1 week', id: '1 week' },
    { name: '1 year', id: '1 year' }
  ]
  const tyoeOp = [
    { name: 'Information', id: 'Information' },
    { name: 'Errors', id: 'Errors' },
    { name: 'Warnings', id: 'Warnings' }
  ]
  return (
    <div className='col-span-12 mt-[10px] w-full'>
      <h2 className='text-base font-semibold'>{name}</h2>
      <span className='text-[14px] font-normal text-[#A4A8AB]'>Logs history</span>
      <div className='mt-4'>
        <CustomPopover
          value={data?.limit}
          options={month}
          onChange={(value) => {
            onChangeLimit?.(value as string)
          }}
        />
      </div>
      <div className='mt-4'>
        <CustomPopover
          value={data?.type}
          options={tyoeOp}
          onChange={(value) => {
            onChangeType?.(value as string)
          }}
        />
      </div>
    </div>
  )
}
