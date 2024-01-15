import { useEffect, useState } from 'react'
import { ImageReceivedVector, ImageSendVector } from 'src/icons'

interface Props {
  data: number | undefined
  icon_down?: boolean
  icon_up?: boolean
}
function CartServer({ data, icon_down, icon_up }: Props) {
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const updateSvgDimensions = () => {
    const svgElement = document.querySelector('.your-svg-class')
    if (svgElement) {
      const styles = window.getComputedStyle(svgElement)
      const width = parseFloat(styles.width)
      const height = parseFloat(styles.height)
      setSvgDimensions({ width, height })
    }
  }
  useEffect(() => {
    updateSvgDimensions()
    window.addEventListener('resize', updateSvgDimensions)
    return () => {
      window.removeEventListener('resize', updateSvgDimensions)
    }
  }, [])
  return (
    <div className='relative col-span-12 md:col-span-6'>
      <span
        className={`absolute text-[14px] font-bold `}
        style={{
          left: `${Math.floor(svgDimensions.width) / 4 + 3}px`,
          top: `${Math.floor(svgDimensions.height) / 4}px`,
          fontSize: `${Math.floor(svgDimensions.width) / 24}px`
        }}
      >
        {data}
      </span>
      {icon_up && <ImageReceivedVector className='your-svg-class' />}
      {icon_down && <ImageSendVector className='your-svg-class' />}
    </div>
  )
}

export default CartServer
