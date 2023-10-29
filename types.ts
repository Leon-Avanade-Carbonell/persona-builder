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

export const emojiLever = ['none', 'some', 'lots'] as const
export type EmojiLeverType = (typeof emojiLever)[number]

export const writingTone = [
  'Formal',
  'Humorous',
  'Assertive',
  'Encouraging',
  'Optimism',
  'Concerned',
  'Friendly',
  'Persuasive',
  'Curious',
  'Humorous',
  'Joyful',
  'Pessimism',
  'Serious',
  'Accusatory',
  'Amused',
  'Cooperative',
  'Empathetic',
  'Informal',
  'Regretful'
] as const
export type WritingToneType = (typeof writingTone)[number]

export const postLength = [
  '20 words',
  '30 words',
  '40 words',
  '50 words',
  'a limerick',
  'a haiku'
] as const
export type PostLengthType = (typeof postLength)[number]

export type PostBodyParams = {
  emojiTone: EmojiLeverType
  writingTone: WritingToneType
  postLength: PostLengthType
}

export interface IPostManagerBody extends PostBodyParams {
  message: string
}
