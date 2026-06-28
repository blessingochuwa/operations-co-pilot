import { useState } from 'react'

const EXAMPLES = [
  'A vendor invoice is overdue and the supplier is chasing us.',
  'Two teams keep losing track of who owns the annual retreat planning.',
  'We think we pay for two tools that do the same thing.',
]

interface IntakeComposerProps {
  onSubmit: (request: string) => void
  loading: boolean
  statusMessage: string
  error?: string
}

export function IntakeComposer({ onSubmit, loading, statusMessage, error }: IntakeComposerProps) {
  const [value, setValue] = useState('')

  function handleSubmit() {
    if (value.trim() && !loading) onSubmit(value.trim())
  }

  return (
    <div className="bg-white border border-line rounded-2xl p-5 animate-rise">
      <div className="flex items-baseline justify-between mb-3">
        <label className="font-display font-semibold text-[15px] text-ink">
          What is the operational issue?
        </label>
      </div>

      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={5}
        placeholder="Describe the issue in plain language. The agent will triage it, check the stack, and draft a quick fix and plan."
        className="w-full resize-y border border-line rounded-xl px-3.5 py-3 text-[13.5px] leading-relaxed text-text bg-[#FCFBF8] placeholder:text-muted focus:outline-none focus:border-amber transition-colors"
        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit() }}
      />

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            onClick={() => setValue(ex)}
            className="text-[11.5px] text-muted border border-line rounded-lg px-2.5 py-1 bg-white hover:border-amber hover:text-text transition-colors"
          >
            {ex.length > 52 ? ex.slice(0, 52) + '…' : ex}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <button
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
          className="font-display font-semibold text-sm bg-ink text-white rounded-xl px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:translate-y-px transition-all"
        >
          {loading ? 'Triaging…' : 'Triage this →'}
        </button>
        {loading && (
          <span className="text-[13px] text-muted animate-pulse">
            {statusMessage}
          </span>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-[#FBEFEC] border border-[#E7C4BA] text-coral rounded-xl px-4 py-3 text-[13.5px]">
          {error}{' '}
          <button
            onClick={handleSubmit}
            className="underline underline-offset-2 font-semibold"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
