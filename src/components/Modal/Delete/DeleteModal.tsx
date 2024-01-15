import { createPortal } from 'react-dom'
import { ImageDelete } from 'src/icons'
import CloseICon from 'src/icons/CloseIcon'

interface DeleteModalProps {
  visible: number | undefined
  ok: () => void
  cancel: () => void
}

const root = document.getElementById('root') as HTMLElement

export default function DeleteModal({ visible, ok, cancel }: DeleteModalProps) {
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
          <h1 className='ml-8'>Confirmation</h1>
          <button onClick={handleCancel} className='relative right-[-102px] rounded-[14px] bg-[#16171C] p-1'>
            <CloseICon />
          </button>
        </div>
        <div className='mt-[16px] h-[1px] bg-[#31343C]'></div>
        <div className='mt-4 flex items-center justify-center'>
          <ImageDelete />
        </div>
        <div className='mt-2'>Are you sure want to delete </div>
        <div>this user?</div>
        <div className='flex items-center justify-center'>
          <button
            onClick={handleCancel}
            className='mt-[15px]  rounded-[25px] bg-[#16171C] px-[56px] py-[19px] text-[14px] font-normal'
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className='ml-[15px]  mt-[15px] rounded-[25px] bg-[#246CF9] px-[56px] py-[19px] text-[14px] font-normal'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    root
  )
}
