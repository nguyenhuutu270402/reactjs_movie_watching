import { createPortal } from 'react-dom'
import { ArrowBottom, ImageDelete, PasswordIcon } from 'src/icons'
import CloseICon from 'src/icons/CloseIcon'

interface SuspendModalProps {
  visible: number | undefined
  ok: () => void
  cancel: () => void
}

const root = document.getElementById('root') as HTMLElement

export default function SuspendModal({ visible, ok, cancel }: SuspendModalProps) {
  const handleOk = () => {
    ok()
  }

  const handleCancel = () => {
    cancel()
  }

  return createPortal(
    <div className={`z-[1200] ${visible ? 'block' : 'hidden'}`}>
      <div className=' fixed inset-0 z-[100] bg-black opacity-50'></div>
      <div className='fixed left-1/2 top-1/2 z-[110] min-h-[467px]  w-[387px] -translate-x-1/2 -translate-y-1/2 rounded-[38px] bg-[#1D1F25] p-4 text-center text-[#FFF] shadow-lg'>
        <div className='mt-2 flex items-center justify-center'>
          <h1 className='ml-8'>Confirmation</h1>
          <button onClick={handleCancel} className='relative right-[-96px] rounded-[14px] bg-[#16171C] p-1'>
            <CloseICon />
          </button>
        </div>
        <div className='mt-[16px] h-[1px] bg-[#31343C]'></div>
        <div className='mt-4 flex items-center justify-center'>
          <ImageDelete />
        </div>
        <div className='mt-2'>Are you sure want to suspend</div>
        <div>this user?</div>
        <span className='block  text-[16px] font-normal text-[#A4A8AB]'>Please fill in the reason below</span>
        <div className='mt-[10px]'>
          <div className='relative flex items-center rounded-[25px] bg-[#282B32] '>
            <span className='absolute left-[20px] top-[20px] mx-auto text-2xl'>
              <PasswordIcon />
            </span>
            <div className='flex h-[64px] w-full cursor-default appearance-none items-center rounded-[25px] bg-[#282B32] pl-[72px] pr-4 text-white outline-none  placeholder:text-gray-500'>
              <div className='text-[#808195]'>Violation of terms of services</div>
            </div>
            <span className='absolute right-[20px] top-[22px] mx-auto w-5 cursor-default text-2xl'>
              <ArrowBottom />
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            onClick={handleCancel}
            className='mt-[15px] min-w-[170px] rounded-[25px] bg-[#16171C] px-[65px] py-[19px] text-[14px] font-normal'
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className='ml-[15px] mt-[15px] min-w-[170px] rounded-[25px] bg-[#246CF9] px-[65px] py-[19px] text-[14px] font-normal'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    root
  )
}
