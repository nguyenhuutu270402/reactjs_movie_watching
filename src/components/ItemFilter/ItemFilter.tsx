import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ReactNode } from 'react'
import { ArrowBottom } from 'src/icons'

type Props = {
    value: string
    children?: ReactNode;
}
function ItemFilter({ value, children }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px] transition-opacity hover:opacity-50 outline-none' onClick={() => { }}>
                    <span className='text-white text-[13px] mr-[6px]'>{value}</span>
                    <ArrowBottom width={16} height={16} color='white' />
                </button>
            </PopoverTrigger>
            <PopoverContent className='w-min max-h-[200px] overflow-auto p-[0px] bg-[#202025] border-none rounded-[2px] z-10 mt-[6px]'>
                {children}
            </PopoverContent>
        </Popover>
    )
}

export default ItemFilter