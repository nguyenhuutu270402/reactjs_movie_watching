import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from 'src/appStore'
import Button from 'src/components/Sidebar/components/Button'
import { dataName } from 'src/components/Sidebar/contants'
import { AppContext } from 'src/contexts/app.context'
import { LogoutIcon, MenuIcon, SettingIcon } from 'src/icons'
import CloseICon from 'src/icons/CloseIcon'
import { clearLS } from 'src/utils/auth'
import path from 'src/utils/path'

export type PageHeaderProps = {
  title: ReactNode
}
const PageHeader = ({ title }: PageHeaderProps) => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { profile } = useContext(AppContext)
  const { setIsAuthenticated } = useAppStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    setIsAuthenticated(false)
    clearLS()
    navigate(path.home)
  }
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowNav(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className='fixed z-[100] flex h-[80px] w-full items-center justify-between bg-base-dark-grey' ref={navRef}>
      <div className='px-4 py-2 sm:px-6'>
        <div className='py-4 font-medium text-[#FFF] md:text-xl xl:text-2xl'>{title}</div>
      </div>
      <button onClick={() => setShowNav(!showNav)} className='mr-4 block bg-[#246CF9] p-2 sm:hidden'>
        <MenuIcon />
      </button>
      {showNav && (
        <div className='text-[#FFF]sm:hidden fixed inset-y-0 right-0 z-10 block w-[80%] bg-[#1E1F25]'>
          <button
            onClick={() => setShowNav(!showNav)}
            className='absolute right-4 mt-4 block rounded-[14px]  bg-[#246CF9]  p-1 sm:hidden'
          >
            <CloseICon />
          </button>

          <div className='mt-16'>
            <div className=' flex flex-col items-center text-[#FFF]'>
              <div className='mb-2 h-20 w-20 overflow-hidden rounded-full'>
                <img
                  className='h-full w-full'
                  alt='abc'
                  src='https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80'
                />
              </div>
              <div>{profile?.email}</div>
            </div>
            <div className='mt-2 h-full grow'>
              <ul>
                {dataName.map((data) => (
                  <Button key={data.index} name={data.name} to={data.to} IconComponent={data.IconComponent} />
                ))}
              </ul>
              <h1 className='mb-[25px] mt-[16px] px-[26px] text-[14px] font-semibold uppercase text-[#3C4254]'>
                ACCOUNT
              </h1>
              <ul className=''>
                <li className='mb-[2px]'>
                  <NavLink
                    className={({ isActive }) => {
                      const isActiveClass = isActive
                        ? 'bg-[#282C38] text-[#FFF] [&>div>svg]:text-[#246CF9]'
                        : 'text-[rgb(117,123,140)]'
                      return `px-[26px] py-[10px] ${isActiveClass} flex h-[44px] items-center truncate text-[14px] font-normal `
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
          </div>
        </div>
      )}
    </div>
  )
}

export default PageHeader
