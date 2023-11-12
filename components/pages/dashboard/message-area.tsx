'use client'

export function MessageArea({ campaignId }: { campaignId: string }) {
  return (
    <>
      <div className="p-5 w-[600px] border-2 bg-orange-200 rounded-lg mb-5">
        <div className="font-bold text-red-700 mb-5">Post Composer</div>
        <textarea
          name="Message"
          id="message"
          rows={4}
          className="w-full mb-5"
        />
        <div className="flex justify-end">
          <button className="p-3 bg-red-700/70 rounded-md text-red-200">
            Generate
          </button>
        </div>
      </div>
    </>
  )
}
