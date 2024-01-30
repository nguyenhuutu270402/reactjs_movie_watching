export interface ErrorResponse {
  message: string
  code: string
  result: Boolean
}

export interface SuccessResponse<Data> {
  data: Data
  result: Boolean
}

export interface Phim {
  id: number;
  tenphim: string;
  tenkhac: string;
  image: string;
  tongluotxem: number;
  phan_hoac_chatluong: string;
  thong_tin_tap: string;
  trangthai: number;
  mota: string;
  namphathanh: number;
  sotap: number;
  chatluong: number;
  thoiluong: number;
  dinhdang: number;
  tongtheodoi: number;
  tongdanhgia: number;
  tongbinhluan: number;
  sosaotrungbinh: number;
  ngaycapnhat: string;
  ds_tap: Tap[];
  ds_daodien: DaoDien[];
  ds_dienvien: DienVien[];
  ds_theloai: TheLoai[];
  ds_quocgia: QuocGia[];
}

export interface Tap {
  id: number;
  tentap: string;
  tapso: number;
  idnguoidung_da_xem: number | null;
}

export interface DaoDien {
  id: number;
  tendaodien: string;
}

export interface DienVien {
  id: number;
  tendienvien: string;
}

export interface TheLoai {
  id: number;
  tentheloai: string;
}

export interface QuocGia {
  id: number;
  tenquocgia: string;
}


export interface SuccessResponsePagination<Data> extends SuccessResponse<Data> {
  page: {
    total_count: number
    total_page: number
    current_page: number
    limit: number
  }
}

export type ServerSetting = {
  id: number
  auto_select_location: boolean
  default_server: string
  default_server_id: number
  icon_url: string
  log_type: string
  log_time_limit: string
  report_type: string
  report_time_limit: string
}

export type settingUpdate = Omit<ServerSetting, 'icon_url' | 'id' | 'default_server' | 'location'>

export interface UserListClientConfig {
  page?: number | string
  limit?: number | string
  server_id: number
  active?: boolean
  search_string?: string
  search_relative: boolean | string
}

export interface UserExportClientConfig {
  client_id: string | number
}

export interface UserListLogConfig {
  file_name: string
  server_id: number
}

export interface StartStopConfig {
  server_ip?: number | string
  status?: boolean
  wg_name?: string
}
export type ToggleServerStatus = StartStopConfig & {
  id: number
}

export type GetLossLatencyRes = {
  data: {
    loss: number
    latency: number
  }
}
export type getServerStatisticParams = {
  server_Id: number
  type: 'client' | 'server'
}

export type ResDataKafkaCLientTime = {
  display: string
  currentTime: string | number
  serverIp: string
  publicKey: string
  endpoint: string
}
