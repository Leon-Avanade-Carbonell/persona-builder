'use client'

import { useState } from 'react'
import CharacterBuilderForm from '../character-builder-form'
import { IProfileSummary } from '@/types'

function CharacterBuilderPage() {
  // const [summary, setSummary] = useState<IProfileSummary | undefined>({
  //   name: 'Mighty Mouse',
  //   attribute: 'creative',
  //   gender: 'male',
  //   profession: 'Superhero',
  //   summary:
  //     'I am Mighty Mouse, a superhero with a creative soul. With a passion for painting, I bring color and artistry to my crime-fighting adventures. Equipped with artistic knowledge and a mighty spirit, I use my abilities to protect the world and inspire others through my vibrant superhero escapades.'
  // })
  const [summary, setSummary] = useState<IProfileSummary | undefined>()
  const [message, setMessage] = useState('')
  // const [loaded, setLoaded] = useState<SocialMediaType[]>(mapped)
  const [thoughts, setThoughts] = useState<undefined | string>()

  function handleSubmit() {}

  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="container  mx-auto">
          <div className="flex flex-col items-stretch min-h-screen">
            {!summary && (
              <div className="flex flex-1 justify-center items-center">
                <CharacterBuilderForm setSummary={setSummary} />
              </div>
            )}
            {!!summary && (
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
                  disabled={message.length <= 0}
                  onClick={() => handleSubmit()}
                >
                  Generate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterBuilderPage
