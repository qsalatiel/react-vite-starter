import { useQuery, UseQueryResult } from 'react-query'
import { IVestibularYear } from 'src/contracts/question'
import { getRequest } from '@utils/request-handler'

export const useGetVestibularYears = (questionId?: string): UseQueryResult<IVestibularYear[]> => {
  return useQuery(
    ['useGetVestibularYears', questionId],
    () => getRequest.get(`CarregaAnosVestibulares/${questionId}/`),
    { enabled: !!questionId }
  )
}
