import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Spacer,
  Textarea,
  useCallbackRef,
} from '@chakra-ui/react'
import { RichTextEditor } from '@components/shared/RichTextEditor/RichTextEditor'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import {
  Controller,
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import ReactPlayer from 'react-player'
import { ChoiceInput } from '@components/shared/ChoiceInput/ChoiceInput'
import { BooleanNumberEnum } from 'src/contracts/api'
import {
  IDifficultLevels,
  IQuestion,
  IVestibular,
  IVestibularYear,
  QuestionTypeEnum,
} from 'src/contracts/question'
import { ALPHABET_INDEX, SOCH_SOURCE_ID, SUMMATION_INDEX } from 'src/constants/questions'

interface Props {
  defaultValues: IQuestion | undefined
  difficults: IDifficultLevels[] | undefined
  vestibulares: IVestibular[] | undefined
  vestibularYears: IVestibularYear[] | undefined
  onSubmit: (payload: unknown) => void
}

export const EditQuestionForm = ({
  defaultValues,
  difficults,
  vestibulares,
  vestibularYears,
  onSubmit,
}: Props): JSX.Element => {
  const [choicesMaxLength, setChoicesMaxLength] = useState(1)
  const [choicesMinLength, setChoicesMinLength] = useState(1)
  const formMethods = useForm<IQuestion>({
    defaultValues: {
      html_resolucao: '',
      vestibular: '',
      ano_vestibular: '',
      tipo_questao: undefined,
      youtube_resolucao: '',
      vimeo_resolucao: '',
      anotacoes: '',
      dificuldade: '',
      alternativas: [],
    },
  })

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = formMethods

  const { fields, append, remove, replace } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'alternativas', // unique name for your Field Array
  })

  const [urlVimeo, urlYoutube, questionType] = useWatch({
    name: ['vimeo_resolucao', 'youtube_resolucao', 'tipo_questao'],
    control,
  })

  const vestibularFormValue = getValues('vestibular')

  const handleAddChoice = (): void => {
    switch (+questionType) {
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        append({
          id_alternativa: uuidv4(),
          prefixo_alternativa: fields.length,
          html_alternativa: '',
          correta: BooleanNumberEnum.FALSE,
        })
        break
      case QuestionTypeEnum.SUMMATION:
        append({
          id_alternativa: uuidv4(),
          prefixo_alternativa: fields.length,
          html_alternativa: '',
          correta: BooleanNumberEnum.FALSE,
        })
        break
      case QuestionTypeEnum.TRUE_OR_FALSE:
        append({
          id_alternativa: uuidv4(),
          prefixo_alternativa: fields.length,
          html_alternativa: '',
          correta: BooleanNumberEnum.FALSE,
        })
        break
      default:
        break
    }
  }

  const handleSelectQuestionType = useCallback((type: QuestionTypeEnum) => {
    switch (+type) {
      case QuestionTypeEnum.DISCURSIVE:
        setChoicesMinLength(1)
        setChoicesMaxLength(1)

        replace([])
        break
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        setChoicesMinLength(4)
        setChoicesMaxLength(5)

        replace([
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 0,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 1,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 2,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 3,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
        ])
        break
      case QuestionTypeEnum.SUMMATION:
        setChoicesMinLength(1)
        setChoicesMaxLength(7)

        replace([
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 0,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
        ])
        break
      case QuestionTypeEnum.TRUE_OR_FALSE:
        setChoicesMaxLength(26)
        setChoicesMinLength(1)
        replace([
          {
            id_alternativa: uuidv4(),
            prefixo_alternativa: 0,
            html_alternativa: '',
            correta: BooleanNumberEnum.FALSE,
          },
        ])
        break
      default:
        break
    }
  }, [])

  const renderChoicePrefix = (index: number): string => {
    if (+questionType === QuestionTypeEnum.SUMMATION) {
      return SUMMATION_INDEX[index]
    }

    return ALPHABET_INDEX[index]
  }

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">SUBMIT</Button>
        <Flex>
          <Flex direction="column">
            <Controller
              name="html_questao"
              rules={{
                required: 'Campo obrigatório',
              }}
              render={({ field }): JSX.Element => (
                <>
                  <RichTextEditor
                    label="Questão"
                    height={500}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.html_questao && <code>{errors.html_questao.message}</code>}
                </>
              )}
            />

            <FormControl>
              <FormLabel>Tipo da questão</FormLabel>
              <Select
                placeholder="Selecione uma opção"
                {...register('tipo_questao', {
                  required: 'Campo obrigatório',
                  onChange: ({ target }) => {
                    handleSelectQuestionType(target.value as QuestionTypeEnum)
                  },
                })}
              >
                <option value={QuestionTypeEnum.DISCURSIVE}>Discursiva</option>
                <option value={QuestionTypeEnum.MULTIPLE_CHOICE}>Multipla Escolha</option>
                <option value={QuestionTypeEnum.SUMMATION}>Somatória</option>
                <option value={QuestionTypeEnum.TRUE_OR_FALSE}>Verdadeiro ou Falso</option>
              </Select>
              <FormHelperText>
                {errors?.tipo_questao?.message && <code>{errors.tipo_questao.message}</code>}
              </FormHelperText>
            </FormControl>

            <Box mt="4" mb="4">
              {fields.map((f, index) => (
                <Box key={f.id} mb="4">
                  <ChoiceInput
                    index={index}
                    numberOfChoices={fields.length}
                    choicePrefix={renderChoicePrefix(index)}
                    min={choicesMinLength}
                    onRemoveChoice={(): void => remove(index)}
                    questionType={questionType as QuestionTypeEnum}
                  />
                </Box>
              ))}
            </Box>

            {questionType &&
              questionType !== QuestionTypeEnum.DISCURSIVE &&
              fields.length < choicesMaxLength && (
                <Button
                  leftIcon={<HiOutlinePlusCircle />}
                  onClick={handleAddChoice}
                  colorScheme="blue"
                  variant="outline"
                >
                  Adicionar alternativa
                </Button>
              )}
            <Spacer />

            <Controller
              name="html_resolucao"
              render={({ field }): JSX.Element => (
                <RichTextEditor
                  label="Resolução"
                  height={500}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Flex>

          <Spacer />

          <Flex direction="column">
            <FormControl>
              <FormLabel>Dificuldade</FormLabel>
              <Select
                id="dificuldade"
                {...register('dificuldade', {
                  required: 'Campo obrigatório',
                })}
                placeholder={!difficults?.length ? 'Carregando...' : 'Selecione uma opção'}
                disabled={!difficults?.length}
              >
                {typeof difficults !== 'undefined' &&
                  difficults?.length > 0 &&
                  difficults.map(difficult => (
                    <option
                      key={`difficult-option-${difficult.dificuldade}`}
                      value={difficult.dificuldade}
                    >
                      {difficult.dificuldade_nome}
                    </option>
                  ))}
              </Select>
              <FormHelperText>
                {errors?.dificuldade?.message && <code>{errors.dificuldade.message}</code>}
              </FormHelperText>
            </FormControl>

            <Flex mt="4">
              <Flex mr="4">
                <FormControl>
                  <FormLabel>Fonte</FormLabel>
                  <Select
                    id="vestibular"
                    {...register('vestibular')}
                    placeholder={!vestibulares?.length ? 'Carregando...' : 'Selecione uma opção'}
                    disabled={!vestibulares?.length}
                  >
                    {typeof vestibulares !== 'undefined' &&
                      vestibulares?.length > 0 &&
                      vestibulares.map(vestibular => (
                        <option
                          key={`vestibular-option-${vestibular.vestibular}`}
                          value={vestibular.vestibular}
                        >
                          {vestibular.vestibular_nome}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </Flex>

              {vestibularFormValue !== SOCH_SOURCE_ID && (
                <Flex>
                  <FormControl>
                    <FormLabel>Ano</FormLabel>
                    <Select
                      id="ano_vestibular"
                      {...register('ano_vestibular')}
                      placeholder={
                        !vestibularYears?.length ? 'Carregando...' : 'Selecione uma opção'
                      }
                      disabled={!vestibularYears?.length}
                    >
                      {typeof vestibularYears !== 'undefined' &&
                        vestibularYears?.length > 0 &&
                        vestibularYears.map(year => (
                          <option
                            key={`difficult-option-${year.ano_vestibular}`}
                            value={year.ano_vestibular}
                          >
                            {year.ano_nome}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                </Flex>
              )}
            </Flex>

            <FormControl mt="4">
              <FormLabel>Vídeo de Resolução (YouTube)</FormLabel>
              <Input {...register('youtube_resolucao')} />
              <FormHelperText>Cole a URL para pre-visualizar o vídeo</FormHelperText>
            </FormControl>
            {urlYoutube && <ReactPlayer width={320} height={180} url={urlYoutube} />}

            <FormControl mt="4">
              <FormLabel>Vídeo de Resolução (Vimeo)</FormLabel>
              <Input {...register('vimeo_resolucao')} />
              <FormHelperText>Cole a URL para pre-visualizar o vídeo</FormHelperText>
            </FormControl>
            {urlVimeo && <ReactPlayer width={320} height={180} url={urlVimeo} />}

            <FormControl mt="4">
              <FormLabel>Anotações</FormLabel>
              <Textarea
                resize="vertical"
                rows={12}
                {...register('anotacoes')}
                placeholder="Escreva aqui suas anotações"
              />
            </FormControl>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  )
}
