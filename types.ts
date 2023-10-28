import OpenAI from 'openai'

export const socialMediaArray = ['linkedIn', 'facebook', 'twitter']

export type SocialMediaType = 'linkedIn' | 'facebook' | 'twitter'
export type CompletionMessageType =
  OpenAI.Chat.Completions.ChatCompletionMessageParam[]

export type BasicRequestType = {
  message: string
  socialMedia: SocialMediaType
}

export type PersonaTableType = Record<
  SocialMediaType,
  OpenAI.Chat.Completions.ChatCompletionMessageParam[]
>

export type CharacterBuilderProps = {
  name: string
  gender: string
  attribute: string
  profession: string
}

export type ProfileFormType = {
  name: string
  gender?: string
  attribute: string
  profession: string
}

export interface IProfileSummary extends ProfileFormType {
  summary: string
}
