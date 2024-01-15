import { NavLink } from 'react-router-dom'

interface ButtonProps {
  name: string
  IconComponent: React.ComponentType
  className?: string
  to: string
}
const Button = ({ name, IconComponent, to }: ButtonProps) => {
  return (
    <li className='mb-[2px] cursor-pointer  hover:bg-[#282C38]'>
      <NavLink
        to={to}
        className={({ isActive }) => {
          const isActiveClass = isActive
            ? 'bg-[#282C38] text-[#FFF] [&>div>svg]:text-[#246CF9]'
            : 'text-[rgb(117,123,140)]'
          return `px-[26px] py-[10px] ${isActiveClass} flex h-[44px] items-center truncate text-[14px] font-normal `
        }}
      >
        <div className='mr-[15px]  text-[#757B8C]'>
          <IconComponent />
        </div>
        {name}
      </NavLink>
    </li>
  )
}

export default Button
