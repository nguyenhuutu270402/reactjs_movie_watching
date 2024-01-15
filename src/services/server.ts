import { ServerStatistic } from 'src/pages/Server/types'
import { Server, UserListServerConfig } from 'src/types/user.type'
import {
  ErrorResponse,
  ServerSetting,
  SuccessResponse,
  SuccessResponsePagination,
  ToggleServerStatus,
  getServerStatisticParams,
  settingUpdate
} from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_LIST_USER_SERVER = 'v1/servers'
export const URL_SETTING_ID = 'v1/server'
export const URL_SERVER_USER_ID = '/v1/server'
export const URL_SETTING_SERVER = 'v1/server/settings'
export const URL_SERVER_START_STOP = '/v1/server/start-stop'
export const URL_SERVER_STATISTIC_SERVER = '/v1/server/statistic_server'

const serversService = {
  get: async (params: UserListServerConfig) => {
    const res = await http.get<SuccessResponsePagination<Server[]>>(URL_LIST_USER_SERVER, {
      params
    })
    return res.data
  },
  getById: async (id: number) => {
    const res = await http.get<SuccessResponse<Server>>(`${URL_SERVER_USER_ID}/${id}`)
    return res.data
  },
  getServerSetting: async () => {
    const res = await http.get<SuccessResponse<Omit<ServerSetting, 'default_server_id'>>>(`${URL_SETTING_SERVER}`)
    return res.data
  },

  updateSetting(data: Partial<settingUpdate>) {
    return http.patch<SuccessResponse<ServerSetting>>(`${URL_SETTING_SERVER}`, data)
  },
  toggleStatus({ id, ...params }: ToggleServerStatus) {
    return http.patch<ErrorResponse>(`${URL_SERVER_START_STOP}/${id}`, params)
  },
  getStatisticServer: async (params: getServerStatisticParams) => {
    const res = await http.get<SuccessResponse<ServerStatistic>>(URL_SERVER_STATISTIC_SERVER, {
      params
    })
    return res.data
  }
}

export default serversService
