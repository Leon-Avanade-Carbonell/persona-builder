'use client'
import { useState } from 'react'
import SocialMediaPost from '../cards/social-media-post'
import { SocialMediaType } from '@/types'
import Link from 'next/link'

const mapped: SocialMediaType[] = ['twitter', 'facebook', 'linkedIn']

export default function BasicPage() {
  const [message, setMessage] = useState('')
  const [loaded, setLoaded] = useState<SocialMediaType[]>(mapped)
  const [thoughts, setThoughts] = useState<undefined | string>()

  function finishedLoading(source: SocialMediaType) {
    setLoaded((entries) => [...entries, source])
  }

  const socialsArray = mapped.map((entry) => (
    <SocialMediaPost
      key={entry}
      thoughts={thoughts as string}
      source={entry as SocialMediaType}
      finishedLoading={finishedLoading}
    />
  ))

  async function handleSubmit() {
    setLoaded([])
    setThoughts(message)
  }
  return (
    <div className="min-w-screen min-h-screen">
      <div className="container  mx-auto">
        <div className="flex flex-col items-stretch min-h-screen">
          <div className="flex flex-1 justify-center items-center">
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
              className="btn bg-purple-600 text-orange-200 text-xl ml-5"
              disabled={message.length <= 0 || loaded.length !== mapped.length}
              onClick={() => handleSubmit()}
            >
              Generate
            </button>
          </div>
          {thoughts && (
            <>
              <div className="flex flex-1 gap-4 justify-center text-purple-100 mt-4">
                {socialsArray}
              </div>
              <div className="flex h-20 self-end">
                <Link href="/post-manager" className="text-orange-700 text-xl">
                  Post Manager
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
