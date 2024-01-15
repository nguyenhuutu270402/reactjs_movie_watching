import { create } from 'zustand'

import serversService from './services/server'
import { Server } from './types/user.type'
import { ServerSetting } from './types/util.type'
import setSettingIP, { getAccessTokenFromLS } from './utils/auth'

interface BearState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  serverSetting: ServerSetting
  setServerSetting: (data: ServerSetting) => void
  currentServer: Server
  setCurrentServer: (server: Server) => void
}
export const useAppStore = create<BearState>()((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
  serverSetting: undefined as unknown as ServerSetting,
  setServerSetting: async (data) => {
    const currentLoading = get().isLoading
    const currentServerSetting = get().serverSetting
    if (currentServerSetting) {
      set(() => ({ isLoading: true }))
      await serversService.updateSetting(data)
    }
    set(() => ({ isLoading: currentLoading, serverSetting: data }))
  },
  currentServer: undefined as unknown as Server,
  setCurrentServer: (server) =>
    set(() => {
      if (server) {
        setSettingIP(server)
      } else {
        localStorage.removeItem('dataSetting')
      }
      return { currentServer: server }
    })
}))
