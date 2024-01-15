export type user = {
  bandwidth_usage: string
  icon_server: string
  id: number
  email: string
  full_name: string
  first_name: string
  last_name: string
  verified_email: boolean
  status: boolean
  server_ip: string
  server?: string
  connect_time?: string
  ip_wifi: string
  ip_cellular: string
}

export interface UserListConfig {
  page?: number | string
  limit?: number | string
  total_count?: number | string
  create_end_time?: string
  create_start_time?: string
  search_string?: string
  status?: boolean
  search_relative?: boolean
}

export interface UserListServerConfig {
  page?: number | string
  limit?: number | string
  total_count?: number | string
}

export interface StatisConfig {
  create_end_time?: string
  create_start_time?: string
  id: number | string
}

export interface ListLogConfig {
  page?: number | string
  limit?: number | string
  server_id?: number | string
  end_time?: string
  start_time?: string
}

export interface userEdit {
  id?: number
  created_at: string
  email: string
  username: string
  full_name: string
  last_name: string
  first_name: string
  ip_wifi: string
  ip_cellular: string
}

export interface dataResponse {
  data: string
}

export type Server = {
  id: number
  name: string
  describe: string
  ip: string
  address: string
  dns: string
  port: string
  status: boolean
  icon_url: string
  data_sent: number
  data_received: number
}

export type Client = {
  id: number
  user_id: number
  email: string
  device_id: string
  server_name: string
  icon_url: string
  connection_time: string
  server_ip: string
  bandwidth: number
  status: boolean
  loss: number
  latency: number
  public_key?: string
  ServerIp?: string | number
  time_start_wifi: string
  time_start_cellular: string
  user_ip_cellular?: string | number
  user_ip_wifi?: string | number
}
