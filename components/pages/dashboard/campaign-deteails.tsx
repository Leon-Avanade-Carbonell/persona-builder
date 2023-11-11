'use client'
import {
  CampaignType,
  useDashboardContext
} from '@/components/context/DashboardContext'
import { useEffect, useReducer, useState } from 'react'

function reducer(state: CampaignType, nextState: Partial<CampaignType>) {
  return { ...state, ...nextState }
}

export default function CampaignDetails({
  campaignId
}: {
  campaignId: string
}) {
  const { state } = useDashboardContext()
  const campaign = state.campaigns.find((entry) => entry.id === campaignId)
  const [formVal, dispatchFormVal] = useReducer(reducer, campaign!)

  if (!campaign) return <>Campaign Not Found</>
  return (
    <>
      <div className="p-5 w-[600px] border-2 bg-orange-200 rounded-lg">
        <div className="font-bold text-red-700 mb-5">{campaign.name}</div>
        <div className="font-semi-bold text-red-700 mb-2">Details</div>
        <textarea
          value={formVal.details}
          onChange={(e) => dispatchFormVal({ details: e.target.value })}
          name="description"
          id="description"
          className="p-2 text-red-700 w-full h-[100px] mb-5"
          maxLength={100}
        />
        <div className="font-semi-bold text-red-700 mb-2">Keywords</div>
        <input
          type="text"
          className="p-2 text-red-700 mb-5 w-full"
          value={formVal.keywords}
          onChange={(e) => dispatchFormVal({ keywords: e.target.value })}
          maxLength={30}
        />
      </div>
    </>
  )
}
