import classNames from 'classnames'

interface ChildProps {
  sendDataToParent: (data: string) => void
  receivedData: string
}
export default function HeaderClientDashBoard({ receivedData, sendDataToParent }: ChildProps) {
  return (
    <div className='col-span-full lg:col-span-2'>
      <div className='flex flex-wrap'>
        <button
          className={classNames('mr-10 h-full text-[18px] font-medium text-[#3C4254] xl:text-2xl', {
            'border-b-2 border-[#246CF9] text-[#FFF]': receivedData === 'Active',
            'border-transparent': false
          })}
          onClick={() => sendDataToParent('Active')}
        >
          Active clients
        </button>
        <button
          onClick={() => sendDataToParent('Block')}
          className={classNames('mr-10 h-full text-[18px] font-medium text-[#3C4254] xl:text-2xl', {
            'border-b-2 border-[#246CF9] text-[#FFF]': receivedData === 'Block',
            'border-transparent': false
          })}
        >
          Blocked clients
        </button>
      </div>
    </div>
  )
}
