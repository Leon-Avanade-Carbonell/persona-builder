import {
  EmojiLeverType,
  IPostManagerBody,
  PostBodyParams,
  PostLengthType,
  SocialMediaType,
  WritingToneType,
  emojiLever,
  postLength,
  writingTone
} from '@/types'
import { useMutation } from '@tanstack/react-query'
import {
  Dispatch,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'

export interface IPostCardProps {
  source: SocialMediaType
  thoughts: string
  finishedLoading: Dispatch<SocialMediaType>
}

const reducer = (
  state: PostBodyParams,
  nextState: Partial<PostBodyParams>
): PostBodyParams => {
  return { ...state, ...nextState }
}

const mappedSocials: Record<SocialMediaType, PostBodyParams> = {
  facebook: {
    emojiTone: 'lots',
    writingTone: 'Friendly',
    postLength: '40 words'
  },
  linkedIn: {
    emojiTone: 'some',
    writingTone: 'Formal',
    postLength: '30 words'
  },
  twitter: {
    emojiTone: 'none',
    writingTone: 'Pirate',
    postLength: 'a haiku'
  }
}

const baseDefaults: PostBodyParams = {
  emojiTone: 'some',
  postLength: '30 words',
  writingTone: 'Concerned'
}

function PostCard({ source, thoughts, finishedLoading }: IPostCardProps) {
  const INIT_DATA = mappedSocials[source] || baseDefaults
  const [state, dispatch] = useReducer(reducer, INIT_DATA)
  const [message, setMessage] = useState('')
  const onceRef = useRef(false)

  const chatAPI = useMutation({
    mutationFn: () => {
      const requestBody = JSON.stringify({
        ...state,
        message: thoughts
      } as IPostManagerBody)
      return fetch('/api/post-manager', { method: 'POST', body: requestBody })
    },
    onSuccess: async (res) => {
      const data = (await res.json()) as { message: string }
      setMessage(data.message)
    },
    onSettled: () => {
      onceRef.current = false
      finishedLoading(source)
    }
  })

  useEffect(() => {
    if (thoughts && !onceRef.current) {
      chatAPI.mutate()
      onceRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thoughts])

  return (
    <>
      <div className="flex flex-1 flex-col max-w-sm">
        <div className="w-lg min-h-5xl w-full p-5 bg-orange-200 text-red-700 rounded-md my-5 mx-auto">
          <div className="mb-4 text-red-700 text-xl font-bold">{source}</div>
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
            defaultValue={state.writingTone.toLowerCase()}
            onChange={(value) =>
              dispatch({
                writingTone: value.currentTarget.value as WritingToneType
              })
            }
          >
            {writingTone.map((entry) => (
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
          <button
            className="btn btn-md mt-6 w-full bg-orange-700/70 text-red-200 border-none text-md"
            onClick={() => chatAPI.mutate()}
            disabled={chatAPI.isPending || !thoughts}
          >
            Update Post
          </button>
        </div>
        <div className="w-lg max-h-full w-full p-5 bg-orange-200 rounded-md">
          <div className="mb-4 text-red-700 text-xl font-bold">{source}</div>
          <div className="h-44 text-red-700 text-md overflow-y-auto">
            {chatAPI.isPending ? (
              <div className="w-full flex flex-1 justify-center items-center py-6 h-24 overflow-y-auto">
                <span className="loading loading-spinner loading-md " />
              </div>
            ) : (
              message
            )}
          </div>
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
        className="select w-full max-w-sm text-red-700 select-sm text-xl"
        {...props}
        // onChange={(entry) => setName(entry.currentTarget.value)}
      />
    </div>
  )
}

export default PostCard
