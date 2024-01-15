import { SVGProps } from 'react'

const ActionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='3' height='20' viewBox='0 0 3 22' fill='currentColor' {...props}>
    <circle cx='1.5' cy='2' r='1.5' fill='currentColor' />
    <circle cx='1.5' cy='11' r='1.5' fill='currentColor' />
    <circle cx='1.5' cy='20' r='1.5' fill='currentColor' />
  </svg>
)

export default ActionIcon
