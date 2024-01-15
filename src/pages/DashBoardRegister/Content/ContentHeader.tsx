import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'src/components/Button'
import CardUser from 'src/components/CardUser'
import { DatePickerWithRange } from 'src/components/DatePicker/range-date-picker'
import Input from 'src/components/Input/Input'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import NotFoundIcon from 'src/icons/NotFoundIcon'
import UserApi from 'src/services/user.api'
import { UserListConfig } from 'src/types/user.type'
import path from 'src/utils/path'

interface Props {
  nameKey: string
  status: boolean
}
export default function ContentHeader({ nameKey, status }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ispaster, setIsPaster] = useState(false)
  const [selectedDates, setSelectedDates] = useState<{
    formattedDateFr: string
    formattedDateTo: string
  }>({
    formattedDateFr: '',
    formattedDateTo: ''
  })
  const queryConfig = useQueryConfig()
  const [searchValue, setSearchValue] = useState('')

  const resetPagination = () => {
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleSearch = (value: string) => {
    resetPagination()
    setSearchValue(value.trim())
    setIsPaster(false)
  }

  const handleSearchOnpaster = (value: string) => {
    resetPagination()
    setSearchValue(value.trim())
    setIsPaster(true)
  }
  const { data: usersData } = useQuery({
    queryKey: [nameKey, { queryConfig, searchValue, selectedDates }],
    queryFn: async () => {
      return UserApi.getListuser({
        status: status,
        create_start_time: selectedDates.formattedDateFr,
        create_end_time: selectedDates.formattedDateTo,
        search_string: searchValue || null,
        search_relative: ispaster === true ? true : null,
        ...queryConfig
      } as UserListConfig).then((res) => {
        searchParams.set('page', res.data.page.current_page.toString())
        setSearchParams(searchParams)
        return res
      })
    },
    keepPreviousData: true
  })
  const dataUserRegister = usersData?.data.data

  const handleExport = () => {
    UserApi.getListExport({
      status: status,
      search_string: searchValue,
      create_start_time: selectedDates.formattedDateFr,
      create_end_time: selectedDates.formattedDateTo
    }).then((res) => {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(res.data)
      link.download = res.headers['content-disposition'].replace(/^attachment; filename=/, '')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
  return (
    <div className='pb-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='col-span-12 sm:col-span-4'></div>
        <div className='flex flex-wrap gap-[20px]'>
          <DatePickerWithRange className='w-full md:w-auto' setSelectedDates={setSelectedDates} />
          <Input
            onPaster={handleSearchOnpaster}
            onSearch={handleSearch}
            classNameIcon='mr-[10px] h-5 w-5'
            classNameForm='w-full md:w-auto flex items-center justify-around rounded-[10px] bg-[#1E1F25] p-3 text-[#757B8C]'
            className='grow border-none bg-transparent text-[#757B8C] outline-none'
          />
          <Button
            label='Export'
            onClick={handleExport}
            classNameIcon='mr-[10px] h-6 w-6'
            className='inline-flex w-full items-center justify-center rounded-[16px] bg-[#246CF9] px-[16px] py-[13px] text-[#FFFFFF] md:w-auto'
          />
        </div>
      </div>
      {dataUserRegister && dataUserRegister?.length >= 1 ? (
        <>
          <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4'>
            {dataUserRegister && dataUserRegister.map((user) => <CardUser user={user} key={user.id} />)}
          </div>
        </>
      ) : (
        <div className='absolute right-[50%] top-[50%] flex translate-x-[50%] flex-col items-center text-white'>
          <NotFoundIcon className='h-5 w-5 text-white' />
          <div className='mt-2 text-center'>Data Not Found</div>
        </div>
      )}

      <div>
        {usersData?.data.page && dataUserRegister && dataUserRegister.length > 0 && (
          <Pagination
            currentPage={usersData?.data.page.current_page}
            pageSizeOptions={[10, 20, 50, 100]}
            path={path.registerUser}
            queryConfig={queryConfig}
            pageSize={usersData?.data.page.total_page}
          />
        )}
      </div>
    </div>
  )
}
