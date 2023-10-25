import { SocialMediaType } from '@/types'

interface ISocialMediaPostProps {
  thoughts: string
  source: SocialMediaType
}

export default function SocialMediaPost(props: ISocialMediaPostProps) {
  const { thoughts, source } = props
  return <div className="max-w-lg max-h-lg w-full p-5 bg-red-300">{source}</div>
}
