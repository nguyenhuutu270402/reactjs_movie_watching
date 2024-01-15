import moment from 'moment'

export function formatDateFr(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function formatDateStatitis(inputTime: string): string {
  const parsedTime = new Date(inputTime)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  if (!isNaN(parsedTime.getTime())) {
    const outputTime: string = parsedTime.toLocaleDateString('en-US', options)
    return outputTime
  }
  return ''
}

export const convertTimeStringToMinutes = (timeString: string | undefined): string => {
  if (timeString === undefined) {
    return ''
  }

  const timeMoment = moment(timeString)
  const totalMinutes = timeMoment.diff(moment(timeString).startOf('day'), 'minutes')

  if (totalMinutes >= 1440) {
    const days = Math.floor(totalMinutes / 1440)
    const remainingMinutes = totalMinutes % 1440
    return `${days}d ${remainingMinutes}m`
  } else if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60
    return `${hours}h ${remainingMinutes}m`
  } else {
    return totalMinutes + 'm'
  }
}

export const convertTimeString = (inputTimeStr: string): string => {
  const inputTime = new Date(inputTimeStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  }

  const outputTimeStr: string = inputTime
    .toLocaleDateString('en-US', options)
    .replace(/(\d+)\/(\d+)\/(\d+), /, '$3-$1-$2 ')
  return outputTimeStr
}

export function byteToGb(bytes: number): number {
  return Number((bytes / (1024 * 1024 * 1024)).toFixed(2))
}
export function kbToMb(kilobytes: number): number {
  const megabytes = kilobytes / 1024
  return Number(megabytes.toFixed(2))
}
