import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import { STACK } from '../src/config/stack'
import { buildSystemPrompt } from '../src/agent/prompt'
import type { TriageResult } from '../src/agent/types'

const MODEL = 'claude-sonnet-4-6'

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

    // Strip stray fences, then slice from first { to last }
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('No JSON object in response')
    text = text.slice(start, end + 1)

    const result = JSON.parse(text) as TriageResult

    if (!result.type || typeof result.priority !== 'number') {
      throw new Error('Invalid triage result shape')
    }

    return res.status(200).json(result)
  } catch (e) {
    console.error('[/api/triage]', e)
    return res.status(500).json({ error: 'Triage failed. Please try again.' })
  }
}
