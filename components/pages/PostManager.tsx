'use client'

import { useState } from 'react'
import PostCard from '../cards/post-card'
import { SocialMediaType } from '@/types'

const mapped: SocialMediaType[] = ['facebook', 'twitter', 'linkedIn']

function PostManager() {
  const [message, setMessage] = useState('')
  const [thoughts, setThoughts] = useState('')
  const [loaded, setLoaded] = useState<SocialMediaType[]>([])

  function finishedLoading(source: SocialMediaType) {
    setLoaded((entries) => [...entries, source])
  }
  const socialsArray = mapped.map((entry) => (
    <PostCard
      key={entry}
      thoughts={thoughts}
      source={entry}
      finishedLoading={finishedLoading}
    />
  ))

  function handleSubmit() {
    setThoughts(message)
  }

  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col items-stretch min-h-screen">
            <div className="flex justify-center items-center h-44">
              <input
                className="input input-bordered input-xl w-full max-w-5xl text-xl text-purple-700"
                type="text"
                placeholder="Write your post here"
                value={message}
                onChange={(entry) => setMessage(entry.currentTarget.value)}
                onKeyDownCapture={(entry) => {
                  if (entry.key === 'Enter') {
                    handleSubmit()
                  }
                }}
              />
              <button
                className="btn bg-purple-600 text-orange-200 text-md ml-5"
                disabled={message.length <= 0}
                onClick={() => handleSubmit()}
              >
                Generate
              </button>
            </div>
            <div className="flex-1  justify-center items-center">
              <div className="flex flex-1 gap-4 justify-center text-purple-100 mt-4">
                {socialsArray}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostManager
