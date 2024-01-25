import { Phim } from 'src/types/util.type'
import MainButton from '../MainButton'

type Props = {
    data: Phim
    onSelect: (itemId: number) => void
    className?: string
}

function ItemPhim({ data, onSelect, className }: Props) {
    return (
        <MainButton onClick={() => { onSelect }} className={`w-[186px] h-[250px] rounded-[10px] flex relative ${className}`}>
            <img className='w-full h-full rounded-[10px] object-cover' src={data.image} alt="image" />
            <div className='max-w-[100px] bg-[#fed700] flex absolute text-[12px] px-[6px] py-[3px] rounded-br-[10px] rounded-tl-[10px]'>{data.phan_hoac_chatluong}</div>
            <div className='px-[8px] py-[6px] flex flex-col absolute rounded-br-[10px] rounded-bl-[10px] bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.6)]'>
                <span className='truncate text-[#fda22b] text-[14px] text-start'>{data.tenkhac !== '' ? data.tenkhac : data.tenphim}</span>
                <span className='truncate text-[#565b5c] text-[12px] text-start mt-[4px]'>{data.tenphim}</span>
            </div>
            <div className='max-w-[100px] bg-[#fed700] flex absolute bottom-[52px] right-[2px] text-[12px] px-[6px] py-[3px] rounded-[4px]'>{data.thong_tin_tap}</div>
        </MainButton>
    )
}

export default ItemPhim