import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey
})

export async function POST() {
  const res = await openai.images.generate({
    prompt: 'Create an illustration of a male who loves sports',
    size: '256x256'
  })

  console.table(res)

  return NextResponse.json({
    url: res.data[0].url
  })
}
