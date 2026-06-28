import type { TriageResult, TriageType } from '../agent/types'

const TYPE_STYLE: Record<TriageType, { bg: string; fg: string }> = {
  'Vendor / Payments':        { bg: '#ECEFEA', fg: '#5C7355' },
  'Tooling & Source of Truth':{ bg: '#EDEBF4', fg: '#5A57A6' },
  'Process / SOP':            { bg: '#E9F0F4', fg: '#3E6E8C' },
  'Onboarding':               { bg: '#F0EFE8', fg: '#6E7340' },
  'AI Adoption':              { bg: '#FBEEDC', fg: '#B5792A' },
  'Finance Ops':              { bg: '#EAF1F0', fg: '#2F6F66' },
  'Hiring':                   { bg: '#F4ECEC', fg: '#9A5650' },
  'Other':                    { bg: '#EDEAE3', fg: '#6E7872' },
}

function priorityStyle(p: number) {
  if (p >= 4) return { label: 'P1', bg: '#FBEEEB', color: '#C2553D' }
  if (p === 3) return { label: 'P2', bg: '#FBF0DC', color: '#D99A45' }
  return          { label: 'P3', bg: '#EAF1F0', color: '#2F6F66' }
}

interface TriageCardProps {
  result: TriageResult
}

export function TriageCard({ result }: TriageCardProps) {
  const typeStyle = TYPE_STYLE[result.type] ?? TYPE_STYLE['Other']
  const pr = priorityStyle(result.priority)

  return (
    <div className="bg-white border border-line rounded-2xl p-5 space-y-5 animate-rise">
      {/* Type + priority row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold"
          style={{ background: typeStyle.bg, color: typeStyle.fg }}
        >
          {result.type}
        </span>
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border"
            style={{ background: pr.bg, color: pr.color, borderColor: pr.color + '40' }}
          >
            {pr.label}
          </span>
          <span className="flex gap-0.5" aria-label={`Priority ${result.priority} of 5`}>
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                style={{ color: i <= result.priority ? '#D99A45' : '#E8E2D7', fontSize: 10 }}
              >
                ●
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Owner */}
      <div className="text-[13px] text-muted">
        <span className="font-semibold text-text">Owner:</span> {result.owner}
      </div>

      {/* Quick fix */}
      <div className="bg-[#FDFAF4] border border-[#EDE5CC] rounded-xl px-4 py-3.5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-amber mb-1.5">
          Quick fix
        </div>
        <p className="text-[13.5px] leading-snug font-semibold text-ink">{result.quick_fix}</p>
        {result.external_send && (
          <div className="mt-2 flex items-center gap-1.5 text-coral text-[12px] font-semibold">
            <span>!</span>
            <span>Sends externally — approval required before acting</span>
          </div>
        )}
      </div>

      {/* Stack touch */}
      {result.stack_touch.length > 0 && (
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
            Stack touch
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.stack_touch.map(tool => (
              <span
                key={tool}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md font-medium"
                style={{ background: '#EDEBF4', color: '#5A57A6' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended home + dependencies */}
      <div className="grid grid-cols-2 gap-4">
        {result.recommended_home && (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
              Recommended home
            </div>
            <span
              className="font-mono text-[11px] px-2.5 py-1 rounded-md font-semibold"
              style={{ background: '#EAF1F0', color: '#2F6F66' }}
            >
              {result.recommended_home}
            </span>
          </div>
        )}
        {result.dependencies.length > 0 && (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
              Dependencies
            </div>
            <ul className="space-y-1">
              {result.dependencies.map((dep, i) => (
                <li key={i} className="text-[12.5px] text-text flex gap-1.5">
                  <span className="text-muted mt-px">·</span>
                  {dep}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Plan */}
      {result.plan.length > 0 && (
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
            Plan
          </div>
          <ol className="space-y-2">
            {result.plan.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-[10px] font-bold text-white bg-ink rounded-md w-5 h-5 flex items-center justify-center flex-shrink-0 mt-px">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-text">{step.step}</span>
                  <span className="ml-2 font-mono text-[10px] text-muted">{step.owner}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Success metric */}
      <div className="border-t border-line pt-4 flex items-start gap-2">
        <span className="text-teal text-[13px] mt-px">✓</span>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Success:{' '}
          </span>
          <span className="text-[13px] font-medium" style={{ color: '#4A7A71' }}>
            {result.success_metric}
          </span>
        </div>
      </div>
    </div>
  )
}
