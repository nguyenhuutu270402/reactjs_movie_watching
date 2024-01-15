import { SVGProps } from 'react'

const CheckBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' {...props} width='20' height='20' viewBox='0 0 20 20' fill='none'>
    <rect x='0.5' y='0.5' width='19' height='19' rx='3.5' fill='#282C38' />
    <rect x='0.5' y='0.5' width='19' height='19' rx='3.5' stroke='#3C4254' />
  </svg>
)

export default CheckBoxIcon
