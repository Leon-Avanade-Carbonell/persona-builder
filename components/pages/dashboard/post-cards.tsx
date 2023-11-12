'use client'

import { useReducer, useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  CampaignCardType,
  CampaignWritingToneType,
  campaignWritingTone,
  defaultCampaignCard
} from './campaign-card-types'
import { writingTone } from '@/types'

export function CampaignCards() {
  const [cardList, setCardList] = useState<CampaignCardType[]>([])

  return (
    <>
      <div className="flex justify-center mb-5">
        <button
          className="p-3 bg-red-700/70 text-red-200 rounded-md mb-5"
          onClick={() =>
            setCardList((entries) => [
              ...entries,
              { ...defaultCampaignCard, id: uuid().toString() }
            ])
          }
        >
          Add Card
        </button>
      </div>
      {cardList.map((entry) => (
        <CardForms key={entry.id} card={entry} />
      ))}
    </>
  )
}

function CardForms({ card }: { card: CampaignCardType }) {
  const [state, dispatch] = useReducer(
    (state: CampaignCardType, nextState: Partial<CampaignCardType>) => ({
      ...state,
      ...nextState
    }),
    card
  )
  return (
    <div className="p-5 w-[600px] border-2 bg-orange-200 rounded-lg mb-2">
      <div className="font-semi-bold text-red-700 mb-2">Title</div>
      <input
        type="text"
        className="py-1 px-2 text-red-700 mb-5 w-full"
        value={state.title}
        onChange={(e) => dispatch({ title: e.target.value })}
        maxLength={30}
      />
      <div className="font-semi-bold text-red-700 mb-2">Writing Tone</div>
      <select
        className="select-sm py-1 px-2 text-red-700 mb-5 w-full"
        value={state.writingTone}
        onChange={(entry) => {
          dispatch({
            writingTone: entry.target.value as CampaignWritingToneType
          })
        }}
      >
        {campaignWritingTone.map((entry) => (
          <option key={entry}>{entry}</option>
        ))}
      </select>
    </div>
  )
}
