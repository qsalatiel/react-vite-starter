import { useQuery, UseQueryResult } from 'react-query'
import { IQuestion } from 'src/contracts/question'
import { getRequest } from '@utils/request-handler'

export const useGetQuestion = (questionId?: string): UseQueryResult<IQuestion> =>
  useQuery(['useGetQuestion', questionId], () => getRequest.get(`CarregaQuestao/${questionId}`), {
    enabled: !!questionId,
  })
