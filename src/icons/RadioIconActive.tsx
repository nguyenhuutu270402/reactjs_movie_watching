import { SVGProps } from 'react'

const RadioIconActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    {...props}
    height={props.height}
    viewBox='0 0 20 20'
    fill='none'
  >
    <circle cx='9.83334' cy='9.8335' r='4' fill='#246CF9' />
    <circle cx='10' cy='10' r='9.5' stroke='#246CF9' />
  </svg>
)

export default RadioIconActive
