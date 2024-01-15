import { SVGProps } from 'react'

const ArrowRightIconPagination = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    height={props.height}
    {...props}
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path
      d='M7.49998 17.225C7.65831 17.225 7.81664 17.1667 7.94164 17.0417L13.375 11.6084C14.2583 10.725 14.2583 9.27502 13.375 8.39168L7.94164 2.95835C7.69998 2.71668 7.29998 2.71668 7.05831 2.95835C6.81664 3.20002 6.81664 3.60002 7.05831 3.84168L12.4916 9.27502C12.8916 9.67502 12.8916 10.325 12.4916 10.725L7.05831 16.1583C6.81664 16.4 6.81664 16.8 7.05831 17.0417C7.18331 17.1584 7.34164 17.225 7.49998 17.225Z'
      fill='white'
    />
  </svg>
)

export default ArrowRightIconPagination
