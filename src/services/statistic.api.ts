import { statistic } from 'src/types/statistic.type'
import { StatisConfig } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/util.type'
import http from 'src/utils/http'

export const URL_LIST_STATISTIC = '/v1/server/statistic'

const StatisticApi = {
  getListuserStatistic(params: StatisConfig) {
    return http.get<SuccessResponse<statistic>>(URL_LIST_STATISTIC, {
      params
    })
  }
}

export default StatisticApi
