import * as Popover from '@radix-ui/react-popover'
import React, { useState } from 'react'
import ActionIcon from 'src/icons/ActionIcon'
import ArrowBottomPopover from 'src/icons/ArrowBottomPopover'

interface Props {
  renderPopover?: React.ReactNode
}

const PopoverDemo = ({ renderPopover }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Popover.Root>
      <Popover.Trigger onClick={() => setIsPopoverOpen(true)} asChild>
        <button className='flex cursor-pointer items-center justify-center px-4 text-[#757B8C] hover:text-[#246CF9] focus:text-[#246CF9]  md:px-2'>
          <ActionIcon />
        </button>
      </Popover.Trigger>
      {isPopoverOpen && (
        <Popover.Portal>
          <Popover.Content
            className='inline-flex  min-w-[168px] flex-col items-start gap-[10px] rounded-[15px] bg-[#282C38] px-[16px] py-[13px]'
            sideOffset={0}
            onClick={() => setIsPopoverOpen(false)}
          >
            {renderPopover}

            <Popover.Arrow asChild>
              <span className=' translate-y-[-20px]'>
                <ArrowBottomPopover />
              </span>
            </Popover.Arrow>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  )
}

export default PopoverDemo
