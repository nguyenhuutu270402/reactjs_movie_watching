import MainButton from "../MainButton"
import { Tap } from 'src/types/util.type'

type Props = {
    data: Tap
    onSelect: (itemId: number) => void
    className?: string
}

function ItemTap({ data, onSelect, className }: Props) {
    return (
        <MainButton onClick={() => onSelect(data.id)}>
            <div className={`text-white text-[13px] font-bold bg-[#243d5f] py-[2px] px-[8px] rounded-[3px] ${className}`}>{data.tentap}</div>
        </MainButton>
    )
}

export default ItemTap