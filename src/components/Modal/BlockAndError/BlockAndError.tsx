import { createPortal } from 'react-dom'
import CloseICon from 'src/icons/CloseIcon'

interface DeleteModalProps {
  visible: string | null
  ok: () => void
  cancel: () => void
  image: JSX.Element
  title_one: string
  title_two: string
  name: string
  note: string
}

const root = document.getElementById('root') as HTMLElement

export default function BlockAndError({
  visible,
  ok,
  cancel,
  image,
  title_two,
  title_one,
  name,
  note
}: DeleteModalProps) {
  const handleOk = () => {
    ok()
  }

  const handleCancel = () => {
    cancel()
  }

  return createPortal(
    <div className={`z-[1200] ${visible ? 'block' : 'hidden'}`}>
      <div className=' fixed inset-0 z-[100] bg-black opacity-50'></div>
      <div className='fixed left-1/2 top-1/2 z-[110] min-h-[400px]  w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[38px] bg-[#1D1F25] p-4 text-center text-[#FFF] shadow-lg'>
        <div className='mt-2 flex items-center justify-center'>
          <h1 className='ml-8'>{name}</h1>
          <button onClick={handleCancel} className='relative right-[-100px] rounded-[14px] bg-[#16171C] p-1'>
            <CloseICon />
          </button>
        </div>
        <div className='mt-[16px] h-[1px] bg-[#31343C]'></div>
        <div className='mt-4 flex items-center justify-center'>{image}</div>
        <div className='mt-2'>{title_one}</div>
        <div>{title_two}</div>
        <span className='mt-2 block text-[16px] font-normal text-[#A4A8AB]'>{note}</span>
        <div className='flex items-center justify-center'>
          <button
            onClick={handleCancel}
            className='mt-[15px] min-w-[180px] rounded-[25px] bg-[#16171C] px-[65px] py-[19px] text-[14px] font-normal'
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className='ml-[15px] mt-[15px] min-w-[180px] rounded-[25px] bg-[#246CF9] px-[65px] py-[19px] text-[14px] font-normal'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    root
  )
}
