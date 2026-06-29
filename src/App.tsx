import { useState, useRef } from 'react'
import { IntakeComposer } from './components/IntakeComposer'
import { TriageCard } from './components/TriageCard'
import { ApprovalControls } from './components/ApprovalControls'
import type { TriageResult } from './agent/types'

const STATUS_STEPS = [
  'Reading your request…',
  'Checking the tool stack…',
  'Scoring priority and impact…',
  'Drafting quick fix and plan…',
  'Finalising triage result…',
]

type Phase = 'intake' | 'loading' | 'review' | 'initiated'

export default function App() {
  const [phase, setPhase] = useState<Phase>('intake')
  const [request, setRequest] = useState('')
  const [result, setResult] = useState<TriageResult | null>(null)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function startStatusRotation() {
    clearTimers()
    STATUS_STEPS.forEach((s, i) => {
      timers.current.push(setTimeout(() => setStatusMessage(s), i * 900))
    })
  }

  async function handleSubmit(req: string) {
    setRequest(req)
    setError('')
    setResult(null)
    setPhase('loading')
    startStatusRotation()

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: req }),
      })

      const text = await res.text()
      let data: unknown
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Service temporarily unavailable. Please try again.')
      }

      if (!res.ok) {
        throw new Error((data as { error?: string }).error ?? 'Triage failed')
      }

      setResult(data as TriageResult)
      setPhase('review')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.')
      setPhase('intake')
    } finally {
      clearTimers()
      setStatusMessage('')
    }
  }

  function handleReset() {
    setPhase('intake')
    setRequest('')
    setResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-text">
      {/* Header */}
      <header className="bg-ink text-white px-7 py-6">
        <div className="flex items-center gap-2.5 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full bg-amber"
            style={{ boxShadow: '0 0 0 4px rgba(217,154,69,0.2)' }}
          />
          <span className="font-mono text-[11px] tracking-[2px] uppercase text-[#A9B6B1]">
            Live agent · powered by Claude
          </span>
        </div>
        <h1 className="font-display font-bold text-[30px] tracking-tight leading-tight">
          Operations Co-Pilot
        </h1>
        <p className="mt-2 text-[#C4CECA] text-sm max-w-2xl leading-relaxed">
          Submit an operational request. The agent reviews it against your tool stack, drafts a quick
          fix and a short plan, and routes it for approval before anything is built or sent.
        </p>
        <p className="mt-3 text-xs text-[#8C9A95]">
          Built by{' '}
          <span className="text-amber font-semibold">Blessing Ochuwa Aghedo</span>
          {' '}&middot; Operations &amp; AI-automation specialist
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-7 py-6">
        {(phase === 'intake' || phase === 'loading') && (
          <IntakeComposer
            onSubmit={handleSubmit}
            loading={phase === 'loading'}
            statusMessage={statusMessage}
            error={error}
          />
        )}

        {(phase === 'review' || phase === 'initiated') && result && (
          <>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display font-semibold text-[18px] text-ink">Triage result</h2>
              <button
                onClick={handleReset}
                className="text-sm text-muted hover:text-text underline underline-offset-2 transition-colors"
              >
                New request
              </button>
            </div>
            <p className="text-sm text-muted italic mb-1">
              &ldquo;{request}&rdquo;
            </p>

            <TriageCard result={result} />

            {phase === 'review' ? (
              <ApprovalControls
                result={result}
                onInitiate={() => setPhase('initiated')}
              />
            ) : (
              <div
                className="mt-5 rounded-2xl px-5 py-4 animate-rise"
                style={{ background: '#EAF4F2', border: '1px solid rgba(47,111,102,0.25)' }}
              >
                <p className="font-display font-semibold text-[15px] text-teal">
                  Build initiated.
                </p>
                <p className="text-[13px] mt-1" style={{ color: '#4A7A71' }}>
                  This item is approved and in progress. Log it in ClickUp and notify the owner via
                  Slack.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-sm font-semibold text-teal underline underline-offset-2 hover:text-ink transition-colors"
                >
                  Submit another request
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
