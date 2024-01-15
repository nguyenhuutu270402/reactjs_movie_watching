import http from 'src/utils/http'

import { authResponse } from '../types/auth.type'

export const URL_LOGIN = '/api/login'
export const URL_RESET_PASSWORD = '/v1/user/reset-password'

const authApi = {
  async login(body: { email: string; matkhau: string }) {

    const res = await http.post<authResponse>(URL_LOGIN, body)
    console.log(`>>>>> ${res}`)
    return res
  },
  resetPassword(id: number) {
    return http.patch<{ message: string; code: string }>(`${URL_RESET_PASSWORD}/${id}`)
  }
}

export default authApi
