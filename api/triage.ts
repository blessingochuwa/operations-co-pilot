import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-sonnet-4-5'

const STACK = [
  { name: 'Notion', purpose: 'knowledge and SOPs' },
  { name: 'ClickUp', purpose: 'projects and tasks' },
  { name: 'HubSpot', purpose: 'clients, deals, vendors' },
  { name: 'Zapier', purpose: 'automation' },
  { name: 'Google Drive', purpose: 'files and contracts' },
  { name: 'Slack', purpose: 'comms' },
  { name: 'Gmail', purpose: 'email' },
]

function buildSystemPrompt(): string {
  return `You are an operations triage agent for a startup. A team member submits a single operational request or issue. You review it against their current tool stack and return a structured triage as raw JSON only — no explanation, no markdown, no code fences.

Return exactly this JSON shape:
{
  "type": "one of: Vendor / Payments | Tooling & Source of Truth | Process / SOP | Onboarding | AI Adoption | Finance Ops | Hiring | Other",
  "priority": 3,
  "owner": "the function that owns this, e.g. Ops, Finance, Ops + Finance",
  "stack_touch": ["Tool names from the stack this request involves"],
  "recommended_home": "The single existing tool to build or resolve this in",
  "dependencies": ["up to 3 things this depends on or blocks"],
  "quick_fix": "The immediate first action, naming the tool, max 20 words",
  "external_send": false,
  "plan": [
    { "step": "what to do", "owner": "who does it" }
  ],
  "success_metric": "Measurable definition of done, max 15 words"
}

Rules:
- type must be exactly one of the listed strings
- priority is an integer 1-5; 4-5 is P1 (highest business impact)
- stack_touch lists only tools from the provided stack; empty array if none apply
- recommended_home must be a tool from the provided stack; empty string if the stack cannot cover it
- dependencies has at most 3 items
- plan has at most 4 steps
- external_send is true only if quick_fix involves sending a message, email, or payment to a person or system outside the immediate team
- If the stack cannot cover this request, leave stack_touch empty, set recommended_home to empty string, and explain in the plan what is needed and why
- Do not invent tools to appear complete`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { request } = req.body as { request?: string }
  if (!request?.trim()) {
    return res.status(400).json({ error: 'request is required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' })
  }

  const client = new Anthropic({ apiKey })
  const stackContext = STACK.map(t => `- ${t.name}: ${t.purpose}`).join('\n')
  const userMessage = `Request: ${request.slice(0, 2000)}\n\nTool stack:\n${stackContext}`

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: userMessage }],
    })

    let text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim()

    text = text.replace(/```json/gi, '').replace(/```/g, '').trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('No JSON object in response')
    text = text.slice(start, end + 1)

    const result = JSON.parse(text)

    if (!result.type || typeof result.priority !== 'number') {
      throw new Error('Invalid triage result shape')
    }

    return res.status(200).json(result)
  } catch (e) {
    console.error('[/api/triage]', e)
    return res.status(500).json({ error: 'Triage failed. Please try again.' })
  }
}
