import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import { Key, TableHTMLAttributes } from 'react'
import { CheckBoxIcon, CheckBoxIconActive, NotFoundIcon } from 'src/icons'
import { cn } from 'src/lib/utils'

import { ColumnsType } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableProps<RecordType = Record<Key, unknown>> = TableHTMLAttributes<HTMLTableElement> & {
  columns: ColumnsType<RecordType>
  dataSource?: RecordType[]
  bordered?: boolean
  sticky?: boolean
  size?: 'small' | 'default'
  rowSelection?: {
    onChange: (selectedRowKeys: Key[]) => void
    selectedRowKeys?: Key[]
  }
}
export const Table = <RecordType extends Record<Key, unknown>>({
  columns,
  dataSource,
  className,
  bordered,
  size,
  sticky,
  rowSelection,
  ...rest
}: TableProps<RecordType>) => {
  const columnsMerged = [
    ...(rowSelection
      ? ([
          {
            title:
              isEqual(
                dataSource?.map((data) => {
                  return data.id
                }),
                rowSelection.selectedRowKeys
              ) &&
              dataSource &&
              dataSource.length > 0 ? (
                <CheckBoxIconActive
                  className='cursor-pointer'
                  onClick={() => {
                    if (rowSelection.selectedRowKeys) {
                      rowSelection.onChange([])
                    }
                  }}
                />
              ) : (
                <CheckBoxIcon
                  className='cursor-pointer'
                  onClick={() => {
                    if (rowSelection.selectedRowKeys) {
                      const arr = dataSource?.map((data) => {
                        return data.id
                      })
                      if (arr) {
                        rowSelection.onChange(arr.filter((a) => a) as Key[])
                      }
                    }
                  }}
                />
              ),
            width: 30,
            render: (r: any) =>
              rowSelection?.selectedRowKeys?.includes(r['id']) ? (
                <CheckBoxIconActive
                  className='cursor-pointer'
                  onClick={() => {
                    if (rowSelection.selectedRowKeys && r['id']) {
                      const updatedSelectedRowKeys = rowSelection.selectedRowKeys.filter((key) => key !== r['id'])
                      rowSelection.onChange(updatedSelectedRowKeys)
                    }
                  }}
                />
              ) : (
                <CheckBoxIcon
                  className='cursor-pointer'
                  onClick={() => {
                    if (rowSelection.selectedRowKeys && r['id']) {
                      const arr = dataSource?.map((data) => {
                        return data.id
                      })
                      if (rowSelection.selectedRowKeys.length + 1 === arr?.length) {
                        rowSelection.onChange(arr as Key[])
                      } else {
                        rowSelection.onChange([...rowSelection.selectedRowKeys, r['id']])
                      }
                    }
                  }}
                />
              )
          }
        ] as ColumnsType<RecordType>)
      : []),
    ...columns
  ]
  return (
    <table
      className={cn(
        'w-full',
        'border-separate border-spacing-0 rounded-[20px] bg-[#1E1F25] pb-4',
        className?.trim() || ''
      )}
      {...rest}
    >
      {columnsMerged.some((column) => column.width) && (
        <colgroup>
          {columnsMerged.map(({ width }, idx) => (
            <col key={idx} {...(width ? { style: { width: width } } : {})} />
          ))}
        </colgroup>
      )}
      <thead className={classNames(sticky ? 'sticky top-0 ' : '')}>
        <tr>
          {columnsMerged.map(({ title, align, className = '' }, idx) => (
            <th
              key={idx}
              scope='col'
              className={classNames(
                className,
                align === 'center' ? 'text-center' : '',
                align === 'right' ? 'text-right' : '',
                'text-left text-xs font-semibold text-[#FFF] 2xl:text-sm',
                bordered ? 'border-r last:border-r-0' : '',
                !size || size === 'default' ? 'p-4' : '',
                size === 'small' ? 'p-4' : ''
              )}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataSource && dataSource.length > 0 ? (
          dataSource.map((item, index) => (
            <tr className='bg-[#282C38]' key={`table-row-${index}`}>
              {columnsMerged.map((column, idx) => (
                <td
                  key={idx}
                  className={classNames(
                    column.align === 'center' ? 'text-center' : '',
                    column.align === 'right' ? 'text-right' : '',
                    ' text-xs font-semibold text-[#757B8C] 2xl:text-sm',

                    // index !== dataSource.length - 1 ? 'border-b' : '', // remove border bottom if is last item
                    // bordered ? 'border-r last:border-r-0' : '',
                    index === dataSource.length ? '' : 'border-b-[19px] border-[#1E1F25]',
                    !size || size === 'default' ? 'p-4' : '',
                    size === 'small' ? 'px-4' : ''
                  )}
                >
                  {column.render ? column.render(item, index) : column.dataIndex ? <>{item[column.dataIndex]}</> : null}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className='h-40 text-center text-xs text-[#FFF]' colSpan={columnsMerged.length}>
              <NotFoundIcon className='mx-auto h-5 w-5 text-white' />
              <div className='mt-2'>Data Not Found</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
