import MainButton from '../MainButton'

type Props = {
    // data: log
    // onSelect: (itemId: number) => void
    className?: string
}

function ItemPhim({ className }: Props) {
    return (
        <MainButton onClick={() => { }} className={`w-[186px] h-[250px] rounded-[10px] flex relative ${className}`}>
            <img className='w-[186px] h-[250px] rounded-[10px] object-cover' src={"https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg"} alt="image" />
            <div className='max-w-[100px] bg-[#fed700] flex absolute text-[12px] px-[6px] py-[3px] rounded-br-[10px] rounded-tl-[10px]'>Bản mở rộng</div>
            <div className='px-[8px] py-[6px] flex flex-col absolute rounded-br-[10px] rounded-bl-[10px] bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.6)]'>
                <span className='truncate text-[#fda22b] text-[14px] text-start'>Nguời Nhện: Không còn nhà</span>
                <span className='truncate text-[#565b5c] text-[12px] text-start mt-[4px]'>Spider-Man: No Way Home</span>
            </div>
            <div className='max-w-[100px] bg-[#fed700] flex absolute bottom-[52px] right-[2px] text-[12px] px-[6px] py-[3px] rounded-[4px]'>Phụ đề</div>
        </MainButton>
    )
}

export default ItemPhim