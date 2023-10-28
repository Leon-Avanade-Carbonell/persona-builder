import {
  EmojiLeverType,
  PostBodyParams,
  PostLengthType,
  SocialMediaType,
  WritingToneLever,
  emojiLever,
  postLength,
  writingToneLever
} from '@/types'
import { InputHTMLAttributes, SelectHTMLAttributes, useReducer } from 'react'

export interface IPostCardProps {
  source: SocialMediaType
  thoughts: string
  defaults?: PostBodyParams
}

const reducer = (
  state: PostBodyParams,
  nextState: Partial<PostBodyParams>
): PostBodyParams => {
  return { ...state, ...nextState }
}

const baseDefaults: PostBodyParams = {
  emojiTone: 'some',
  postLength: '2 paragraphs',
  writingTone: 'Amused'
}

function PostCard({
  source,
  thoughts,
  defaults = baseDefaults
}: IPostCardProps) {
  const [state, dispatch] = useReducer(reducer, { ...defaults })
  return (
    <>
      <div className="flex flex-1 flex-col max-w-sm">
        <div className="w-lg min-h-lg w-full p-5 bg-purple-600 rounded-md my-5 mx-auto">
          <div className="mb-4 text-orange-200 text-xl font-bold">{source}</div>
          <Levers
            label="Use Emojis"
            defaultValue={state.emojiTone}
            onChange={(value) =>
              dispatch({
                emojiTone: value.currentTarget.value as EmojiLeverType
              })
            }
          >
            {emojiLever.map((entry) => (
              <option key={entry}>{entry}</option>
            ))}
          </Levers>
          <Levers
            label="Writing Tone"
            defaultValue={state.emojiTone}
            onChange={(value) =>
              dispatch({
                writingTone: value.currentTarget.value as WritingToneLever
              })
            }
          >
            {writingToneLever.map((entry) => (
              <option key={entry}>{entry.toLocaleLowerCase()}</option>
            ))}
          </Levers>
          <Levers
            label="Post Length"
            defaultValue={state.postLength}
            onChange={(value) =>
              dispatch({
                postLength: value.currentTarget.value as PostLengthType
              })
            }
          >
            {postLength.map((entry) => (
              <option key={entry}>{entry.toLocaleLowerCase()}</option>
            ))}
          </Levers>
        </div>
        <div className="w-lg max-h-[13.5rem] w-full p-5 bg-purple-600 rounded-md">
          <div className="mb-4 text-orange-200 text-xl font-bold">{source}</div>
          <div className="h-24 text-xl">{thoughts || 'loading...'}</div>
        </div>
      </div>
    </>
  )
}

interface ILeverProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

function Levers({ label, ...props }: ILeverProps) {
  return (
    <div className="form-control w-full max-w-sm mb-1">
      <label className="label">{label}</label>
      <select
        placeholder={label}
        className="select w-full max-w-sm text-purple-700 select-sm"
        {...props}
        // onChange={(entry) => setName(entry.currentTarget.value)}
      />
    </div>
  )
}

export default PostCard
