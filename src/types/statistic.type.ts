export type statistic = {
  id: number
  ip: string
  address: string
  current_active_connect: number
  active_connect: {
    time: string
    connections: number
  }[]
  bandwidth_usage: {
    time: string
    bandwidth: number
  }[]
}
