import { SVGProps } from 'react'

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    height={props.height}
    viewBox='0 0 20 20'
    {...props}
    fill='none'
  >
    <path
      d='M12.5 17.225C12.3417 17.225 12.1834 17.1667 12.0584 17.0417L6.62502 11.6084C5.74169 10.725 5.74169 9.27502 6.62502 8.39168L12.0584 2.95835C12.3 2.71668 12.7 2.71668 12.9417 2.95835C13.1834 3.20002 13.1834 3.60002 12.9417 3.84168L7.50836 9.27502C7.10836 9.67502 7.10836 10.325 7.50836 10.725L12.9417 16.1583C13.1834 16.4 13.1834 16.8 12.9417 17.0417C12.8167 17.1584 12.6584 17.225 12.5 17.225Z'
      fill='white'
    />
  </svg>
)

export default ArrowLeftIcon
