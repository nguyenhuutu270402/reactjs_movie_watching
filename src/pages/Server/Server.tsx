import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppStore } from 'src/appStore'
import ItemUserServer from 'src/components/ItemUserServer'
import Loading from 'src/components/Loading'
import useQueryConfig from 'src/hooks/useQueryConfig'
import PageContainer from 'src/layout/PageContainer'
import serversService from 'src/services/server'
import { QRKEY } from 'src/utils/enums'

import CartServer from './CartServer'

export default function Server() {
  const { currentServer, serverSetting, setServerSetting } = useAppStore()
  const queryClient = useQueryClient()

  const queryConfig = useQueryConfig()
  const { data: servers = [], isLoading: isServersLoading } = useQuery({
    queryKey: [QRKEY.SERVER, queryConfig],
    queryFn: () => {
      return serversService.get({ ...queryConfig, limit: '9999' })
    },
    select: (data) => data.data,
    refetchInterval: 10000
  })
  const updateStatusStartStopMutation = useMutation({
    mutationFn: serversService.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QRKEY.SERVER] })
      queryClient.invalidateQueries({ queryKey: ['userId'] })
    },
    onError: (e) => {
      console.log(e)
    }
  })
  const handleStartStop = () => {
    if (currentServer?.id) {
      updateStatusStartStopMutation.mutate({ id: currentServer.id, status: !currentServer.status, wg_name: 'wg2' })
    }
  }

  if (!currentServer || isServersLoading) return <Loading />
  const data_received = (() => {
    const f = servers.find((x) => x.id === currentServer.id)
    return f ? f.data_received : currentServer.data_received
  })()
  const data_sent = (() => {
    const f = servers.find((x) => x.id === currentServer.id)
    return f ? f.data_sent : currentServer.data_sent
  })()
  return (
    <PageContainer
      header={{
        title: 'Server'
      }}
    >
      <div className='flex h-full flex-wrap gap-5 '>
        <div className=' w-full rounded-[20px] bg-[#1D1F25] px-4 py-[10px] md:min-w-[369px] md:px-5 lg:w-auto xl:h-full'>
          <h2 className='font-medium text-[#FFF] sm:text-[12px] md:text-[20px]'>Servers list</h2>
          <div className='mt-[10px] h-full overflow-y-auto lg:h-[calc(100%-64px)] xl:min-w-[290px]'>
            {servers &&
              servers.map((s) => (
                <ItemUserServer
                  currentServerID={serverSetting.default_server_id}
                  onClick={() => {
                    if (s.id !== currentServer.id) {
                      setServerSetting({ ...serverSetting, default_server: s.name, default_server_id: s.id })
                    }
                  }}
                  user={s}
                  hiddenIP={true}
                  key={s.id}
                />
              ))}
          </div>
        </div>
        <div
          className=' w-full flex-1 rounded-[20px] bg-[#1E1F25] bg-no-repeat px-7 py-5 text-[#FFF]  '
          style={{
            backgroundImage: "url('/backgroundSever.png')",
            backgroundPosition: 'center',
            backgroundSize: '80%'
          }}
        >
          <div className='flex h-full flex-col justify-between  '>
            <div className=''>
              <h1 className='font-medium sm:text-[12px] md:text-[20px]'>{currentServer?.name} Server</h1>
              <span className='mb-[22px] block text-[14px] font-medium text-[#A1A1AC]'>
                Server configuration will be set up manually
              </span>
              <button
                onClick={handleStartStop}
                className='w-full rounded-3xl  bg-[#246CF9] p-3 text-[14px] font-bold md:w-[192px]'
              >
                {currentServer.status ? 'STOP SERVER' : 'START SERVER'}
              </button>
            </div>
            <div className='mt-4 grid grid-cols-12 gap-4 md:gap-10'>
              <CartServer icon_up data={data_received} />
              <CartServer icon_down data={data_sent} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
