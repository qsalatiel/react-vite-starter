import { BooleanNumberEnum, BooleanStringEnum } from './api'

export interface IChoices {
  id_alternativa: string
  prefixo_alternativa: number
  html_alternativa: string
  correta: BooleanNumberEnum
}

export enum QuestionTypeEnum {
  MULTIPLE_CHOICE = 0,
  TRUE_OR_FALSE = 1,
  SUMMATION = 2,
  DISCURSIVE = 3,
}

export interface IQuestion {
  token_questao: string
  html_questao: string
  html_resolucao: string
  tipo_questao: QuestionTypeEnum
  youtube_resolucao: string
  vimeo_resolucao: string
  anotacoes: string
  vestibular: string
  ano_vestibular: string
  dificuldade: string
  alternativas: IChoices[]
  nome_questao?: string
  ultima_revisao?: string
}

export interface SaveQuestionResponse {
  resultado: BooleanStringEnum
  frase: string
}

export interface IVestibular {
  vestibular: string
  vestibular_nome: string
}

export interface IVestibularYear {
  ano_vestibular: string
  ano_nome: string
}

export interface IDifficultLevels {
  dificuldade: string
  dificuldade_nome: string
}
