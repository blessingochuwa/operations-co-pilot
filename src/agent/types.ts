export type TriageType =
  | 'Vendor / Payments'
  | 'Tooling & Source of Truth'
  | 'Process / SOP'
  | 'Onboarding'
  | 'AI Adoption'
  | 'Finance Ops'
  | 'Hiring'
  | 'Other'

export interface PlanStep {
  step: string
  owner: string
}

export interface TriageResult {
  type: TriageType
  priority: number
  owner: string
  stack_touch: string[]
  recommended_home: string
  dependencies: string[]
  quick_fix: string
  external_send: boolean
  plan: PlanStep[]
  success_metric: string
}
