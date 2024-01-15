import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import serversService from 'src/services/server'

import { useAppStore } from './appStore'
import Loading from './components/Loading'
import useRouteElement from './useRouteElement'
import { QRKEY } from './utils/enums'

function App() {
  const { isAuthenticated, isLoading, setIsLoading, currentServer, setCurrentServer, serverSetting, setServerSetting } =
    useAppStore()

  const { data: servers = [], isLoading: isServersLoading } = useQuery({
    queryKey: [QRKEY.SERVER],
    queryFn: () => {
      return serversService.get({ limit: '9999' })
    },
    select: (data) => data.data,
    enabled: isAuthenticated
  })

  const { data: newestServerSetting, isLoading: isNewestServerSettingLoading } = useQuery({
    queryKey: [QRKEY.GETSETTING],
    queryFn: () => {
      return serversService.getServerSetting()
    },
    select: (data) => data.data,
    enabled: isAuthenticated && servers.length > 0
  })
  useEffect(() => {
    if (newestServerSetting && servers.length > 0) {
      const f = servers.find((x) => x.name === newestServerSetting.default_server)
      if (f) {
        setServerSetting({ ...newestServerSetting, default_server_id: f.id })
      }
    }
  }, [newestServerSetting, servers, setServerSetting])
  useEffect(() => {
    if (serverSetting) {
      const f = servers.find((x) => x.id === serverSetting.default_server_id)
      if (f) setCurrentServer(f)
    }
  }, [serverSetting, servers, setCurrentServer])

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(isServersLoading || isNewestServerSettingLoading || !serverSetting || !currentServer)
    }
  }, [isAuthenticated, isServersLoading, serverSetting, isNewestServerSettingLoading, currentServer, setIsLoading])
  const routeElements = useRouteElement()
  if (isLoading) return <Loading />
  return <>{routeElements}</>
}

export default App
