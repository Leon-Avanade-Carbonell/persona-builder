import { CampaignPostType } from '@/components/pages/dashboard/campaign-card-types'
import { CompletionMessageType, IPostManagerBody } from '@/types'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey
})

export async function POST(request: Request) {
  const { message, writingTone } = (await request.json()) as CampaignPostType

  let contentText = `My message is ${message} and I want to write it in a ${writingTone}`

  const composer: CompletionMessageType = [
    {
      role: 'system',
      content:
        'You are a digital media campaign manager. You will be tasked to generate posts based on the user prompts'
    },
    {
      role: 'user',
      content: contentText
    },
    {
      role: 'user',
      content:
        'Please generate a short social media message with those information'
    }
  ]

  const response = await openai.chat.completions.create({
    messages: composer,
    model: 'gpt-3.5-turbo-16k-0613'
  })

  return NextResponse.json({ message: response.choices[0].message.content })
}
