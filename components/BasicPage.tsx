'use client'
import { useState } from 'react'
import SocialMediaPost from './social-media-post'
import { BasicRequestType } from '@/types'
import OpenAI from 'openai'

export default function BasicPage() {
  const [message, setMessage] = useState('')
  const [thoughts, setThoughts] = useState<undefined | string>()
  const [sample, setSample] = useState<undefined | string>()

  async function handleSubmit() {
    const requestBody = JSON.stringify({
      message: message,
      socialMedia: 'facebook'
    } as BasicRequestType)
    const res = await fetch('/api/chat', { method: 'POST', body: requestBody })
    console.log(res)
    const reply = (await res.json()) as { message: string }
    console.log(reply)
    setSample(reply.message)
    setThoughts(message)
    //   setChatResponse(reply.content);
  }
  return (
    <div className="min-w-screen min-h-screen">
      <div className="container  mx-auto">
        <div className="flex flex-col items-stretch min-h-screen">
          <div className="flex flex-1 text-center justify-center items-center">
            <input
              className="input input-bordered input-md w-full max-w-5xl"
              type="text"
              placeholder="Write your post here"
              value={message}
              onChange={(entry) => setMessage(entry.currentTarget.value)}
            />
            <button
              className="btn btn-primary ml-5"
              disabled={message.length <= 0}
              onClick={() => handleSubmit()}
            >
              Generate
            </button>
          </div>
          {sample && (
            <div className="flex flex-1 text-center justify-center items-center">
              {sample}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
