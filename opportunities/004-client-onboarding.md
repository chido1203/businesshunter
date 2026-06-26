# OPPORTUNITY #004 — Score 85/100
## The Client Onboarding Chaos Problem

---

### THE PROBLEM

Every time a freelancer or small agency wins a new client, they repeat the same manual process: send a welcome email, attach a contract, wait for signature, send an intake questionnaire, wait for answers, send invoice, chase payment, then finally start the work.

This process takes 3–7 days on average and happens entirely in email threads, Google Docs and WhatsApp messages. Nothing is automated. Nothing is tracked. Clients get confused. Freelancers get frustrated.

**Evidence of demand:**
- r/freelance: "What does your client onboarding look like?" — 340+ comments, recurring weekly
- r/webdev: "How do you handle contracts and onboarding?" — top monthly post
- Indie Hackers: Multiple founders built onboarding tools after their own frustration
- Search volume: "freelancer onboarding software" — 4,400/month, "client onboarding tool" — 8,100/month

---

### DEMAND SCORE BREAKDOWN

| Dimension | Score |
|-----------|-------|
| Problem frequency | 9/10 — every freelancer faces this |
| Willingness to pay | 8/10 — Dubsado at $20/mo has 80k+ users |
| Competition gap | 7/10 — existing tools are complex or expensive |
| Build complexity | 8/10 — achievable solo in 3-4 weeks |
| **Total** | **85/100** |

---

### COMPETITION LANDSCAPE

| Competitor | Price | Weakness |
|------------|-------|----------|
| Dubsado | $20/mo | Overwhelming for solo freelancers — 100+ features |
| HoneyBook | $19/mo | US-focused, payment integration limited |
| 17hats | $45/mo | Outdated UI, steep learning curve |
| Manual (email + DocuSign) | Variable | No tracking, no automation, embarrassing |

**The gap:** No simple, AI-assisted onboarding tool designed specifically for solo freelancers who just need to look professional and get paid fast. Dubsado is overkill. Manual is a mess.

---

### SUGGESTED BUSINESS MODEL

- **SaaS** · Monthly subscription
- **Price:** $19/month (solo freelancer) · $39/month (small agency, up to 5 users)
- **Target:** Freelance designers, developers, copywriters, consultants, marketers
- **Market size:** 59M freelancers in the US + 50M in Europe — even 0.01% is 10,000 customers

---

### RECOMMENDED MVP (build this first)

A simple web app where the freelancer:
1. Creates an onboarding template (welcome message + contract + intake form)
2. Sends one link to the client
3. Client fills everything in one page, signs and pays
4. Freelancer gets notified when it's done

**No project management. No invoicing suite. No CRM.** Just the onboarding flow. One thing, done perfectly.

Stack: Next.js + Supabase + Stripe + DocuSeal (open-source e-signatures) — all free tiers available.

---

### EXECUTION ROADMAP

**Week 1-2:** Template builder + client portal (one link, one page)
**Week 3:** E-signature integration + payment trigger
**Week 4:** Email notifications + basic dashboard
**Month 2:** Contract templates library, intake form builder
**Month 3:** Agency features (multiple team members, client tracking)

---

### VALIDATION STRATEGY (before writing code)

1. Post in r/freelance: "Would you pay $19/mo for a tool that automates your entire client onboarding into one link?" — measure responses
2. DM 20 freelancers on X/LinkedIn with a Loom video showing the concept
3. Build a $0 Notion template simulating the flow and charge $9 one-time — if people buy it, they'll pay for the real tool
4. Target: 5 people say "I'd pay for this right now" before building

---

### CLAUDE / CURSOR PROMPT

```
Build a freelancer client onboarding SaaS with Next.js and Supabase.

Features needed:
- Auth (email + Google OAuth via Supabase)
- Onboarding template builder: welcome message, contract (rich text), intake form (custom fields), payment amount
- Shareable client link that shows all steps in sequence
- E-signature on contract using DocuSeal API
- Stripe payment collection after signature
- Email notification to freelancer when client completes all steps
- Simple dashboard showing pending/completed onboardings

Database tables: users, templates, onboardings, clients
Stack: Next.js 14 App Router, Supabase, Stripe, DocuSeal, Resend for emails, Tailwind CSS
```

---

*Opportunity #004 · Business Hunter Pain Radar*
*Score: 85/100 · Category: SaaS · Market: Freelancers & Agencies*
