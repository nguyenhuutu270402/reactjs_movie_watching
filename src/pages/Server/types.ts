export type SSEMessage = {
  topic: string
  partition: number
  value: {
    topic: string
    display: string
    currentTime: string
    serverIp: string
    publicKey?: string
    endpoint?: string
    receive: number
    sent: number
    lost?: number
    latency?: number
    status?: boolean
  }
}
export type ServerStatistic = Omit<SSEMessage, 'value'> & {
  value: SSEMessage['value'][] | null
}
