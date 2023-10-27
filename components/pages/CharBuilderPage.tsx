'use client'

import { useState } from 'react'
import CharacterBuilderForm from '../character-builder-form'
import { IProfileSummary } from '@/types'

function CharacterBuilderPage() {
  // const [summary, setSummary] = useState<IProfileSummary | undefined>({
  //   name: 'Might Mouse',
  //   attribute: 'confident',
  //   gender: 'male',
  //   profession: 'SuperHero',
  //   summary:
  //     "I'm Mighty Mouse, the confident SuperHero of Traveling. With my knowledge and experience, I soar across the world, overcoming challenges and ensuring unforgettable adventures for all!"
  // })
  const [summary, setSummary] = useState<IProfileSummary | undefined>()

  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="container min-h-screen mx-auto flex items-center justify-center">
          <div className="flex flex-row ">
            {!summary && (
              <div className="flex-1">
                <CharacterBuilderForm setSummary={setSummary} />
              </div>
            )}
            {summary && (
              <div className="flex-1 ">{JSON.stringify(summary)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterBuilderPage
