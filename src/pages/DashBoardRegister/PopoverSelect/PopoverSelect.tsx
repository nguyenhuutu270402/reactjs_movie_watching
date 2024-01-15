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
        <Listbox.Button className='flex min-w-[200px]  items-center justify-between rounded-[10px] bg-[#1E1F25] p-3 text-[#757B8C]'>
          <div className='flex items-center hover:text-[#246CF9]'>
            <img className='mr-3 h-[20px] w-[28px]' src={options.find((o) => o.id === value)?.icon_url} alt='a' />
            <span className='block truncate'>{options.find((o) => o.id === value)?.ip}</span>
          </div>
          <ArrowBottomIcon className='ml-1' />
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='absolute z-10 mt-[12px] w-[260px] overflow-auto rounded-[15px] bg-[#282C38] p-[10px] text-[#FFF]'>
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className='relative cursor-pointer select-none py-2 pl-[10px] pr-4'
                value={person.id}
              >
                {({ selected }) => (
                  <div className='flex justify-between'>
                    <button className='flex items-center hover:text-[#246CF9]'>
                      <img className='mr-3 h-[20px] w-[28px]' src={person.icon_url} alt='a' />
                      <span className='block truncate'>{person.ip}</span>
                    </button>
                    {selected ? (
                      <div>
                        <RadioIconActive />
                      </div>
                    ) : (
                      <div>
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
