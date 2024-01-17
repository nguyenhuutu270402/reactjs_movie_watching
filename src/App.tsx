import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import serversService from 'src/services/server'

import { useAppStore } from './appStore'
import Loading from './components/Loading'
import useRouteElement from './useRouteElement'
import { QRKEY } from './utils/enums'

function App() {
  const { isAuthenticated, isLoading, setIsLoading} =
    useAppStore()
  const routeElements = useRouteElement()
  if (isLoading) return <Loading />
  return <>{routeElements}</>
}

export default App
