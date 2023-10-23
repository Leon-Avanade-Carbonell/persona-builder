import OpenAI from 'openai'

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
