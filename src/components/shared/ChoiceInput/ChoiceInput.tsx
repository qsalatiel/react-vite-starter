import { Box, Flex, IconButton } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import { HiOutlineTrash } from 'react-icons/hi'
import { BooleanNumberEnum } from 'src/contracts/api'
import { QuestionTypeEnum } from 'src/contracts/question'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'

interface Props {
  min: number
  index: number
  numberOfChoices: number
  isCorrect: boolean
  choicePrefix: string
  questionType: QuestionTypeEnum
  onRemoveChoice: () => void
  onChangeCorrect?: (correct: string) => void
}

export const ChoiceInput = ({
  choicePrefix,
  isCorrect,
  index,
  numberOfChoices,
  min,
  questionType,
  onChangeCorrect,
  onRemoveChoice,
}: Props): JSX.Element => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({
    name: `alternativas.${index}.id_alternativa`,
    rules: {
      required: 'Campo obrigatório',
    },
    control,
  })

  const { field: choiceHtmlField } = useController({
    name: `alternativas.${index}.html_alternativa`,
    rules: {
      required: 'Campo obrigatório',
    },
    control,
  })

  const { field: choiceSwitch } = useController({
    name: `alternativas.${index}.correta`,
    control,
  })
  const [currentChoice, choicesArray] = getValues([`alternativas.${index}`, 'alternativas'])

  const shouldShowRemoveButton = (): boolean => numberOfChoices > min

  const markChoiceAsCorrect = (id, choicesArr) =>
    choicesArr.map(choice =>
      choice.id_alternativa === id
        ? { ...choice, correta: BooleanNumberEnum.TRUE }
        : { ...choice, correta: BooleanNumberEnum.FALSE }
    )

  const handleChoiceCorrrectChange = (): void => {
    if (choiceSwitch.value === BooleanNumberEnum.TRUE) {
      return setValue(`alternativas.${index}.correta`, BooleanNumberEnum.FALSE)
    }

    if (questionType === QuestionTypeEnum.MULTIPLE_CHOICE) {
      return setValue(
        'alternativas',
        markChoiceAsCorrect(currentChoice.id_alternativa, choicesArray)
      )
    }

    return setValue(`alternativas.${index}.correta`, BooleanNumberEnum.TRUE)
  }

  return (
    <Flex>
      <Box
        as="button"
        type="button"
        onClick={handleChoiceCorrrectChange}
        borderRadius="lg"
        border={`2px solid ${choiceSwitch.value === BooleanNumberEnum.TRUE ? '#48BB78' : '#eee'}`}
        p="2"
      >
        <Flex justifyContent="space-between">
          <Box bg={`${choiceSwitch.value === BooleanNumberEnum.TRUE ? '#48BB78' : '#eee'}`}>
            <code>{choicePrefix}</code>
          </Box>
        </Flex>

        <RichTextEditor
          height={128}
          label=""
          value={choiceHtmlField.value}
          onChange={choiceHtmlField.onChange}
        />
        {/* {errors.alternativas[index].html_alternativa && (
          <Box color="red">{errors.alternativas[index].html_alternativa.message}</Box>
        )} */}
      </Box>

      {shouldShowRemoveButton() && (
        <IconButton
          aria-label="deletar"
          type="button"
          colorScheme="red"
          variant="outline"
          onClick={onRemoveChoice}
        >
          <HiOutlineTrash />
        </IconButton>
      )}
    </Flex>
  )
}
