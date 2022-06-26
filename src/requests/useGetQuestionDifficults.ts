import { useQuery, UseQueryResult } from 'react-query'
import { IDifficultLevels } from 'src/contracts/question'
import { getRequest } from '@utils/request-handler'

export const useGetQuestionDifficults = (questionId?: string): UseQueryResult<IDifficultLevels[]> =>
  useQuery(
    ['useGetQuestionDifficults', questionId],
    () => getRequest.get(`CarregaDificuldades/${questionId}`),
    { enabled: !!questionId }
  )
