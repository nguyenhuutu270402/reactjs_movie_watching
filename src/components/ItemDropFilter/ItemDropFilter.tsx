
import { MouseEvent } from 'react'

type Props = {
    value: string
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    isActive?: boolean
}
function ItemDropFilter({ value, onClick, isActive }: Props) {
    return (
        <button className={`w-[200px] flex justify-start py-[6px] px-[10px] hover:bg-[#272727] outline-none ${isActive === true && "bg-[#272727]"}`} onClick={onClick}>
            <span className='text-white text-[13px] mr-[6px] text-start'>{value}</span>
        </button>
    )
}

export default ItemDropFilter