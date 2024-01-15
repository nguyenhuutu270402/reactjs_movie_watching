import React from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from 'src/components/DatePicker/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/DatePicker/popover'
import { ArrowBottomIcon } from 'src/icons'
import { cn } from 'src/lib/utils'
import { formatDateFr } from 'src/utils/utils'

interface SelectedDates {
  formattedDateFr: string
  formattedDateTo: string
}

interface DatePickerProps {
  setSelectedDates: React.Dispatch<React.SetStateAction<SelectedDates>>
  className?: string
  filterToday?: boolean
}
export function DatePickerWithRange({ setSelectedDates, className, filterToday }: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: filterToday ? new Date() : new Date(2023, 7, 1),
    to: new Date()
  })
  const formattedDateFr: string = formatDateFr(date?.from || new Date())
  const formattedDateTo: string = formatDateFr(date?.to || new Date())
  React.useEffect(() => {
    setSelectedDates({
      formattedDateFr,
      formattedDateTo
    })
  }, [formattedDateFr, formattedDateTo, setSelectedDates])

  return (
    <div
      className={cn(
        ' flex items-center justify-around rounded-[10px] bg-[#1E1F25] p-3 text-[16px] text-[#757B8C]',
        className
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button
            id='date'
            className={cn(
              'flex w-full  min-w-[200px] items-center rounded-[10px] bg-[#1E1F25] text-[#757B8C]',
              !date && ''
            )}
          >
            <span className='mr-2'>
              {date?.from && date?.to
                ? formatDateFr(date.from) === formatDateFr(date.to)
                  ? 'Today'
                  : `${formatDateFr(date.from)} - ${formatDateFr(date.to)}`
                : 'Pick a date'}
            </span>
            <div className='ml-auto'>
              <ArrowBottomIcon />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className=' w-auto' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
