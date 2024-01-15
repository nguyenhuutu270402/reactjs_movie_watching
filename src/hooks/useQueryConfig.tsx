import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { UserListConfig } from 'src/types/user.type'

import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof UserListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 10
    },
    isUndefined
  )
  return queryConfig
}
