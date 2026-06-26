# OPPORTUNITY #005 — Score 83/100
## The LinkedIn Cold Message Problem

---

### THE PROBLEM

Founders, sales reps and recruiters send hundreds of LinkedIn messages every week. The average response rate is 3–8%. The reason is always the same: the messages are generic, copy-pasted, and the recipient knows it in 2 seconds.

The people who get 30–40% response rates do one thing differently: they research each prospect before writing. They reference a recent post, a job change, a shared connection, a specific project. This takes 10–15 minutes per message — which is why nobody does it at scale.

**Evidence of demand:**
- r/sales: "How do I improve my LinkedIn response rates?" — weekly thread, thousands of upvotes
- r/startups: "Cold outreach that actually works" — recurring high-engagement post
- Indie Hackers: Multiple products in this space with $5k-$50k MRR
- Search volume: "LinkedIn outreach tool" — 12,000/month, "personalized LinkedIn messages" — 6,600/month
- X/Twitter: "LinkedIn cold messages" trends monthly among founders

---

### DEMAND SCORE BREAKDOWN

| Dimension | Score |
|-----------|-------|
| Problem frequency | 9/10 — everyone doing B2B faces this |
| Willingness to pay | 8/10 — existing tools charge $50-200/mo and still sell |
| Competition gap | 6/10 — tools exist but room for simpler/cheaper |
| Build complexity | 8/10 — achievable solo in 2-3 weeks |
| **Total** | **83/100** |

---

### COMPETITION LANDSCAPE

| Competitor | Price | Weakness |
|------------|-------|----------|
| Expandi | $99/mo | Focuses on automation volume, not personalization quality |
| Lemlist | $59/mo | Email-first, LinkedIn is secondary feature |
| Dripify | $59/mo | Sequences-focused, not personalization AI |
| Clay | $149/mo | Very powerful but complex — overkill for solo founders |
| Manual research | Free | 10-15 min per message, doesn't scale |

**The gap:** A simple tool that takes a LinkedIn profile URL, reads their recent activity (posts, job changes, shared interests) and generates a genuinely personalized first message — under $30/month, no complex sequences or automation.

---

### SUGGESTED BUSINESS MODEL

- **SaaS** · Monthly subscription
- **Price:** $19/month (50 personalizations) · $39/month (unlimited)
- **Target:** B2B founders, sales reps, recruiters, consultants
- **ROI for customer:** One extra deal closed from better outreach = 100x return on $19

---

### RECOMMENDED MVP (build this first)

A web app where the user:
1. Pastes a LinkedIn profile URL
2. The tool scrapes public profile data (posts, bio, experience, recent activity)
3. Claude API generates 3 personalized message variants
4. User picks one, copies it, sends manually on LinkedIn

**No automation. No LinkedIn API (gray area). No scheduling.** Just the personalization layer. The user still sends manually — this keeps it legally clean and the focus on quality over volume.

Stack: Next.js + Supabase + Claude API + ScrapingBee or Apify for LinkedIn scraping

---

### EXECUTION ROADMAP

**Week 1:** LinkedIn scraper (public data only) + Claude prompt integration
**Week 2:** Message variants UI + copy-to-clipboard + basic auth
**Week 3:** Usage tracking + Stripe billing
**Month 2:** Chrome extension (personalize directly on LinkedIn page)
**Month 3:** CRM-lite (track who you messaged, response tracking)

---

### VALIDATION STRATEGY (before writing code)

1. Post on X/Twitter: "I built a tool that writes personalized LinkedIn messages in 30 seconds — here are 3 examples" — attach real before/after examples made manually
2. Offer 10 beta spots at $9 one-time to the first 10 people who reply
3. Do it manually for 5 people using Claude — if they love the results, automate it
4. Target: 10 people pay before you write the scraper

---

### CLAUDE / CURSOR PROMPT

```
Build a LinkedIn message personalizer SaaS with Next.js and Supabase.

Core flow:
1. User inputs a LinkedIn profile URL
2. Backend scrapes public profile data using ScrapingBee API (bio, headline, recent posts, experience, education)
3. Send scraped data to Claude API with this prompt:
   "You are an expert at writing personalized LinkedIn connection messages. 
   Based on this person's profile: [PROFILE DATA], write 3 different first messages (under 300 characters each) 
   that reference something specific about them. Be genuine, not salesy. 
   No 'I came across your profile'. Each message should have a different angle."
4. Display 3 message variants with copy buttons
5. Track usage per user (limit free tier to 5/month)

Auth: Supabase Auth
Billing: Stripe (usage-based or subscription)
Stack: Next.js 14, Supabase, Claude API (claude-sonnet-4-6), ScrapingBee, Tailwind
```

---

*Opportunity #005 · Business Hunter Pain Radar*
*Score: 83/100 · Category: SaaS · Market: B2B Founders & Sales*
