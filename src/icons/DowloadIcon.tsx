import { SVGProps } from 'react'

const DowloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    height={props.height}
    viewBox='0 0 24 25'
    fill='none'
    {...props}
  >
    <g opacity='0.4'>
      <path d='M9 11.5V17.5L11 15.5' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9 17.5L7 15.5' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </g>
    <path
      d='M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default DowloadIcon
