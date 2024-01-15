import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ArrowLeftIconPagination, ArrowRightIconPaginate } from 'src/icons'

import PaginationLeft from './PaginationLeft/PaginationLeft'

interface Props {
  currentPage?: number
  queryConfig: QueryConfig
  pageSize: number
  path: string
  totalCountPage?: number
  pageSizeOptions?: number[]
}

const RANGE = 2
export default function Pagination({ currentPage, queryConfig, pageSize, path, pageSizeOptions }: Props) {
  const page = currentPage ?? Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='ml-[5px]  rounded-[14px] border border-[#303A46] bg-[#161D26] px-[12px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-5 md:py-3 md:text-[16px]'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='ml-[5px]  rounded-[14px] border border-[#303A46] bg-[#161D26] px-[12px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-5 md:py-3 md:text-[16px]'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 2) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE - 1) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 2) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'ml-[5px] cursor-pointer rounded-[14px] border border-[#303A46] bg-[#161D26] px-[14px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-5 md:py-3 md:text-[16px]',
              {
                'bg-[#246CF9]': pageNumber === page,
                '': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className=' mt-2 flex flex-wrap items-center justify-between gap-2 md:mt-6'>
      <PaginationLeft path={path} pageSizeOptions={pageSizeOptions} queryConfig={queryConfig} pageSize={pageSize} />
      <div className='flex flex-wrap justify-center'>
        {page === 1 ? (
          <span className='flex cursor-not-allowed items-center justify-center rounded-[14px] border border-[#303A46] bg-[#161D26] px-[10px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-4 md:py-3 md:text-[16px]'>
            <div className=' h-[14px] w-[14px] md:h-[20px] md:w-[20px]'>
              <ArrowLeftIconPagination />
            </div>
          </span>
        ) : (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: (page - 1).toString()
              }).toString()
            }}
            className='flex items-center justify-center rounded-[14px] border border-[#303A46] bg-[#161D26] px-[10px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-4 md:py-3 md:text-[16px]'
          >
            <div className=' h-[14px] w-[14px] md:h-[20px] md:w-[20px]'>
              <ArrowLeftIconPagination />
            </div>
          </Link>
        )}

        {renderPagination()}
        {page === pageSize ? (
          <span className='ml-[5px] flex cursor-not-allowed items-center justify-center rounded-[14px] border border-[#303A46] bg-[#161D26] px-[10px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-4 md:py-3 md:text-[16px]'>
            <div className=' h-[14px] w-[14px] md:h-[20px] md:w-[20px]'>
              <ArrowRightIconPaginate />
            </div>
          </span>
        ) : (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: (page + 1).toString()
              }).toString()
            }}
            className='ml-[5px] flex items-center justify-center rounded-[14px] border border-[#303A46] bg-[#161D26] px-[10px] py-2 text-[10px] text-[#FFF] shadow-sm md:rounded-[20px] md:px-4 md:py-3 md:text-[16px]'
          >
            <div className='h-[14px] w-[14px] md:h-[20px] md:w-[20px] '>
              <ArrowRightIconPaginate />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
