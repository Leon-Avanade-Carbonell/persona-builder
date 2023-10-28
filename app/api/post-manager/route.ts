import { CompletionMessageType, IPostManagerBody } from '@/types'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey
})

export async function POST(request: Request) {
  const { emojiTone, writingTone, postLength, message } =
    (await request.json()) as IPostManagerBody

  const emoji = emojiTone === 'none' ? '' : `${emojiTone} emojis. `
  const tone = `Write with a ${writingTone} tone. `
  const limit = `Limit the post to ${postLength}`

  console.log(`Edit the post, ${emoji}${tone}${limit}`)

  const composer: CompletionMessageType = [
    { role: 'system', content: 'You are a social media poster.' },
    { role: 'user', content: `Rewrite the post with, ${emoji}${tone}${limit}` },
    { role: 'user', content: message }
  ]

  const response = await openai.chat.completions.create({
    messages: composer,
    model: 'gpt-3.5-turbo-16k-0613'
  })

  return NextResponse.json({ message: response.choices[0].message.content })
}
