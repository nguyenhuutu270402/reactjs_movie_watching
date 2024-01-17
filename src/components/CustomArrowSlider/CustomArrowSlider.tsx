import React, { MouseEvent } from 'react'
import MainButton from '../MainButton'
import { ArrowBottom, ArrowRightIcon } from 'src/icons'
import FarvoriteIcon from 'src/icons/FarvoriteIcon'
import ArrowLeftIcon from 'src/icons/ArrowLeftIcon'

export enum ArrowType {
    PREVIOUS = 'PREVIOUS',
    NETX = 'NETX',
}

interface Props {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    arrowType: ArrowType.PREVIOUS | ArrowType.NETX
}

function CustomArrowSlider({ onClick, arrowType }: Props) {
    return (
        <MainButton
            className={`bg-[#f17109c1] w-[28px] h-[36px] flex items-center justify-center absolute bottom-[107px] ${arrowType === ArrowType.PREVIOUS ? 'left-0' : 'right-0'}`}
            onClick={onClick}>
            {
                arrowType === ArrowType.PREVIOUS ?
                    <ArrowLeftIcon width={20} height={20} color='white' />
                    :
                    <ArrowRightIcon width={20} height={20} color='white' />
            }
        </MainButton>
    )
}

export default CustomArrowSlider