import { MouseEvent } from 'react'
import { DowloadIcon } from 'src/icons'

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  label: string
  className?: string
  classNameIcon?: string
}

const Button = ({ onClick, label, className, classNameIcon }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <div className={classNameIcon}>
        <DowloadIcon />
      </div>
      <div className='ml-[15px]'>{label}</div>
    </button>
  )
}

export default Button
