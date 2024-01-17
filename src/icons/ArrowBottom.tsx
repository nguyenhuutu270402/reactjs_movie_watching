import { SVGProps } from 'react'

const ArrowBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    {...props}
    height={props.height}
    viewBox='0 0 24 25'
    fill='none'
  >
    <path
      d='M19.9201 9.77319L13.4001 16.2932C12.6301 17.0632 11.3701 17.0632 10.6001 16.2932L4.08008 9.77319'
      stroke={props.color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default ArrowBottom
