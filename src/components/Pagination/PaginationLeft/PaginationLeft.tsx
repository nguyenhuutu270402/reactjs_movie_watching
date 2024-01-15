import { useEffect, useRef, useState } from 'react'
import { usePopper as useReactPopper } from 'react-popper'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ArrowBottom } from 'src/icons'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
  path: string
  pageSizeOptions?: number[]
}
export default function PaginationLeft({ queryConfig, path, pageSizeOptions }: Props) {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [toolboxElement, setToolboxElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = useReactPopper(referenceElement, toolboxElement, {
    placement: 'bottom'
  })
  const [isToolboxVisible, setIsToolboxVisible] = useState(false)
  const handleButtonClick = () => {
    setIsToolboxVisible(!isToolboxVisible)
  }
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsToolboxVisible(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className='flex h-[50px] items-center text-white' ref={divRef}>
      <button
        className='flex cursor-pointer items-center justify-between rounded-[20px] border border-[#303A46] bg-[#161D26] px-5 py-[8px] text-[10px] text-[#FFF] shadow-sm md:py-3 md:text-[16px]'
        type='button'
        ref={setReferenceElement}
        onClick={handleButtonClick}
      >
        <div>Display {queryConfig.limit} items/page</div>
        <div className='ml-2 h-[14px] w-[14px] bg-[#161D26] md:h-[20px] md:w-[20px] '>
          <ArrowBottom />
        </div>
      </button>
      {isToolboxVisible && (
        <div
          ref={setToolboxElement}
          style={{
            ...styles.popper
          }}
          {...attributes.popper}
        >
          <div className=' z-10 w-[200px] px-4 sm:px-0 '>
            <div className=' '>
              <div className='my-3 rounded-lg bg-[#282C38] p-2 text-[#FFFFFF]'>
                {pageSizeOptions?.map((item, index) => (
                  <Link
                    onClick={() => setIsToolboxVisible(!isToolboxVisible)}
                    key={index}
                    to={{
                      pathname: path,
                      search: createSearchParams({
                        ...queryConfig,
                        limit: item.toString()
                      }).toString()
                    }}
                    className=' flex items-center  rounded-lg p-2 text-[10px] transition duration-150 ease-in-out hover:bg-[#246CF9] md:text-[16px]'
                  >
                    <div>Display {item} items/page</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
