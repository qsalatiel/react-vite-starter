import { postRequest } from '@utils/request-handler'
import { useMutation } from 'react-query'

export const useSaveQuestion = () => {
  return useMutation(payload => postRequest.post('SalvaQuestao', payload))
}
