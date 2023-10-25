'use client'

const genderOptions = ['male', 'female', 'non-binary']
const attributeOptions = [
  'Friendly',
  'Outgoing',
  'Confident',
  'Intelligent',
  'Kind',
  'Creative',
  'Honest',
  'Reliable',
  'Introverted',
  'Optimistic'
]

function CharacterBuilderForm() {
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
            <select className="select w-full max-w-xs">
              <option disabled selected>
                Gender Options
              </option>
              {genderOptions.map((entry) => (
                <option key={entry}>{entry}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">Attribute</label>
            <select className="select w-full max-w-xs">
              <option disabled selected>
                Attribute
              </option>
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
