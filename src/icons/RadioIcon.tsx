import { SVGProps } from 'react'

const RadioIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    height={props.height}
    viewBox='0 0 20 20'
    fill='none'
  >
    <g opacity='0.5'>
      <circle cx='10' cy='10' r='9.5' stroke='#C3CDDB' />
    </g>
  </svg>
)

export default RadioIcon
