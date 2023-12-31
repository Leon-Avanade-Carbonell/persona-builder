'use client'

import { Dispatch, useEffect, useReducer, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  CampaignCardType,
  CampaignPostType,
  CampaignWritingToneType,
  campaignWritingTone,
  defaultCampaignCard
} from './campaign-card-types'
import { useDashboardContext } from '@/components/context/DashboardContext'
import { useComposerContext } from '@/components/context/DashboardComposerContext'
import { useMutation } from '@tanstack/react-query'
import { CloseIcon } from '@/components/atoms/icons/close'
import { VAdjustmentsIcon } from '@/components/atoms/icons/adjustments'
import { RefreshIcon } from '@/components/atoms/icons/refresh'

export function CampaignCards({ campaignId }: { campaignId: string }) {
  const [cardList, setCardList] = useState<CampaignCardType[]>([
    { id: uuid().toString(), title: 'facebook', writingTone: 'informative' }
  ])

  function deleteCard(cardId: string) {
    setCardList((entries) => entries.filter((entry) => entry.id !== cardId))
  }

  return (
    <>
      {cardList.map((entry) => (
        <CardForms
          key={entry.id}
          campaignId={campaignId}
          card={entry}
          deleteCard={deleteCard}
        />
      ))}
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
    </>
  )
}

function CardForms({
  campaignId,
  card,
  deleteCard
}: {
  campaignId: string
  card: CampaignCardType
  deleteCard: Dispatch<string>
}) {
  const [state, dispatch] = useReducer(
    (state: CampaignCardType, nextState: Partial<CampaignCardType>) => ({
      ...state,
      ...nextState
    }),
    card
  )
  const [output, setOutput] = useState('')
  const [settings, setSettings] = useState(true)

  const { state: dashboardState } = useDashboardContext()
  const { state: messageState } = useComposerContext()
  const campaign = dashboardState.campaigns.find(
    (entry) => entry.id === campaignId
  )
  const onceRef = useRef(false)

  function mutateFn() {
    const requestBody = {
      description: campaign?.details || '',
      message: messageState.message,
      writingTone: state.writingTone,
      campaignKeywords: campaign?.keywords || ''
    } as CampaignPostType

    return fetch('/api/campaign-post', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
  }

  const postAPI = useMutation({
    mutationFn: mutateFn,
    onSuccess: async (res) => {
      const data = (await res.json()) as { message: string }
      setOutput(data.message)
    },
    onSettled: () => {
      onceRef.current = false
    }
  })

  function handleGenerate() {
    setOutput('')
    postAPI.mutate()
  }

  function handleClose() {
    deleteCard(card.id!)
  }

  useEffect(() => {
    if (!onceRef.current && messageState.message.length >= 1) {
      onceRef.current = true
      handleGenerate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageState.message])

  if (!campaign) return <>Campaign not found {campaignId}</>

  return (
    <div className="p-5 w-[600px] border-2 bg-orange-200 rounded-lg mb-2">
      <div className="flex flex-row justify-end">
        <button
          className="p-2 bg-red-300/10 hover:bg-orange-400 rounded-lg ml-2"
          onClick={() => setSettings(!settings)}
        >
          <VAdjustmentsIcon />
        </button>
        <button
          className="p-2 bg-red-300/10 hover:bg-orange-400 rounded-lg ml-2"
          onClick={handleGenerate}
        >
          <RefreshIcon />
        </button>
        <button
          className="p-2 bg-red-300/10 hover:bg-orange-400 rounded-lg ml-2"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="flex flex-col">
        {settings ? (
          <>
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
            <div className="flex justify-end">
              <button
                className="p-3 bg-red-700/70 rounded-md text-red-200 disabled:bg-slate-500/30 disabled:text-slate-100"
                disabled={
                  !(messageState.message.length >= 1) || postAPI.isPending
                }
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-row justify-between">
            <div className="font-bold text-red-700 mb-5">
              {card.title.length >= 1 ? card.title : 'Content'}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between">
        {output.length >= 1 && (
          <div className="flex flex-col w-full">
            <div className="divider" />
          </div>
        )}
        <div className="text-red-700 mb-2 max-h-[300px] overflow-y-auto">
          {postAPI.isPending ? (
            <div className="py-3 w-full text-center">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : (
            output
          )}
        </div>
      </div>
    </div>
  )
}
