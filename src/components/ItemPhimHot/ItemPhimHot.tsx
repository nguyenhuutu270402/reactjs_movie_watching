import { Phim } from 'src/types/util.type'
import MainButton from '../MainButton'

type Props = {
    data: Phim
    onSelect: (itemId: number) => void
    className?: string
}
function ItemPhimHot({ data, onSelect, className }: Props) {
    return (
        <MainButton onClick={() => { onSelect(data.id) }} className={`flex w-full flex-row ${className}`}>
            <img className='w-[75px] h-[95px] object-cover rounded-[5px]' src={data.image} alt={data.tenphim} />
            <div className='flex flex-col flex-1 ml-[16px]'>
                <span className='line-clamp-2 text-start text-[14px] font-bold text-white'>{data.tenkhac !== '' ? `${data.tenkhac} - ${data.tenphim}` : data.tenphim}</span>
                <span className='line-clamp-1 text-start text-[#565b5c] text-[12px] mt-[4px]'>{data.tenphim}</span>
                <span className='line-clamp-1 text-start text-[#fda22b] text-[13px] mt-[4px]'>{data.tongluotxem} lượt xem</span>
            </div>
        </MainButton>
    )
}

export default ItemPhimHot