'use client'

import { IProfileSummary, ProfileFormType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, useState } from 'react'

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

interface ICharacterBuilderForm {
  setSummary: Dispatch<IProfileSummary>
}

function CharacterBuilderForm({ setSummary }: ICharacterBuilderForm) {
  const [name, setName] = useState<undefined | string>()
  const [gender, setGender] = useState<undefined | string>()
  const [attribute, setAttribute] = useState<undefined | string>('Attribute')
  const [profession, setProfession] = useState<undefined | string>()

  async function mutationFn() {
    const reqBody: ProfileFormType = {
      name: name || '',
      attribute: attribute || '',
      gender: gender || '',
      profession: profession || ''
    }
    return fetch('/api/char-builder/profile', {
      method: 'POST',
      body: JSON.stringify(reqBody)
    })
  }

  const profileAPI = useMutation({
    mutationFn: mutationFn,
    onSuccess: async (res) => {
      const data = (await res.json()) as { message: string }
      setSummary({
        name: name || '',
        attribute: attribute || '',
        gender: gender || '',
        profession: profession || '',
        summary: data.message
      })
    }
  })

  return (
    <>
      <div className="card w-96 bg-orange-200 text-red-700">
        <div className="card-body">
          <div className="card-title">Character Builder</div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              onChange={(entry) => setName(entry.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Gender</label>
            <select
              className="select w-full max-w-xs"
              defaultValue={'Gender Options'}
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
              onChange={(entry) => setProfession(entry.currentTarget.value)}
            />
          </div>

          <div className="card-actions justify-end mt-8">
            <button
              className="btn bg-red-700 text-orange-200 w-48 border-none hover:bg-orange-700"
              disabled={
                !gender ||
                !name ||
                name.length <= 1 ||
                !attribute ||
                !profession ||
                profession.length <= 1 ||
                profileAPI.isPending
              }
              onClick={() => profileAPI.mutate()}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterBuilderForm
