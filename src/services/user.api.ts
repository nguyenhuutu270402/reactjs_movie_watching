import { UserListConfig, dataResponse, user, userEdit } from 'src/types/user.type'
import { SuccessResponse, SuccessResponsePagination } from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_LIST_USER = 'v1/user/list-users'
export const URL_LIST_USER_EXPORT = '/v1/user/list-users/export'
export const URL_USER_EDIT = 'v1/user'
export const URL_USER_DELETE = '/v1/user/delete'
export const URL_USER_UPDATE_STATUS = '/v1/user/suspend'

const UserApi = {
  getListuser(params: UserListConfig) {
    return http.get<SuccessResponsePagination<user[]>>(URL_LIST_USER, {
      params
    })
  },
  getUser(id: string) {
    return http.get<SuccessResponse<userEdit>>(`${URL_USER_EDIT}/${id}`)
  },
  deleteUser(id: number) {
    return http.delete<SuccessResponse<dataResponse>>(`${URL_USER_DELETE}/${id}`)
  },
  updateStatus(id: number, status: boolean) {
    return http.patch<SuccessResponse<dataResponse>>(`${URL_USER_UPDATE_STATUS}/${id}`, {
      status
    })
  },
  getListExport(params: UserListConfig) {
    return http.get<Blob>(URL_LIST_USER_EXPORT, {
      params,
      responseType: 'blob'
    })
  }
}

export default UserApi
