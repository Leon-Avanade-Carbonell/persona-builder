import CampaignDetails from '@/components/pages/dashboard/campaign-details'
import { MessageArea } from '@/components/pages/dashboard/message-area'

import { MessageList } from '@/components/pages/dashboard/message-list'
import { CampaignCards } from '@/components/pages/dashboard/post-cards'

export default function Page({ params }: { params: { campaignId: string } }) {
  return (
    <>
      <div className="flex justify-evenly w-[100%]">
        <div>
          <CampaignDetails campaignId={params.campaignId} />
          <MessageList campaignId={params.campaignId} />
        </div>
        <div className="max-h-[80%]">
          <MessageArea campaignId={params.campaignId} />
          <CampaignCards />
        </div>
      </div>
    </>
  )
}
