import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ArrowBottomIcon, RadioIcon, RadioIconActive } from 'src/icons'

export interface Option {
  id: number | string
  ip: string
  icon_url: string
}
interface PopoverSelectProps {
  options: Option[]
  onChange?: (ip: number | string) => void
  value?: string | number
}

const PopoverSelect = ({ options, onChange, value = '' }: PopoverSelectProps) => (
  <div className=''>
    <Listbox
      value={value}
      onChange={(value) => {
        onChange?.(value)
      }}
    >
      <div className='relative'>
        <Listbox.Button className='flex min-w-[200px]  items-center justify-between rounded-[10px] bg-[#1E1F25] p-[13px] text-[#757B8C] '>
          <div className='flex items-center '>
            <img
              className='mr-2 h-[14px] w-[18px] md:mr-3 md:h-[20px] md:w-[28px]'
              src={options.find((o) => o.id === value)?.icon_url}
              alt={options.find((o) => o.id === value)?.icon_url}
            />
            <span className='block truncate text-[10px] md:text-[16px]'>{options.find((o) => o.id === value)?.ip}</span>
          </div>
          <ArrowBottomIcon className='ml-1' />
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='absolute z-10 mt-[12px] w-full overflow-auto rounded-[10px] bg-[#282C38] p-[1px] text-[#FFF] md:w-[260px] md:p-[10px]'>
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className='relative cursor-pointer select-none py-2 pl-[10px] pr-3 md:pr-4'
                value={person.id}
              >
                {({ selected }) => (
                  <div className='flex items-center justify-between '>
                    <button className='flex items-center '>
                      <img
                        className='mr-2 h-[14px] w-[18px] md:mr-3 md:h-[20px] md:w-[28px]'
                        src={person.icon_url}
                        alt='a'
                      />
                      <span className='block truncate text-[10px] md:text-[16px]'>{person.ip}</span>
                    </button>
                    {selected ? (
                      <div className='h-3 w-3 md:h-5 md:w-5'>
                        <RadioIconActive />
                      </div>
                    ) : (
                      <div className='h-3 w-3 md:h-5 md:w-5'>
                        <RadioIcon />
                      </div>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
)
export default PopoverSelect
