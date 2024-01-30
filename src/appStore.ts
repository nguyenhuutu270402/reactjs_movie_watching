import { create } from 'zustand'
import { getAccessTokenFromLS } from './utils/auth'

interface BearState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}
export const useAppStore = create<BearState>()((set, _get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
}))
