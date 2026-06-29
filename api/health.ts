import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  return res.status(200).json({
    ok: true,
    node: process.version,
    apiKeySet: !!apiKey,
    apiKeyPrefix: apiKey ? apiKey.slice(0, 10) + '...' : null,
  })
}
