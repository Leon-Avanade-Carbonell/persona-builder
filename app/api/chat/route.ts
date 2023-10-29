import { NextResponse } from 'next/server'
import {
  BasicRequestType,
  CompletionMessageType,
  SocialMediaType
} from '@/types'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey
})

function handlePersona(persona: SocialMediaType): CompletionMessageType {
  switch (persona) {
    case 'facebook':
      return [
        {
          role: 'user',
          content: 'Act as a technical writer for a software company.'
        },
        {
          role: 'user',
          content: 'Please provide a correction to my next messages'
        },
        {
          role: 'system',
          content: 'Limit your response to a max for 30 words'
        }
      ]
    case 'twitter': {
      return [
        {
          role: 'system',
          content:
            'Act as a Social Media marketer and want to help manage our posts.'
        },
        {
          role: 'system',
          content: 'Limit your response to a max for 20 words'
        }
      ]
    }
    default:
      return [
        {
          role: 'system',
          content: 'Limit your response to a max of 20 words'
        }
      ]
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as BasicRequestType

  const history = handlePersona(body.socialMedia)

  const response = await openai.chat.completions.create({
    messages: [...history, { role: 'user', content: body.message }],
    model: 'gpt-3.5-turbo-16k-0613'
  })

  return NextResponse.json({ message: response.choices[0].message.content })
}
