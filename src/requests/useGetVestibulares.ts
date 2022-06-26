import { useQuery, UseQueryResult } from 'react-query'
import { IVestibular } from 'src/contracts/question'
import { getRequest } from '@utils/request-handler'

export const useGetVestibulares = (questionId?: string): UseQueryResult<IVestibular[]> =>
  useQuery(
    ['useGetVestibulares', questionId],
    () => getRequest.get(`CarregaVestibulares/${questionId}`),
    { enabled: !!questionId }
  )
