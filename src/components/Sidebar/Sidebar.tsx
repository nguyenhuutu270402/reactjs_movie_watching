import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from 'src/appStore'
import { AppContext } from 'src/contexts/app.context'
import { LogoutIcon, SettingIcon } from 'src/icons'
import { clearLS } from 'src/utils/auth'
import path from 'src/utils/path'

import Button from './components/Button'
import { dataName } from './contants'

export default function Sidebar() {
  const { profile } = useContext(AppContext)
  const { setIsAuthenticated } = useAppStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    setIsAuthenticated(false)
    clearLS()
    navigate(path.home)
  }
  return (
    <div className='my-6 ml-6 hidden w-60 sm:block'>
      <div className='flex h-full flex-col justify-around rounded-[20px] bg-[#1E1F25]'>
        <div className='mb-5 mt-[76px] h-[1px] bg-[#282C38]'></div>
        <div className='scrollbar flex-1 overflow-auto'>
          <ul>
            {dataName.map((data) => (
              <Button key={data.index} name={data.name} to={data.to} IconComponent={data.IconComponent} />
            ))}
          </ul>
          <h1 className='mb-[25px] mt-[16px] px-[26px] text-[14px] font-semibold uppercase text-[#3C4254]'>ACCOUNT</h1>
          <ul className=''>
            <li className='mb-[2px]'>
              <NavLink
                className={({ isActive }) => {
                  const isActiveClass = isActive
                    ? 'bg-[#282C38] text-[#FFF] [&>div>svg]:text-[#246CF9]'
                    : 'text-[rgb(117,123,140)]'
                  return `px-[26px] py-[10px] ${isActiveClass}  flex h-[44px] items-center truncate text-[14px] font-normal `
                }}
                to={path.setting}
              >
                <div className='mr-[15px] text-[#757B8C]'>
                  <SettingIcon />
                </div>
                Settings
              </NavLink>
            </li>
            <li className='mb-[2px] px-[26px] '>
              <button
                onClick={handleLogout}
                className='flex h-[44px] items-center py-[10px] text-[14px] font-normal text-[#757B8C]'
              >
                <div className='mr-[15px] text-[#757B8C]'>
                  <LogoutIcon />
                </div>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <div className='flex  items-center justify-center rounded-b-[20px] bg-[#282C38]  text-[#FFF]'>
          <span className='block truncate p-4 text-sm sm:text-base'>{profile?.email}</span>
        </div>
      </div>
    </div>
  )
}
