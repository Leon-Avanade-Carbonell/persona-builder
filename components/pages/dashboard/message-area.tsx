'use client'

import { useComposerContext } from '@/components/context/DashboardComposerContext'
import { useState } from 'react'

export function MessageArea() {
  const [current, setCurrent] = useState('')
  const { dispatch } = useComposerContext()

  return (
    <>
      <div className="p-5 w-[600px] border-2 bg-orange-200 rounded-lg mb-5">
        <div className="font-bold text-red-700 mb-5">Post Composer</div>
        <textarea
          name="Message"
          id="message"
          rows={4}
          className="p-2 text-red-700 w-full mb-5"
          value={current}
          onChange={(entry) => setCurrent(entry.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="p-3 bg-red-700/70 rounded-md text-red-200 disabled:bg-slate-500/30 disabled:text-slate-100"
            disabled={!(current.length >= 1)}
            onClick={() => dispatch({ message: current })}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  )
}
