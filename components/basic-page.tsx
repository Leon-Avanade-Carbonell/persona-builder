'use client'

import { BasicRequestType } from '@/types'
import { useState } from 'react'

export default function BasicPage() {
  const [message, setMessage] = useState('')

  async function handleSubmit() {
    const requestBody = JSON.stringify({
      message: message,
      socialMedia: 'facebook'
    } as BasicRequestType)
    const res = await fetch('/api/chat', { method: 'POST', body: requestBody })
    console.log(res)
    const reply = await res.json()
    console.log(reply)
    //   setChatResponse(reply.content);
  }
  return (
    <div className="min-w-screen min-h-[100vh-0]">
      <div className="container mx-auto my-auto p-4">
        <div className="flex flex-col container h-full items-stretch">
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
                onClick={() => handleSubmit()}
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex-1">Two</div>
        </div>
      </div>
    </div>
  )
}
