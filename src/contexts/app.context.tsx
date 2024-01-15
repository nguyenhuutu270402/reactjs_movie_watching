import { createContext, useState } from 'react'
import { User } from 'src/types/auth.type'
import { getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: AppContextInterface = {
  profile: getProfileFromLS(),
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
