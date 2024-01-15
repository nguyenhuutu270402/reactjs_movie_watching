import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useAppStore } from 'src/appStore'
import { DatePickerWithRange } from 'src/components/DatePicker/range-date-picker'
import ItemUserServer from 'src/components/ItemUserServer/ItemUserServer'
import useQueryConfig from 'src/hooks/useQueryConfig'
import PageContainer from 'src/layout/PageContainer'
import serversService from 'src/services/server'
import StatisticApi from 'src/services/statistic.api'
import { QRKEY } from 'src/utils/enums'

import { ChartArea, ChartLine } from './Chart'

export default function Statistic() {
  const [selectedDates, setSelectedDates] = useState<{
    formattedDateFr: string
    formattedDateTo: string
  }>({
    formattedDateFr: '',
    formattedDateTo: ''
  })
  const { currentServer, setServerSetting, serverSetting } = useAppStore()

  const queryConfig = useQueryConfig()
  const { data: listUserServer } = useQuery({
    queryKey: [QRKEY.SERVER, queryConfig],
    queryFn: () => {
      return serversService.get({ ...queryConfig, limit: '10000' })
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: listStatistic } = useQuery({
    queryKey: [QRKEY.STATISTIC, { currentServer, selectedDates }],
    queryFn: () => {
      return StatisticApi.getListuserStatistic({
        id: currentServer.id as number,
        create_end_time: selectedDates.formattedDateTo,
        create_start_time: selectedDates.formattedDateFr
      })
    },
    refetchInterval: 10000
  })
  const dataStatistic = listStatistic?.data.data
  return (
    <PageContainer
      header={{
        title: 'Statistic'
      }}
    >
      <div className='md:pb-2'>
        <div className='grid grid-cols-12 gap-4 '>
          <div className='col-span-12 flex flex-col xl:col-span-9'></div>
          <div className='col-span-9 rounded-[20px] bg-[#1E1F25]  md:col-span-4 xl:col-span-3'>
            <DatePickerWithRange setSelectedDates={setSelectedDates} />
          </div>
        </div>

        <div className='mt-3 grid grid-cols-12 gap-4 pb-4'>
          <div className='col-span-12 flex flex-col gap-5 xl:col-span-9'>
            <div className='h-[380px] rounded-[20px] bg-[#1E1F25] px-5 py-4 xl:h-[440px]'>
              <ChartLine
                current_active_connect={dataStatistic?.current_active_connect}
                active_connect={dataStatistic?.active_connect}
              />
            </div>
            <div className='h-[380px] rounded-[20px] bg-[#1E1F25] px-5 pt-4 xl:h-[440px]'>
              <ChartArea bandwidth_usage={dataStatistic?.bandwidth_usage} />
            </div>
          </div>
          <div className='col-span-12 rounded-[20px] bg-[#1E1F25] p-5 text-[#FFF] xl:col-span-3'>
            <div className='h-full w-full  bg-[#1D1F25] lg:w-auto'>
              <h2 className='font-medium text-[#FFF] sm:text-[12px] md:text-[20px]'>Servers</h2>
              <div className='mt-[10px] h-full  overflow-y-auto lg:h-[calc(100%-64px)]'>
                {listUserServer?.data &&
                  listUserServer?.data.map((user) => (
                    <ItemUserServer
                      currentServerID={serverSetting?.default_server_id}
                      onClick={() => setServerSetting({ ...serverSetting, default_server_id: user.id })}
                      user={user}
                      hiddenIP={false}
                      key={user.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
