'use client'

import { BasicRequestType } from '@/types'
import { useState } from 'react'
import SocialMediaPost from './social-media-post'

export default function BasicPage() {
  const [message, setMessage] = useState('')
  const [thoughts, setThoughts] = useState<undefined | string>()

  async function handleSubmit() {
    // const requestBody = JSON.stringify({
    //   message: message,
    //   socialMedia: 'facebook'
    // } as BasicRequestType)
    // const res = await fetch('/api/chat', { method: 'POST', body: requestBody })
    // console.log(res)
    // const reply = await res.json()
    // console.log(reply)
    setThoughts(message)
    //   setChatResponse(reply.content);
  }
  return (
    <div className="flex flex-col container bg-slate-400 justify-around gap-24">
      <div className="flex-1">
        <div className="flex flex-row gap-3 justify-center mx-auto">
          <input
            type="text"
            placeholder="Write your post here"
            className="input input-bordered input-md w-full max-w-5xl"
            value={message}
            onChange={(entry) => setMessage(entry.currentTarget.value)}
          />
          <button
            className="btn btn-primary"
            disabled={message.length <= 0}
            onClick={() => handleSubmit()}
          >
            Generate
          </button>
        </div>
      </div>
      <div className="flex-1">
        <SocialMediaPost />
      </div>
    </div>
  )
}
