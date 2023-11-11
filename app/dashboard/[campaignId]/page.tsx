import CampaignDetails from '@/components/pages/dashboard/campaign-deteails'

export default function Page({ params }: { params: { campaignId: string } }) {
  return (
    <>
      <div className="flex flex-row ">
        <CampaignDetails campaignId={params.campaignId} />
      </div>
    </>
  )
}
