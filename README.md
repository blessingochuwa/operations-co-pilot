# Operations Co-Pilot

An operational intake and triage agent. A person submits a request ("a vendor invoice is overdue", "two teams keep losing track of who owns a retreat", "we think we pay for two tools that do the same thing"). The agent reviews it against the team's current tool stack and its dependencies, drafts an immediate quick fix and a short plan, and routes it for approval before any build starts.

Built by **Blessing Ochuwa Aghedo** — Operations and AI-automation specialist.

---

## Architecture

```
Browser (React + Vite + Tailwind)
        |
        | POST /api/triage { request: "..." }
        v
Vercel Serverless Function  (api/triage.ts)
        |
        | Anthropic Messages API
        v
Claude claude-sonnet-4-6  (temperature: 0)
        |
        | Raw JSON — TriageResult
        v
Browser: Triage Card  +  Approval Controls
```

The browser never sees the API key. All Claude calls happen server-side in the `/api/triage` function. The MODEL constant in `api/triage.ts` is the single place to bump the model.

---

## Repo structure

```
api/triage.ts           serverless function: takes the request + stack, calls Claude, returns triage JSON
src/agent/prompt.ts     system prompt + JSON schema (the contract)
src/agent/types.ts      TriageResult type, matching the contract
src/components/         IntakeComposer, TriageCard, ApprovalControls
src/App.tsx             composes the full flow
src/config/stack.ts     the team's tool stack (swap this to retarget a different company)
README.md
LOOM_SCRIPT.md          recorded-walkthrough script
.env.example            lists ANTHROPIC_API_KEY (no real value)
```

---

## Setup

**Prerequisites:** Node 18+, `vercel` CLI logged in (`vercel login`), `gh` CLI logged in (`gh auth login`).

```bash
# 1. Install dependencies
npm install

# 2. Add your key
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the full dev stack (Vite frontend + /api routes)
npm run dev
# Opens on http://localhost:3000
```

> `npm run dev` runs `vercel dev`, which serves both the Vite frontend and the `/api/triage` serverless function locally on the same port.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key — server-side only, never in the browser |

---

## Retargeting for another company

Edit `src/config/stack.ts` to replace the tool list. The agent reasons only against the tools you list there. No other file needs to change.

---

## Deploy

```bash
# First deploy
vercel --prod

# Set the API key in the Vercel project
vercel env add ANTHROPIC_API_KEY production
```

Or via the Vercel dashboard: Project > Settings > Environment Variables.

---

## What is real vs designed

**Working today:**
- The reasoning core: `api/triage.ts` calls Claude with the full system prompt and returns schema-correct JSON.
- The intake form, triage card, and review-and-approve flow in the UI.
- The human approval gate (both Ops Lead and Stakeholder must approve; external-send items require a third confirmation).

**Separate production layer (not in this repo):**
- Slack intake listener and orchestrator routing.
- Live ClickUp task creation and Gmail action execution.
- Airtable (or equivalent) Ops Log for every triaged item.

This repo is the web front door and the reasoning core. The always-on orchestration layer is a separate deployment concern.
