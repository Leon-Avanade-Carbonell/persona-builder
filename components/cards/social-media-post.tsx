import { BasicRequestType, SocialMediaType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, useEffect, useRef, useState } from 'react'

interface ISocialMediaPostProps {
  thoughts: string
  source: SocialMediaType
  finishedLoading: Dispatch<SocialMediaType>
}

export default function SocialMediaPost(props: ISocialMediaPostProps) {
  const { thoughts, source, finishedLoading } = props
  const [message, setMessage] = useState<string | undefined>()
  const onceRef = useRef(false)

  const chatAPI = useMutation({
    mutationFn: () => {
      const requestBody = JSON.stringify({
        message: thoughts,
        socialMedia: source
      } as BasicRequestType)
      return fetch('/api/chat', { method: 'POST', body: requestBody })
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
    <div className="max-w-lg max-h-[15rem] w-full p-5 bg-orange-200 rounded-md">
      <div className="mb-4 text-red-700 text-xl font-bold">{source}</div>
      <div className="h-24 text-xl text-red-700">{message || 'loading...'}</div>
    </div>
  )
}
