import { SVGProps } from 'react'

const CheckBoxIconActive = (props: SVGProps<SVGSVGElement>) => (
  <svg width='20' height='20' {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_417_3390)'>
      <rect width='20' height='20' rx='4' fill='#246CF9' />
      <path
        d='M5 10L9 13L15 7'
        stroke='#FCFCFD'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_417_3390'>
        <rect width='20' height='20' rx='4' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

export default CheckBoxIconActive
