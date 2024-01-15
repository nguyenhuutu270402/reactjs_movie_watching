import { useEffect, useState } from 'react'
import SearchIcon from 'src/icons/SearchIcon'

interface InputProps {
  onSearch: (value: string) => void
  onPaster: (value: string) => void
  className?: string
  classNameIcon?: string
  classNameForm?: string
}

const Input = ({ onSearch, onPaster, className, classNameIcon, classNameForm }: InputProps) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isPasTer, setIsPasTer] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(e.target.value)
    if (isPasTer) {
      setIsPasTer(false)
    } else {
      setSearchValue(value)
      onSearch(value)
    }
  }
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text')
    onPaster(pastedText)
    setIsPasTer(true)
  }

  useEffect(() => {
    const handlePasteAnywhere = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData('text') || ''
      onPaster(pastedText)
      setIsPasTer(true)
    }

    window.addEventListener('paste', handlePasteAnywhere)

    return () => {
      window.removeEventListener('paste', handlePasteAnywhere)
    }
  }, [onPaster])
  return (
    <form className={classNameForm}>
      <div className={classNameIcon}>
        <SearchIcon />
      </div>
      <input
        value={searchValue}
        onPaste={handlePaste}
        onChange={handleInputChange}
        className={className}
        placeholder='Enter your keyword'
      />
    </form>
  )
}

export default Input
