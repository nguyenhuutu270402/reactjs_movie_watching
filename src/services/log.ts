import { log } from 'src/types/log.type'
import { ListLogConfig } from 'src/types/user.type'
import { SuccessResponse, SuccessResponsePagination, UserListLogConfig } from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_LIST_LOG = '/v1/server/logs'
export const URL_LIST_LOG_EXPORT = '/v1/server/export-logs'

const LogApi = {
  getListlog(params: ListLogConfig) {
    return http.get<SuccessResponsePagination<log[]>>(URL_LIST_LOG, {
      params
    })
  },
  getListLogExport(params: UserListLogConfig) {
    return http.get<SuccessResponse<string>>(URL_LIST_LOG_EXPORT, {
      params
    })
  }
}

export default LogApi
