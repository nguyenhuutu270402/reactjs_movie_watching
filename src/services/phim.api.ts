import { Phim, SuccessResponse } from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_GET_ALL_PHIM = '/api/get-all-phim'
export const URL_GET_TOP_10_PHIM = '/api/get-top-10-phim'

const phimApi = {
    getAllPhim: async () => {
        const res = await http.get<SuccessResponse<Phim[]>>(URL_GET_ALL_PHIM, {
        })
        return res.data
    },
    getTop10Phim: async () => {
        const res = await http.get<SuccessResponse<Phim[]>>(URL_GET_TOP_10_PHIM, {
        })
        return res.data
    },
    getOnePhim: async (idPhim: number, idNguoiDung: number) => {
        const res = await http.get<SuccessResponse<Phim>>(`/api/get-one-phim-by-id/${idPhim}/${idNguoiDung}`, {
        })
        return res.data
    },
}

export default phimApi
