import { useState } from 'react'
import type { TriageResult } from '../agent/types'

interface ApprovalControlsProps {
  result: TriageResult
  onInitiate: () => void
}

export function ApprovalControls({ result, onInitiate }: ApprovalControlsProps) {
  const [opsApproved, setOpsApproved] = useState(false)
  const [stakeholderApproved, setStakeholderApproved] = useState(false)
  const [externalConfirmed, setExternalConfirmed] = useState(false)

  const baseReady = opsApproved && stakeholderApproved
  const canInitiate = result.external_send ? baseReady && externalConfirmed : baseReady

  return (
    <div className="mt-5 bg-white border border-line rounded-2xl p-5 space-y-4 animate-rise">
      <div className="font-display font-semibold text-[15px] text-ink">
        Review required before build starts
      </div>

      {result.external_send && (
        <div className="bg-[#FBF0DC] border border-[#EDE0C0] rounded-xl px-4 py-3 flex gap-2.5">
          <span className="text-amber font-bold text-sm mt-px">!</span>
          <div>
            <p className="text-[13px] font-semibold text-[#7C5A1E]">
              This quick fix sends something externally.
            </p>
            <p className="text-[12.5px] text-[#7C5A1E] mt-0.5">
              Confirm the external action is correct before approving.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        <ApprovalRow
          checked={opsApproved}
          onChange={setOpsApproved}
          label="Approve as Operations Lead"
        />
        <ApprovalRow
          checked={stakeholderApproved}
          onChange={setStakeholderApproved}
          label={`Approve as Stakeholder (${result.owner})`}
        />
        {result.external_send && (
          <ApprovalRow
            checked={externalConfirmed}
            onChange={setExternalConfirmed}
            label="I confirm the external action is correct and approved to send"
            danger
          />
        )}
      </div>

      <button
        onClick={onInitiate}
        disabled={!canInitiate}
        className="w-full font-display font-semibold text-sm py-3 rounded-xl transition-all disabled:cursor-not-allowed"
        style={{
          background: canInitiate ? '#152229' : '#E8E2D7',
          color: canInitiate ? '#ffffff' : '#6E7872',
        }}
      >
        {canInitiate ? 'Initiate build →' : 'Initiate build (approvals required)'}
      </button>
    </div>
  )
}

function ApprovalRow({
  checked,
  onChange,
  label,
  danger = false,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  danger?: boolean
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          background: checked ? (danger ? '#C2553D' : '#2F6F66') : '#ffffff',
          borderColor: checked ? (danger ? '#C2553D' : '#2F6F66') : '#E8E2D7',
        }}
      >
        {checked && <span className="text-white text-[10px] font-bold">✓</span>}
      </div>
      <span
        className="text-[13px] select-none transition-colors"
        style={{ color: checked ? '#1B2A2F' : '#6E7872', fontWeight: checked ? 500 : 400 }}
      >
        {label}
      </span>
    </label>
  )
}
