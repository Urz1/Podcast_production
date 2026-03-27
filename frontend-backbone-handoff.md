# Frontend Engineer Handoff: Build the Unshakable Base (Podcast Platform)

## Mission
Build the frontend backbone for a creator-first podcast platform (normal podcast show), designed to scale for years without architectural rewrite.

This is not a quick marketing site. This is the base layer for all future growth: content scale, new templates, monetization modules, multi-platform distribution surfaces, and analytics maturity.

---

## Product Scope (Phase 1)
You are building the foundation for:
- Episode publishing and discovery
- Topic-based navigation
- Transcript-first long-form content pages
- Subscribe and newsletter growth flows
- Search, related-content loops, and measurable user behavior

You are NOT building in phase 1:
- Auth/member dashboard
- Payments/checkout
- Admin CMS UI
- Advanced personalization engine

Architect everything so these can be added later without breaking current structure.

---

## Non-Negotiable Engineering Principles
1. **Type-safe by default**: strict TypeScript; no untyped data in UI layer.
2. **Composable architecture**: shared primitives + reusable section components; no page-specific spaghetti.
3. **Data-source agnostic UI**: UI consumes typed adapters, not hardcoded APIs.
4. **Accessibility baseline built-in**: WCAG 2.2 AA compliance mindset from day one.
5. **Performance budget awareness**: avoid unnecessary client JS and large initial payloads.
6. **Observability-ready**: all key actions instrumented with a stable event contract.
7. **SEO/discoverability native**: metadata + schema + semantic structure are part of templates, not afterthoughts.

---

## Required Stack + Standards
- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS (tokenized design system; no random hardcoded style drift)
- ESLint + Prettier + import/order rules
- Component and feature folder conventions enforced from start

Quality gates before merge:
- Typecheck passes
- Lint passes
- Build passes
- Accessibility checks on critical templates

---

## Required Route Backbone
Implement skeleton routes with production-ready structure (not placeholder chaos):
- /
- /episodes
- /episodes/[slug]
- /topics
- /topics/[slug]
- /about
- /newsletter
- /contact
- /privacy
- /terms
- /404 and error boundaries

Each route must support:
- Loading state
- Empty state
- Error state
- SEO metadata contract

---

## Core Domain Models (Single Source of Data Truth)
Define typed models and keep them stable:
- Episode
- Topic
- Host
- PlatformLink
- TranscriptBlock
- ChapterMarker
- NewsletterCTA
- SponsorSlot (optional placeholder)

Rules:
- No page may define ad hoc data shape.
- All fetching must map to domain models through adapters.
- Mock adapters now, CMS/API adapters later, same interface.

---

## Component Backbone (Must Be Reusable)
Build these first-class components:
- GlobalHeader (with subscribe actions)
- GlobalFooter (legal + links + newsletter slot)
- EpisodeCard / EpisodeList / EpisodeGrid
- TopicChip / TopicCollection
- EpisodeHero
- MediaPlayerWrapper (audio/video)
- TranscriptViewer (anchorable sections, collapse/expand)
- SearchBar + FilterPanel
- RelatedEpisodes block
- NewsletterCapture block
- CTACluster (subscribe links)
- Standard Empty, Loading, Error views

No one-off page widgets unless approved as reusable candidates.

---

## Template Contracts

### Home Template
- Latest episode hero
- Featured episodes
- Topic entry points
- Primary subscribe CTA cluster

### Episode Detail Template (most critical)
Order is fixed:
1) Title + context
2) Listen/watch links
3) Short summary
4) Show notes
5) Chapters/timestamps
6) Transcript
7) Related episodes
8) Newsletter module

### Topic Template
- Topic intro
- Episode list for that topic
- Related topics navigation

### Episodes Index Template
- Search + filters + sort
- Archive list with pagination/infinite strategy

---

## SEO + Discoverability Requirements
Every template must support:
- Unique title/meta description
- Canonical URL
- Open Graph/Twitter fields
- Structured data support

Required JSON-LD coverage:
- Organization
- PodcastSeries
- PodcastEpisode
- FAQPage only when actually present

Transcript and summary must be crawlable semantic HTML (not hidden in inaccessible widgets).

---

## Accessibility Requirements (Hard Requirement)
- Keyboard navigable site-wide
- Visible focus indicators
- Correct labels and error messaging for forms
- ARIA usage only where necessary and correct
- Media controls usable without mouse
- No autoplay audio/video
- Color contrast meets WCAG 2.2 AA

If accessibility conflicts with visual preference, accessibility wins.

---

## Analytics Contract (Implement Hooks, Not Vendor Lock)
Create a typed event layer with these events:
- episode_view
- podcast_play
- video_play_click
- topic_click
- search_performed
- transcript_open
- subscribe_click
- newsletter_signup

Rules:
- UI emits domain events only.
- Analytics provider implementation must be swappable.
- Do not spread vendor-specific logic through components.

---

## Scalability Requirements
The architecture must scale across:
- 1,000+ episode pages
- Multi-topic taxonomy growth
- Additional hosts/shows later
- Internationalization-ready URL/content structure (future-safe)
- Future modules (sponsors, membership, premium feeds)

Design now to avoid future rewrites:
- Stable domain model contracts
- Feature-segmented folders
- Isolated adapters and event pipeline
- Reusable template system

---

## Delivery Milestones (Frontend)

### Milestone 1: Foundation
- App shell, route skeletons, typed domain models, adapter interfaces

### Milestone 2: Core Templates
- Home, Episodes index, Episode detail, Topics, About templates wired to mock data

### Milestone 3: Discovery + Content Depth
- Search/filter, transcript UX, related episodes, topic navigation

### Milestone 4: Production Hardening
- Metadata/schema layer, accessibility pass, performance pass, analytics instrumentation

Deliver each milestone in shippable state.

---

## Definition of Done (Backbone Complete)
Backbone is complete only when:
1. Core routes and templates are implemented and consistent.
2. Reusable component system covers all major sections.
3. Typed adapter architecture cleanly separates data and UI.
4. Accessibility baseline is verifiably met on key flows.
5. SEO/schema and analytics contracts are wired.
6. Platform can scale content volume and new modules without restructuring.

If any one of these is missing, the base is not complete.

---

## Final Instruction
Build for longevity over shortcuts. Prioritize architectural integrity, consistency, and maintainability above visual novelty. Every frontend decision should reduce future rewrite risk.
