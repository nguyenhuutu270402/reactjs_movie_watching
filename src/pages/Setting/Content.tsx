import { Switch } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from 'src/appStore'
import useQueryConfig from 'src/hooks/useQueryConfig'
import serversService from 'src/services/server'
import { QRKEY } from 'src/utils/enums'

import LoggingAndReport from './Common'
import CustomPopover from './CustomPopover'

export default function Content() {
  const { currentServer, setCurrentServer, serverSetting, setServerSetting } = useAppStore()
  const queryConfig = useQueryConfig()
  const { data: listUserServer } = useQuery({
    queryKey: [QRKEY.SERVER, queryConfig],
    queryFn: () => {
      return serversService.get({ ...queryConfig, limit: '99999' })
    },
    keepPreviousData: true
  })

  return (
    <div className='grid min-h-[250px] w-full grid-cols-1 gap-[30px] rounded-[20px] bg-[#1E1F25] px-[24px] py-[22px] text-[#FFF] md:grid-cols-3 xl:grid-cols-3'>
      <div className='grid grid-cols-12 '>
        <div className=' col-span-12 mt-5 md:col-span-12 xl:col-span-2'>
          <Switch
            checked={serverSetting?.auto_select_location}
            onChange={(isCheck) => {
              const n = {
                ...serverSetting,
                auto_select_location: isCheck
              }
              setServerSetting(n)
            }}
            className={`${
              serverSetting?.auto_select_location ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full  lg:w-11`}
          >
            <span className='sr-only'>Enable notifications</span>
            <span
              className={`${
                serverSetting?.auto_select_location ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 rounded-full bg-black transition`}
            />
          </Switch>
        </div>
        <div className='col-span-12 mt-[12px] md:col-span-9 xl:col-span-10'>
          <h2 className='text-base font-semibold'>Auto select location</h2>
          <span className='text-[14px] font-normal text-[#A4A8AB]'>Default server</span>
          <div className='mt-[14px] w-full'>
            {listUserServer?.data && (
              <CustomPopover
                disable={!serverSetting?.auto_select_location}
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
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12'>
        <LoggingAndReport
          data={{
            type: serverSetting?.log_type,
            limit: serverSetting?.log_time_limit
          }}
          name='Logging'
          onChangeType={(type) => {
            const n = {
              ...serverSetting,
              log_type: type
            }
            setServerSetting(n)
          }}
          onChangeLimit={(limit) => {
            const n = {
              ...serverSetting,
              log_time_limit: limit
            }
            setServerSetting(n)
          }}
        />
      </div>
      <div className='grid grid-cols-12'>
        <LoggingAndReport
          data={{
            type: serverSetting?.report_type,
            limit: serverSetting?.report_time_limit
          }}
          name='Reports'
          onChangeType={(type) => {
            const n = {
              ...serverSetting,
              report_type: type
            }
            setServerSetting(n)
          }}
          onChangeLimit={(limit) => {
            const n = {
              ...serverSetting,
              report_time_limit: limit
            }
            setServerSetting(n)
          }}
        />
      </div>
    </div>
  )
}
