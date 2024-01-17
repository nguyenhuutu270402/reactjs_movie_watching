import { MouseEvent, ReactNode } from 'react'

interface MainButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    className?: string
    children?: ReactNode;
}

function MainButton({ onClick, className, children }: MainButtonProps) {
    return (
        <button onClick={onClick} className={`transition-opacity hover:opacity-50 ${className}`}>
            {children}
        </button>
    )
}

export default MainButton