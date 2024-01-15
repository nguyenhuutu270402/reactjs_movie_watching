import { User } from 'src/types/auth.type'
import { Server } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('dataSetting')
}
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getSettingIP = (): Server | undefined => {
  const result = localStorage.getItem('dataSetting')
  return result ? JSON.parse(result) : undefined
}

export default function setSettingIP(dataSetting: Server) {
  localStorage.setItem('dataSetting', JSON.stringify(dataSetting))
}
