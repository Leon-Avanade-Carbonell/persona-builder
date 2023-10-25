'use client'

import { useState } from 'react'

const genderOptions = ['male', 'female', 'non-binary']
const attributeOptions = [
  'friendly',
  'outgoing',
  'confident',
  'intelligent',
  'kind',
  'creative',
  'honest',
  'reliable',
  'introverted',
  'optimistic'
]

function CharacterBuilderForm() {
  const [name, setName] = useState<undefined | string>()
  const [gender, setGender] = useState<string>('Gender Options')
  const [attribute, setAttribute] = useState<string>('Attribute')
  return (
    <>
      <div className="card w-96 bg-purple-300/80 text-purple-700">
        <div className="card-body">
          <div className="card-title">Character Builder</div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Gender</label>
            <select
              className="select w-full max-w-xs"
              defaultValue={'Gender Options'}
              //   value={gender}
              onChange={(entry) => {
                setGender(entry.currentTarget.value)
              }}
            >
              <option disabled>Gender Options</option>
              {genderOptions.map((entry) => (
                <option key={entry}>{entry}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Attribute</label>
            <select
              className="select w-full max-w-xs"
              defaultValue={'Attribute'}
              //   value={attribute}
              onChange={(entry) => setAttribute(entry.currentTarget.value)}
            >
              <option disabled>Attribute</option>
              {attributeOptions.map((entry) => (
                <option key={entry}>{entry}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Profession</label>
            <input
              type="text"
              placeholder="Profession"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="card-actions justify-end mt-8">
            <button className="btn bg-orange-700 text-orange-100 w-48 border-none ">
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterBuilderForm
