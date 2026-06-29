# Loom Script — Operations Co-Pilot (~3 minutes)

---

## Before you record

- Open the app at your Vercel URL in a clean browser window (no other tabs visible)
- Have the vendor-invoice request ready to paste
- Use a quiet room — the script is conversational, not read-aloud
- Record your screen + webcam bubble if possible; it adds trust

---

## Script

---

### The Problem (15 s)

Start with the screen off-camera or on a blank tab. Look at the camera.

> "If you've ever worked in operations, you know this feeling — someone drops a request into Slack, there's no context, no owner, no clear next step. It sits there until someone chases it or it becomes an emergency.
>
> This is what I built to fix that."

Switch to the app.

---

### What This Is (10 s)

Show the intake screen.

> "Operations Co-Pilot is an AI triage agent. You give it an operational request in plain English — anything from a vendor payment to a process question — and it does the thinking: categorises it, assigns a priority, identifies which tools are involved, and gives you a four-step action plan with owners. All in a few seconds."

---

### Submit a Request (20 s)

Click into the text field and type — or paste — this request slowly so viewers can read it:

> A vendor invoice is overdue and the supplier is chasing us.

Alternatively, use the **process automation prompt** below if you want to show a different angle — see *Demo Option B* at the end of this script for full walkthrough notes.

> Every time we onboard a new client, someone on the ops team manually creates a Notion workspace, sets up a ClickUp project, and sends a welcome email by hand. It takes 3 to 4 hours per client and we're missing steps half the time.

Pick one for your main recording. The automation prompt shows a very different output and is worth a separate cut or a second demo if you want to show range.

Click **Triage this**.

> "I'm hitting the triage button. What happens now is a request goes from this browser to a Vercel serverless function — so the AI key never touches the front end — and that function calls Claude Sonnet with a very precise instruction set. Temperature zero. No guessing, no creativity. Pure structured reasoning."

While the loading animation plays, let it breathe. Don't rush.

---

### The Triage Card (45 s)

When the card appears, walk through it field by field. Don't rush. Let viewers read each section.

**Type and Priority**
> "Type: Finance Ops. Priority: 1 out of 5 — this is a right now problem. The agent recognised this is time-sensitive because a supplier is actively chasing."

**Quick Fix**
> "Quick fix: check HubSpot for the invoice record, confirm the amount, and flag immediately to Finance. One tool. One action. No ambiguity about where to start."

**Stack Touch**
> "Stack touch tells you exactly which tools in your system are involved — HubSpot for the invoice record, Gmail to communicate with the supplier. If you're onboarding someone new, this is the map they need."

**Recommended Home**
> "Recommended home is where this item should live permanently — in this case, the Finance Ops tracker in Notion. Everything gets a place."

**The Plan**
> "And here's the four-step plan with named owners. Ops checks the record, Finance approves payment, Ops sends the confirmation to the supplier, then archives in Google Drive. Step-by-step, no interpretation required."

**Success Metric**
> "Finally, the success metric: invoice marked paid and supplier confirms receipt. You know exactly when this is done. No wondering if it's resolved."

---

### The Approval Gate (30 s)

Scroll down to the approval controls.

> "Now here's the part I think matters most — and it's non-negotiable in the design."

Point at the disabled Initiate Build button.

> "Nothing moves without human sign-off. That button is locked until two people approve: the Operations Lead and the relevant Stakeholder. This is intentional. AI can triage and plan, but a human has to own the decision to act."

Check **Approve as Operations Lead**.

> "Ops lead confirms the plan makes sense."

Check **Approve as Stakeholder**.

> "Stakeholder signs off."

Watch the button activate.

> "Now the button unlocks. And if the quick fix involves sending something outside the team — an email to a vendor, a payment — there's a mandatory third confirmation gate before anything external happens."

Click **Initiate Build**. Show the confirmation state.

> "In production, this would post a notification to the owner's Slack channel and log the item to the Ops Log with a timestamp and the approvers' names. Full audit trail."

---

### What's Live vs. What's Next (25 s)

> "What you're looking at right now is the core engine: the triage logic, the structured output, and the approval flow. That's all live and deployed."

Pause.

> "But this is designed to be the first layer of something bigger. Here's the roadmap."

You can show a simple list on screen or just talk through it:

> "**Next:** Slack integration — so instead of a web form, an operational request comes in as a Slack message. The agent triages it in-thread, tags the right person, and posts the plan. No one has to leave Slack.
>
> After that: document upload. You drag in an SOP, a vendor contract, or a messy process doc, and the agent reads it as context before triaging. The output becomes much richer — it can flag what's missing, what contradicts existing process, what needs updating.
>
> Then: deep-research mode. Instead of a quick plan, you ask it to investigate an operational problem in depth — research the tool options, compare against your stack, come back with a written recommendation brief ready for a team meeting.
>
> And finally: the Ops Log. Every triage, every approval, every action — timestamped and searchable. Your operational history, automatically documented."

---

### The Plug-In Vision (15 s)

> "The reason I architected this as a serverless function with a strict JSON contract is exactly so it can plug into anything. Slack, ClickUp, HubSpot, a webhook, a custom dashboard — the reasoning engine doesn't change. Only the surface does. This isn't a standalone app. It's the intelligence layer that sits underneath whatever tools your team already uses."

---

### Close (10 s)

Look at the camera.

> "I built this because I've seen firsthand what happens when operational requests disappear into Slack and never get resolved. This is what I think the fix looks like.
>
> The code is on GitHub, the app is live — links are in the description."

---

## Click Path Summary

1. Open the app at the Vercel URL.
2. Read the intake screen — note the tool stack listed at the bottom.
3. Paste the vendor-payment request into the field.
4. Click **Triage this** and narrate what's happening server-side while it loads.
5. Walk through the triage card top to bottom: type → priority → quick fix → stack touch → recommended home → plan → success metric.
6. Scroll to approval controls. Explain the locked button.
7. Check **Approve as Operations Lead**.
8. Check **Approve as Stakeholder**.
9. Click **Initiate Build**. Show confirmation.
10. Cut to camera for the roadmap and close.

---

## Timing Guide

| Section | Target |
|---|---|
| The Problem | 0:00 – 0:15 |
| What This Is | 0:15 – 0:25 |
| Submit a Request | 0:25 – 0:45 |
| The Triage Card | 0:45 – 1:30 |
| The Approval Gate | 1:30 – 2:00 |
| What's Live vs. Next | 2:00 – 2:25 |
| The Plug-In Vision | 2:25 – 2:40 |
| Close | 2:40 – 2:50 |

**Total: ~2 minutes 50 seconds**

---

## Demo Option B — Process Automation / Simplification

Use this as a second Loom cut or a follow-up demo. It shows a completely different capability: proactive process improvement rather than reactive incident triage.

---

### The Prompt

Paste this into the intake field:

> Every time we onboard a new client, someone on the ops team manually creates a Notion workspace, sets up a ClickUp project, and sends a welcome email by hand. It takes 3 to 4 hours per client and we're missing steps half the time.

---

### What the Agent Will Return

The triage result for this prompt will look roughly like this. Familiarise yourself with it before recording so you can narrate with confidence.

| Field | Expected Output |
|---|---|
| **Type** | Process / SOP |
| **Priority** | 3 (important, not urgent — a recurring cost, not a fire) |
| **Owner** | Ops Lead |
| **Stack Touch** | Notion, ClickUp, Gmail, Zapier |
| **Recommended Home** | Ops Playbook in Notion |
| **Quick Fix** | Document the current manual steps as an SOP in Notion before automating — you can't automate what isn't defined |
| **Plan** | Map the exact steps → Build a Zapier workflow that triggers on a new client record in HubSpot → Auto-creates Notion workspace and ClickUp project → Sends templated welcome email → Test with a sandbox client → Train ops team |
| **Success Metric** | New client onboarding completed in under 30 minutes with zero manual steps missed |

---

### Narration Guide (layer this over the walkthrough)

**On Type and Priority:**
> "Process slash SOP — this isn't an emergency, it's a drain. Priority 3 means it's costing the team time every single week, which adds up fast at three clients a week."

**On Quick Fix:**
> "The quick fix is actually to document first, not automate first. That's intentional — you can't build a reliable automation on top of an undefined process. The agent knows this."

**On Stack Touch:**
> "Four tools: Notion, ClickUp, Gmail, and Zapier. That's exactly the automation surface — Zapier is the glue that removes the human from the middle."

**On the Plan:**
> "The plan has a clear sequence: define it, build it, test it, train the team. Four steps, each with an owner. No skipping to automation before the process is documented."

**On Success Metric:**
> "Thirty minutes, zero missed steps. That's measurable. You run this for one month and you know exactly whether it worked."

---

### Why This Demo Matters

The vendor invoice demo shows the agent handling something urgent. This demo shows it handling something chronic — a slow, invisible drain on team capacity.

Together they demonstrate that this is not a one-trick tool. It handles the full spectrum of operational requests: fires, inefficiencies, process gaps, and tooling questions. That range is worth showing explicitly if you're pitching it to an ops-mature audience.

---

### Suggested Voiceover for the Transition (if doing both demos in one video)

After showing the vendor invoice result, say:

> "That was a live incident. Let me show you what happens when the request isn't urgent — when it's the kind of thing that's been quietly costing the team hours every week."

Then paste the onboarding prompt and run it.
