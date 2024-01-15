import { SuccessResponse } from './util.type'

export type authResponse = SuccessResponse<{
  id: number
  email: string
  matkhau: string
  tennguoidung: string
  avatar: string
  phanquyen: number
}>

export type User = {
  id: number
  email: string
  verified_email: boolean
}
