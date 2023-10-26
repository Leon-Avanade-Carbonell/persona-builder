import { CompletionMessageType, ProfileFormType } from '@/types'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey
})

function randomize(list: string[]): string {
  const selection = Math.floor(Math.random() * list.length)
  return list[selection]
}

const hobbies = [
  'Reading',
  'Playing a musical instrument',
  'Gardening',
  'Painting',
  'Cooking',
  'Photography',
  'Hiking',
  'Cycling',
  'Singing',
  'Dancing',
  'Yoga',
  'Swimming',
  'Traveling',
  'Fishing',
  'Drawing',
  'Writing',
  'Gaming',
  'Knitting',
  'Meditation',
  'Birdwatching'
]

export async function POST(request: Request) {
  const body = (await request.json()) as ProfileFormType

  const composer: CompletionMessageType = [
    {
      role: 'system',
      content: `You are ${body.name} with a profession of ${body.profession} with a ${body.attribute} personality.`
    },
    {
      role: 'system',
      content: `You are knowledgeable in the topics about ${randomize(hobbies)}`
    },
    {
      role: 'user',
      content:
        'Give a summary of yourself. Limit your response to max of 40 words'
    }
  ]

  const response = await openai.chat.completions.create({
    messages: composer,
    model: 'gpt-3.5-turbo-16k-0613'
  })

  return NextResponse.json({ message: response.choices[0].message.content })
}
