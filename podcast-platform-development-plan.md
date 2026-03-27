# Creator-First Podcast Platform Plan (Normal Podcast, 6-Month)

This document replaces the earlier agency-oriented framing.

## Product Positioning (Single Source of Truth)

Build a **creator/show website** for a normal podcast (Huberman/Lex-style model), not a production-agency website.

Primary goals:
1. Publish episodes reliably.
2. Make discovery and binge navigation effortless.
3. Grow subscribers across listening platforms.
4. Build direct audience channels (newsletter/text/community).

Not primary goals (phase 1):
- Selling agency services.
- Pricing/service tiers and B2B lead funnels.
- Complex CRM-heavy sales workflows.

---

## Research-Based Principles (What Current Top Shows Do)

- **Cross-platform listening is explicit:** top pages highlight YouTube, Apple Podcasts, Spotify, RSS as first-class actions.
- **Episode library is central:** homepage and dedicated episode index push latest, featured, and complete archive.
- **Topic-led discovery matters:** topic pages and tags help users navigate by interest, not only chronology.
- **Transcript access increases utility:** transcript links and searchable long-form text improve engagement and discoverability.
- **Creator voice builds loyalty:** host perspective, notes, and consistent editorial tone are visible throughout.

---

## Required Information Architecture

1. **Home**
   - Latest episode hero
   - Featured episodes
   - Topic entry points
   - Primary subscribe block (YouTube, Apple, Spotify, RSS)

2. **All Episodes**
   - Sort/filter by date, topic, format (solo/guest)
   - Fast pagination or infinite scroll

3. **Episode Detail**
   - Embedded player/video
   - Summary (short + long)
   - Show notes and chapter markers
   - Full transcript
   - Related episodes

4. **Topics**
   - Topic taxonomy page
   - Topic detail pages listing related episodes

5. **About**
   - Host bio, show mission, editorial promise

6. **Newsletter (or Updates)**
   - Signup page + inline blocks sitewide

7. **Sponsors / Partners** (optional in phase 1)
   - Sponsor info + disclosure policy

8. **Contact**
   - Lightweight contact path

9. **Legal**
   - Privacy, terms, disclosures

---

## Frontend Backbone Requirements

### Stack
- `Next.js` (App Router) + `TypeScript` strict
- Component-driven architecture
- Responsive design, mobile-first

### Core Components
- Global header/footer with subscribe CTAs
- Episode card/grid/list
- Topic chips and topic collections
- Audio/video player wrapper (accessible)
- Transcript viewer (expand/collapse + anchor support)
- Search input and filter UI
- Newsletter form component
- Related-content block
- Empty/loading/error states

### Data Contracts (typed)
- `Episode`, `Topic`, `Host`, `PlatformLink`, `TranscriptBlock`, `SponsorSlot`, `NewsletterCTA`
- Adapter layer so mock data can be swapped with CMS/API without UI refactor

### SEO & Discovery
- Unique metadata per page
- JSON-LD: `PodcastSeries`, `PodcastEpisode`, `Organization`
- Canonicals, Open Graph, sitemap readiness
- Transcript indexability and clean heading hierarchy

### Accessibility
- Keyboard navigable player and controls
- WCAG 2.2 AA contrast/focus/form standards
- Transcript and media controls screen-reader friendly
- No autoplay media

### Performance
- Image/media optimization
- Lazy loading below fold
- Minimized client-side JS for library pages

---

## What to Remove from Prior Agency Plan

Remove or deprioritize:
- Services pages and package pricing tables
- Case studies framed as client delivery outcomes
- “Book strategy call” as global primary CTA
- B2B qualification forms (budget/timeline lead scoring)
- CRM-first website architecture

Replace with:
- Subscribe-first CTA hierarchy
- Episode and topic discoverability as core UX
- Newsletter growth loops
- Creator credibility and editorial consistency

---

## Analytics Model (Creator Podcast)

Track these first:
- `episode_view`
- `podcast_play`
- `video_play_click`
- `transcript_open`
- `topic_click`
- `subscribe_click`
- `newsletter_signup`
- `search_performed`

Primary KPIs:
- Episode page depth (pages/session on content routes)
- Subscriber click-through rate by platform
- Newsletter signup conversion rate
- Returning visitor ratio
- Plays initiated per episode page view

---

## 6-Month Build Plan

### Month 1: Product and Content Model
- Lock taxonomy (topics, formats, metadata)
- Define page templates and event schema

### Month 2: Design System + Template UX
- Build design tokens, core components, and page skeletons

### Month 3: Core Frontend Build
- Implement Home, All Episodes, Episode Detail, Topics, About

### Month 4: Search, Transcript UX, SEO Layer
- Add search/filter, transcript behavior, metadata/schema

### Month 5: Integrations + QA
- Newsletter integration, analytics validation, accessibility and performance QA

### Month 6: Launch + Optimization
- Launch, monitor behavior, optimize discovery and subscribe flow

---

## Definition of Done

- Users can discover episodes by latest, featured, and topic.
- Every episode has summary, notes, media, and transcript.
- Subscribe actions are obvious and measurable.
- Accessibility and performance baselines are met.
- Architecture is CMS/API-ready without structural rewrite.

---

## Source Context for This Revision

This revision used:
- Original workspace research in `deep-research-report (1).md` (for technical baseline).
- Creator-platform patterns observed from:
  - Huberman Lab podcast structure (topic-led discovery, episode library, subscribe surfaces).
  - Lex Fridman podcast structure (latest/select/all episodes + transcript links + platform links).
  - Spotify for Creators RSS documentation (distribution and feed-management realities).
  - Apple Podcasts platform information (transcripts, subscriptions, listener behavior context).
