import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAppStore } from 'src/appStore'
import Button from 'src/components/Button'
import { DatePickerWithRange } from 'src/components/DatePicker/range-date-picker'
import ItemFileLog from 'src/components/ItemFileLog'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import PageContainer from 'src/layout/PageContainer'
import LogApi from 'src/services/log'
import serversService from 'src/services/server'
import { QRKEY } from 'src/utils/enums'
import path from 'src/utils/path'

import PopoverSelect from '../DashBoardClient/PopoverSelect'

export default function Log() {
  const { currentServer, setCurrentServer, serverSetting, setServerSetting } = useAppStore()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedDates, setSelectedDates] = useState<{
    formattedDateFr: string
    formattedDateTo: string
  }>({
    formattedDateFr: '',
    formattedDateTo: ''
  })
  const handleItemSelect = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }
  const queryConfig = useQueryConfig()
  const { data: listUserServer } = useQuery({
    queryKey: [QRKEY.SERVER, queryConfig],
    queryFn: () => {
      return serversService.get({ ...queryConfig, page: '1', limit: '99999' })
    },
    keepPreviousData: true
  })
  const handleExport = () => {
    if (dataExport) {
      LogApi.getListLogExport({ file_name: dataExport, server_id: currentServer?.id }).then((res) => {
        const link = document.createElement('a')
        link.href = res.data.data
        link.click()
        link.parentNode?.removeChild(link)
      })
    }
  }
  const { data: dataLog } = useQuery({
    queryKey: [QRKEY.LOG, { queryConfig, currentServer, selectedDates }],
    queryFn: () => {
      return LogApi.getListlog({
        ...queryConfig,
        server_id: currentServer?.id,
        end_time: selectedDates.formattedDateTo,
        start_time: selectedDates.formattedDateFr
      })
    },
    keepPreviousData: true
  })

  const listDataLog = dataLog?.data.data
  const optionPage = dataLog?.data.page
  const result: string[] = []

  if (listDataLog) {
    for (const id of selectedItems) {
      const foundItem = listDataLog.find((item) => item.id === id)
      if (foundItem) {
        result.push(foundItem.dir_name + '%2F' + foundItem.file_name.replace('.log', ''))
      }
    }
  }
  useEffect(() => {
    setSelectedItems([])
  }, [queryConfig.limit, queryConfig.page])
  const dataExport = result.join(',')
  return (
    <PageContainer
      header={{
        title: 'Logs'
      }}
    >
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='col-span-12 sm:col-span-4'>
          <h1 className='text-sm font-normal text-[#246CF9] sm:text-base'>{selectedItems.length} files selected</h1>
        </div>
        <div className='flex flex-wrap gap-[20px]'>
          <DatePickerWithRange filterToday={true} setSelectedDates={setSelectedDates} />
          {listUserServer?.data && (
            <PopoverSelect
              value={currentServer?.id}
              options={listUserServer?.data}
              onChange={(id) => {
                const dataFilter = listUserServer?.data.find((data) => data.id === id)
                if (dataFilter) {
                  setCurrentServer(dataFilter)
                  const n = {
                    ...serverSetting,
                    default_server_id: dataFilter.id
                  }
                  setServerSetting(n)
                }
              }}
            />
          )}
          <Button
            label='Export'
            onClick={handleExport}
            classNameIcon='h-4 w-4 md:h-6 md:w-6'
            className='flex items-center justify-around rounded-[10px] bg-[#246CF9] px-[14px] py-[8px] text-[#FFFFFF] md:px-[12px] md:py-[10px]'
          />
        </div>
      </div>
      <div className=' my-4 h-[calc(100vh-300px)] overflow-x-auto pr-4 md:h-[calc(100vh-260px)]'>
        <div className='w-full min-w-[1240px]'>
          {listDataLog &&
            listDataLog.map((data) => (
              <ItemFileLog
                key={data.id}
                data={data}
                isSelected={selectedItems.includes(data.id)}
                onSelect={handleItemSelect}
              />
            ))}
        </div>
      </div>
      {optionPage && optionPage.total_count >= 1 && (
        <Pagination
          pageSizeOptions={[10, 20, 50, 100]}
          path={path.log}
          queryConfig={queryConfig}
          pageSize={optionPage.total_page}
        />
      )}
    </PageContainer>
  )
}
