import { SVGProps } from 'react'

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox='0 0 18 19'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle
      cx='8.82491'
      cy='9.32491'
      r='6.74142'
      stroke='#3C4254'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M13.5137 14.3638L16.1567 16.9999'
      stroke='#3C4254'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default SearchIcon
