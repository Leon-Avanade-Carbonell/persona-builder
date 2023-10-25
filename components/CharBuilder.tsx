'use client'

import CharacterBuilderForm from './character-builder-form'

function CharacterBuilder() {
  async function handleSubmit() {
    const response = await fetch('/api/char-builder/image', {
      method: 'POST'
    })

    console.table(response)
  }

  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="container min-h-screen mx-auto flex items-center justify-center">
          <div className="flex flex-row ">
            <CharacterBuilderForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterBuilder
