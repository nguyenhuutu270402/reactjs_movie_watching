import { differenceInSeconds, parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'

export const ConnectionTime: React.FC<{ time: string | undefined }> = ({ time: initialTime }) => {
  const calculateTimeDifference = (targetTime: string): string => {
    const targetTimeDate = parseISO(targetTime)
    const timeDifferenceInSeconds = differenceInSeconds(new Date(), targetTimeDate)

    const days = Math.floor(timeDifferenceInSeconds / (3600 * 24))
    const hours = Math.floor((timeDifferenceInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)

    return `${days}d ${hours}h ${minutes}m `
  }

  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    if (initialTime) setCurrentTime(calculateTimeDifference(initialTime))
    const interval = setInterval(() => {
      if (initialTime) setCurrentTime(calculateTimeDifference(initialTime))
    }, 1000)

    return () => clearInterval(interval)
  }, [initialTime])
  if (initialTime === undefined) {
    return <></>
  }

  if (initialTime === '0001-01-01T00:00:00Z') {
    return <div>0d 0h 0m</div>
  }

  return <div>{currentTime}</div>
}
