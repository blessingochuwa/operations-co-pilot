# Loom Script — Operations Co-Pilot (90 seconds)

---

**Open (5 s)**

"This is Operations Co-Pilot — a live triage agent I built that takes any operational request, checks it against your tool stack, and hands back a structured fix and plan in seconds. Let me show you."

---

**Submit a request (20 s)**

Clear the placeholder text and type — or paste — this request:

> A vendor invoice is overdue and the supplier is chasing us.

Click **Triage this**.

While it loads, say:

"The request goes to a Vercel serverless function, which calls Claude Sonnet with a strict JSON contract. Temperature zero — no creativity, just structured reasoning."

---

**Show the triage card (30 s)**

Walk through each section as it appears:

- **Type badge and priority:** "Finance Ops, P1 — this is a now problem."
- **Quick fix:** "Check HubSpot for the invoice, flag to Finance. One tool, one action."
- **Stack touch:** "HubSpot and Gmail — exactly what you'd expect."
- **Plan:** "Four steps, each with an owner. Ops does the legwork, Finance signs off, we archive it in Drive."
- **Success metric:** "Invoice marked paid and vendor confirmed. Measurable."

---

**Approve and initiate (25 s)**

Scroll to the approval controls.

"Nothing moves without human sign-off. Two approvals required — Operations Lead and the relevant Stakeholder."

Check **Approve as Operations Lead**.
Check **Approve as Stakeholder**.

Watch the **Initiate build** button activate.

"The button is disabled until both are checked. If the quick fix sends something externally — an email, a payment — there's a third gate."

Click **Initiate build**.

"Done. In production, this logs to the Ops Log and pings the owner in Slack. Here it confirms the item is in progress."

---

**Close (10 s)**

"The reasoning core and the approval flow are live right now. Slack intake, ClickUp task creation, and the Ops Log are the next layer — built on the same contract. This is the front door."

---

**Click path summary**

1. Load the app at the Vercel URL.
2. Paste the vendor-payment request into the intake form.
3. Click **Triage this** and wait for the card to render.
4. Read through the triage card (type, priority, quick fix, stack touch, plan, success metric).
5. In approval controls, check **Approve as Operations Lead**.
6. Check **Approve as Stakeholder**.
7. Click **Initiate build**.
8. Show the confirmation state.
