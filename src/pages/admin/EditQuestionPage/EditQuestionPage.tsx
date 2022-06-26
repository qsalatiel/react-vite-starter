import { useParams } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'

import { EditQuestionForm } from '@components/admin/EditQuestionForm/EditQuestionForm'
import { useGetQuestionDifficults } from 'src/requests/useGetQuestionDifficults'
import { useGetVestibulares } from 'src/requests/useGetVestibulares'
import { useGetVestibularYears } from 'src/requests/useGetVestibularYears'
import { useSaveQuestion } from 'src/requests/useSaveQuestion'
import { useGetQuestion } from 'src/requests/useGetQuestion'

export const EditQuestionPage = (): JSX.Element => {
  const { questionId } = useParams()

  const { data: difficults } = useGetQuestionDifficults(questionId)
  const { data: vestibulares } = useGetVestibulares(questionId)
  const { data: vestibularYears } = useGetVestibularYears(questionId)
  const { data: question } = useGetQuestion(questionId)

  const { mutate } = useSaveQuestion()
  const handleQuestionSubmit = payload => {
    mutate(
      { token_questao: questionId, ...payload },
      {
        onSuccess: () => {
          alert('deu boa')
        },
        onError: () => {
          alert('deu ruim')
        },
      }
    )
  }

  return (
    <>
      <Box p="4">
        <Heading as="h1" size="md">
          Editar Questão ID: {questionId}
        </Heading>
      </Box>
      <Box m="4">
        <EditQuestionForm
          defaultValues={question}
          difficults={difficults}
          vestibulares={vestibulares}
          vestibularYears={vestibularYears}
          onSubmit={handleQuestionSubmit}
        />
      </Box>
    </>
  )
}
