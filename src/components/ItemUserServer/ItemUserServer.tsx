import { Server } from 'src/types/user.type'

interface Props {
  user: Server
  hiddenIP?: boolean
  currentServerID: number
  onClick: () => void
}

export default function ItemUserServer({ currentServerID, user, hiddenIP, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      aria-hidden='true'
      className={`mr-[10px] mt-[10px] flex min-h-[50px] cursor-pointer items-center justify-between rounded-[10px]  border-[2px] border-solid px-[10px] text-[14px]  text-[#FFF] hover:border-[2px]  hover:border-solid  ${
        currentServerID === user.id ? 'border-[#246CF9]' : 'border-[transparent]'
      } hover:border-[#246CF9] `}
    >
      <div className={`flex ${hiddenIP ? 'w-[32%]' : 'w-[62%]'}  items-center`}>
        <img className='h-[20px] w-[28px] rounded-sm' src={user.icon_url} alt={user.name} />
        <span className='ml-2 w-[70%] truncate font-medium'>{user.name}</span>
      </div>
      {hiddenIP && <div className='w-[28%] text-[#757B8C]'>{user.ip}</div>}
      {user.status === true && (
        <button className='w-[70px] rounded-[5px] bg-[#30E0A133] p-2 text-[12px] font-semibold text-[#30E0A1]'>
          Started
        </button>
      )}
      {user.status === false && (
        <button className='w-[70px] rounded-[5px] bg-[#FA225633] p-2 text-[12px] font-semibold text-[#FA2256]'>
          Stopped
        </button>
      )}
    </div>
  )
}
