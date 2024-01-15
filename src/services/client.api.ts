import { Client, dataResponse } from 'src/types/user.type'
import {
  GetLossLatencyRes,
  SuccessResponse,
  SuccessResponsePagination,
  UserExportClientConfig,
  UserListClientConfig
} from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_LIST_SERVER_USER = '/v1/server/list-clients'
export const URL_SERVER_USER_DISCONNECT = 'v1/server/user/disconnect'
export const URL_SERVER_USER_BLOCK = 'v1/server/user/block'
export const URL_LIST_USER_EXPORT = '/v1/server/list-clients/export'
export const URL_USER_LOSS_LATENCY = '/v1/user/loss-latency'

const ClientApi = {
  async getListuser(params: UserListClientConfig) {
    const res = await http.get<SuccessResponsePagination<Client[]>>(URL_LIST_SERVER_USER, {
      params
    })
    return res.data
  },
  BlockUser(email: string, server_ip: string, block_status: boolean) {
    return http.post<SuccessResponse<dataResponse>>(URL_SERVER_USER_BLOCK, {
      email,
      server_ip,
      block_status
    })
  },
  DisconnectStatus(email: string, ip: string) {
    return http.post<SuccessResponse<dataResponse>>(URL_SERVER_USER_DISCONNECT, {
      email,
      ip
    })
  },
  getListExport(params: UserExportClientConfig) {
    return http.get<Blob>(URL_LIST_USER_EXPORT, {
      params,
      responseType: 'blob'
    })
  },
  getLossLatency: async (params: { server_id: number; user_id: number }) => {
    const res = await http.get<GetLossLatencyRes>(URL_USER_LOSS_LATENCY, {
      params
    })
    return {
      ...res.data.data,
      id: params.user_id
    }
  }
}

export default ClientApi
