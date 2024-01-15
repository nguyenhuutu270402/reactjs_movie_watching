import { useEffect, useState } from 'react'
import { useQueryConfig } from 'src/hooks'
import { CheckBoxIcon, CheckBoxIconActive, FileIcon } from 'src/icons'
import { log } from 'src/types/log.type'
import { convertTimeString } from 'src/utils/utils'

type Props = {
  data: log
  isSelected: boolean
  onSelect: (itemId: number) => void
}
export default function ItemFileLog({ data, onSelect }: Props) {
  const queryConfig = useQueryConfig()
  const [check, setCheck] = useState<boolean>(false)

  const handleClick = () => {
    onSelect(data.id)
    setCheck(!check)
  }
  useEffect(() => {
    setCheck(false)
  }, [queryConfig.limit, queryConfig.page])

  const { bandwidth, file_name, ip_address, server_name, updated_on, icon_server_url } = data
  return (
    <div className='mb-5 flex w-full items-center  rounded-[10px] bg-[#1E1F25] p-3 text-[12px] text-[#757B8C] md:p-5'>
      <div className='flex w-[500px] items-center'>
        <button onClick={handleClick} className='cursor-pointer'>
          {!check && (
            <div className='mr-[19px] '>
              <CheckBoxIcon />
            </div>
          )}
          {check && (
            <div className='mr-[19px]'>
              <CheckBoxIconActive />
            </div>
          )}
        </button>
        <FileIcon />
        <span className='ml-5 truncate'>{file_name}</span>
      </div>
      <div className='w-[250px] truncate'>{bandwidth} MBytes</div>
      <div className='flex w-[250px] items-center'>
        <img className='h-[20px] w-[28px]' src={icon_server_url} alt={file_name} />
        <span className='ml-[12px]'>{server_name}</span>
      </div>
      <div className='w-[300px] truncate'>{ip_address}</div>
      <div className='w-[200px] truncate text-end'>{convertTimeString(updated_on)}</div>
    </div>
  )
}
