import { ComposerContextProvider } from '@/components/context/DashboardComposerContext'
import CampaignDetails from '@/components/pages/dashboard/campaign-details'
import { MessageArea } from '@/components/pages/dashboard/message-area'

import { MessageList } from '@/components/pages/dashboard/message-list'
import { CampaignCards } from '@/components/pages/dashboard/post-cards'

export default function Page({ params }: { params: { campaignId: string } }) {
  return (
    <>
      <ComposerContextProvider>
        <div className="flex justify-evenly w-[100%]">
          <div>
            <CampaignDetails campaignId={params.campaignId} />
            <MessageArea />
            <MessageList campaignId={params.campaignId} />
          </div>
          <div className="max-h-[80%]">
            <CampaignCards campaignId={params.campaignId} />
          </div>
        </div>
      </ComposerContextProvider>
    </>
  )
}
