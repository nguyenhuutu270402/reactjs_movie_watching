import { Listbox, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { ArrowBottom, RadioIcon, RadioIconActive } from 'src/icons'

export interface Option {
  name: string
  id: number | string
  icon_url?: string
}
interface InputRadioProps {
  options: Option[]
  icon?: ReactNode
  onChange?: (id: number | string) => void
  value?: string | number
  disable?: boolean
}

const InputRadio = ({ options, onChange, value = '', disable }: InputRadioProps) => {
  return (
    <div className=' w-full max-w-sm '>
      <Listbox
        value={value}
        onChange={(value) => {
          onChange?.(value)
        }}
      >
        <div className='relative'>
          <Listbox.Button
            aria-disabled={disable}
            className={`flex h-[64px] ${
              disable ? 'cursor-default bg-[#16171C]/40 text-white/40' : 'bg-[#16171C] text-white'
            } w-full items-center justify-between rounded-[20px]  p-[22px] text-sm font-medium `}
          >
            <span className='flex'>
              {options.find((o) => o.id === value)?.icon_url && (
                <img
                  className='h-[20px] w-[28px]'
                  src={options.find((o) => o.id === value)?.icon_url}
                  alt={options.find((o) => o.id === value)?.icon_url}
                />
              )}
              {options.find((o) => o.id === value)?.icon_url ? (
                <span className='ml-2 block truncate'>{options.find((o) => o.id === value)?.name || value}</span>
              ) : (
                <>
                  <span className='ml-2 block truncate text-[#808195]'>
                    {options.find((o) => o.id === value)?.name || value}
                  </span>
                </>
              )}
            </span>
            <div className='h-5 w-5'>
              <ArrowBottom />
            </div>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-10 mt-[12px] w-full overflow-auto rounded-[15px] bg-[#282C38] p-[10px] text-[#FFF]'>
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className='relative cursor-pointer select-none py-2 pl-[10px] pr-4'
                  value={person.id}
                >
                  {({ selected }) => (
                    <div className='flex justify-between'>
                      <span className='block truncate'>{person.name}</span>
                      {selected ? (
                        <div className='h-5 w-5 '>
                          <RadioIconActive />
                        </div>
                      ) : (
                        <div className='h-5 w-5 '>
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
}
export default InputRadio
