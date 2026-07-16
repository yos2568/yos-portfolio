# Implementation Handoff: `yos.in.th` Portfolio Redesign

## Mission

Redesign and implement the portfolio website for Dr. Yos Vaneesorn in the existing GitHub repository:

- Repository: <https://github.com/yos2568/yos-portfolio>
- Production site: <https://yos.in.th/>
- Primary branch: `main`

The new site should feel cinematic, contemporary, and highly crafted while preserving the subject's identity as a composer, clarinetist, educator, and researcher. Build the redesign in a separate branch, provide a reviewable preview, and do not replace production until the user approves it.

## Visual References

Use these as inspiration, not as templates to copy:

1. **Landing | Designer Portfolio**  
   <https://dribbble.com/shots/19871911-Landing-Designer-portfolio>

   Useful characteristics:

   - Oversized modern typography
   - Minimal, spacious grid
   - Dark gradient atmosphere
   - Small metadata labels
   - Experimental spotlight or magnifier interaction

2. **Distant Harmony // Portfolio Website**  
   <https://dribbble.com/shots/27323895-Distant-Harmony-Portfolio-Website>

   Useful characteristics:

   - Cinematic photography and warm darkness
   - Film and camera-interface details
   - Layered image compositions
   - Large project panels
   - A website that feels like a visual story

The recommended synthesis is a **cinematic composer portfolio**: combine the large, minimal typography of the first reference with the photographic storytelling and technical framing of the second. Preserve selected elements from the current site—warm cream, burgundy, editorial serif typography, and subtle musical-score graphics—so the result remains recognizably Yos rather than a generic design portfolio.

## Current Repository and Site

The repository is a public, lightweight static site. At the time of review, the root contains:

- `_tools/`
- `form-analysis/assignment/`
- `images/`
- `tofu/`
- `.gitignore`
- `Yos Portfolio.html`
- `index.html`

GitHub reports approximately 99.7% HTML and 0.3% JavaScript. It has an existing GitHub Pages deployment history. There is no README yet.

The current production site includes these main areas:

- Hero introduction
- About
- Four disciplines
- Teaching
- Orchestration and composition
- Clarinet
- Research
- Gallery
- Contact
- English and Thai controls
- Form & Analysis navigation and teaching materials

The current visual identity is warm, editorial, and score-inspired. It uses a cream background, serif and italic display typography, burgundy accents, a portrait-led hero, fine rules, and small uppercase metadata.

## Infrastructure Context

- Domain: `yos.in.th`
- DNS provider: Z.com
- Apex and `www` currently point to VPS IP `72.61.117.10`
- VPS provider: Hostinger
- Hostinger Docker project: `yosinth`
- Existing container/reverse-proxy configuration already serves both `yos.in.th` and `www.yos.in.th`

Do not change DNS, nameservers, Docker routing, or VPS configuration unless deployment testing proves it is necessary and the user explicitly approves the change. Never place credentials, API keys, cookies, or VPS secrets in the repository.

## Safety and Git Workflow

1. Clone or pull the repository and inspect the complete source before editing.
2. Record the current production commit SHA.
3. Create a backup tag or preservation branch for the current production version.
4. Create a working branch such as `redesign-v2`.
5. Do not push redesign work directly to `main`.
6. Commit in logical stages with meaningful messages.
7. Publish a reviewable preview before proposing a merge.
8. Open a pull request summarizing visual, structural, accessibility, and performance changes.
9. Merge and deploy only after explicit user approval.
10. Keep a documented rollback path to the previous production commit.

## Technical Direction

Prefer the existing static architecture unless inspection reveals a compelling reason to introduce a framework. The site does not need React or a server runtime merely to achieve the proposed visual design.

Recommended structure:

```text
/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── js/
│   │   ├── navigation.js
│   │   ├── motion.js
│   │   └── language.js
│   ├── images/
│   └── fonts/
├── form-analysis/
└── tofu/
```

Adapt this structure to the repository after inspection. Preserve existing URLs for teaching materials and assignments wherever possible. If a path must change, add a compatible redirect or stable replacement.

Use progressive enhancement:

- Core content and navigation must work without JavaScript.
- JavaScript should enhance navigation, motion, language switching, and visual effects.
- Avoid dependencies for effects that can be implemented cleanly with CSS and small vanilla-JavaScript modules.
- Do not add a build system unless it provides a clear maintenance or performance benefit.

## Design System

Create reusable CSS custom properties for:

- Color
- Typography
- Spacing
- Grid dimensions
- Borders and rules
- Layer elevations
- Animation timing and easing

Suggested palette direction:

- Near-black or charcoal for cinematic sections
- Warm ivory or parchment for editorial sections
- Existing burgundy as the identity accent
- Muted warm gold or amber for restrained highlights
- Soft gray for metadata and technical labels

Typography direction:

- One expressive editorial serif for name, quotations, and major headings
- One modern sans-serif for navigation, metadata, and utility text
- Optional italic serif for musical or personal emphasis
- Use self-hosted or privacy-conscious font delivery where licensing permits
- Ensure complete Thai glyph support before choosing final fonts

Do not sacrifice readability to imitate the references. Body copy should remain calm and legible.

## Page Architecture

### 1. Navigation

- Persistent but visually light navigation
- Clear section links
- Accessible mobile menu
- English/Thai control
- Visible keyboard focus states
- Active-section indication where appropriate

### 2. Cinematic Hero

- Full-viewport opening composition
- Strong portrait or performance image
- `Dr. Yos Vaneesorn` as the primary typographic statement
- Four roles: Composer, Clarinetist, Educator, Researcher
- Bangkok/Thailand metadata
- A clear invitation to scroll or explore
- Optional restrained film-frame or score-line overlay

Avoid placing important text over visually noisy areas. The hero must remain readable on mobile.

### 3. About

- Concise editorial biography
- Location, instrument, languages, institutions, and international activity
- Use strong hierarchy rather than long unbroken paragraphs

### 4. Four Disciplines

- Composer
- Clarinetist
- Educator
- Researcher

Present these as substantial visual chapters or panels rather than ordinary cards. Each should lead to relevant material.

### 5. Selected Work

- Featured compositions
- Orchestration projects
- Performances
- Research or publications where available

Use cinematic project panels with title, year, role, medium, short description, and media. Do not invent works, dates, venues, quotations, awards, or credits. Use placeholders only when clearly marked for the user's completion.

### 6. Teaching and Form & Analysis

- Preserve current course access and assignment links
- Present Form & Analysis, Orchestration, Clarinet Studio, and Metaform clearly
- Keep educational resources practical and easy to navigate
- Do not hide important teaching links behind animation-only interactions

### 7. Research

Feature the current themes:

- Form and post-tonal analysis
- Dialogue between Thai and Western musical practices
- Music, AI, and the creative process

Use editorial layouts, quotations, diagrams, or restrained technical annotations where the source material supports them.

### 8. Gallery

- Responsive, performance-conscious image presentation
- Curated photography rather than an undifferentiated grid
- Useful captions, dates, and credits when known
- Fullscreen viewing only if it remains accessible

### 9. Contact and Footer

- Replace placeholder information only with user-confirmed details
- The current page contains the placeholder email `yos.vaneesorn@example.ac.th`; do not treat it as a real address
- Include confirmed professional links only
- Provide copyright, language access, and a simple closing statement

## Motion and Interaction

Use motion to support narrative pacing rather than to demonstrate effects.

Suitable effects:

- Section and image reveals
- Slow, subtle parallax on selected media
- Typography entrances
- A restrained spotlight or magnifier treatment
- Fine film grain or camera-interface overlays
- Smooth anchor navigation
- Delicate hover responses on project panels

Requirements:

- Honor `prefers-reduced-motion`
- Avoid scroll hijacking
- Avoid excessive cursor replacement
- Keep navigation responsive during animation
- Do not make content dependent on hover
- Test effects on touch devices

## Content Rules

- Preserve the user's identity, biography, roles, teaching areas, and existing useful content.
- Do not fabricate professional claims.
- Keep English and Thai content structurally aligned.
- If translations are incomplete, flag them explicitly instead of silently machine-translating names, titles, or specialist terminology.
- Request confirmation for real contact details and external profile URLs.
- Preserve image credits and licenses.

## Responsive and Accessibility Requirements

Test at minimum:

- Small mobile: 320–390 px
- Large mobile: 430 px
- Tablet: 768–1024 px
- Laptop: 1280–1440 px
- Wide desktop: 1920 px and above

Required behavior:

- Semantic heading order
- Skip link
- Keyboard-operable navigation and galleries
- Strong visible focus states
- Sufficient contrast in both dark and light sections
- Descriptive alternative text
- Touch targets of practical size
- No horizontal overflow
- No text embedded in images when HTML text is possible
- Functional reduced-motion mode

## Performance and SEO

- Convert suitable photography to WebP and/or AVIF
- Retain sensible fallbacks when needed
- Generate responsive image sizes and use `srcset`
- Lazy-load below-the-fold media
- Preload only critical hero resources
- Prevent cumulative layout shift with explicit dimensions or aspect ratios
- Minimize JavaScript and defer noncritical modules
- Add title, description, canonical URL, favicon, Open Graph, and social preview metadata
- Add structured data appropriate for a person/artist only when the underlying facts are confirmed
- Create or verify `robots.txt` and `sitemap.xml`

Targets for the production build:

- No critical accessibility failures
- No broken internal links
- No uncaught console errors
- Strong Lighthouse results, with particular attention to performance and accessibility
- Fast first render on a typical mobile connection

## Implementation Phases

### Phase 1 — Audit

- Inspect all repository files, existing scripts, image dimensions, and duplicate HTML
- Map every current production URL and teaching-resource path
- Identify which content is real, placeholder, duplicated, or obsolete
- Document the existing deployment mechanism

### Phase 2 — Foundation

- Create branch and rollback point
- Establish modular file structure
- Add design tokens, base styles, semantic HTML skeleton, and README
- Preserve current content before visual refactoring

### Phase 3 — Core Redesign

- Build navigation, hero, About, disciplines, selected work, teaching, research, gallery, and contact
- Implement responsive light/dark section rhythm
- Integrate optimized media

### Phase 4 — Motion and Language

- Add progressive enhancement for reveals and cinematic effects
- Restore or improve English/Thai switching
- Add reduced-motion behavior

### Phase 5 — QA

- Validate HTML
- Test keyboard navigation and screen-reader landmarks
- Test all breakpoints
- Verify all links and teaching resources
- Check Thai typography
- Run performance and accessibility audits
- Test with JavaScript disabled

### Phase 6 — Review and Delivery

- Publish preview
- Provide before/after screenshots at desktop and mobile widths
- List unresolved content questions
- Incorporate user feedback
- Open pull request
- Merge only after approval

### Phase 7 — Production Deployment

- Confirm the production build and current VPS deployment method
- Deploy the approved commit without changing DNS
- Verify both `https://yos.in.th/` and `https://www.yos.in.th/`
- Verify HTTPS, redirects, caching, images, language controls, and teaching links
- Monitor logs immediately after deployment
- Roll back if critical failures appear

## Acceptance Checklist

The redesign is complete only when all of the following are true:

- [ ] The current production version has a documented rollback point
- [ ] Work was completed outside `main`
- [ ] The site has a coherent cinematic/editorial identity
- [ ] The result draws from both references without copying either one
- [ ] Composer, clarinetist, educator, and researcher roles are clearly represented
- [ ] English and Thai experiences work on desktop and mobile
- [ ] Existing Form & Analysis and teaching resources remain accessible
- [ ] No professional facts or contact details were invented
- [ ] Mobile navigation is complete and keyboard accessible
- [ ] Reduced-motion mode works
- [ ] Images are optimized and layout shift is controlled
- [ ] Metadata and social previews are configured
- [ ] No broken links or uncaught console errors remain
- [ ] A preview was approved by the user
- [ ] The pull request explains the changes and rollback procedure
- [ ] Production works on both apex and `www` hostnames over HTTPS

## Questions to Resolve With the User

Do not block initial layout work on these, but collect answers before final release:

1. What is the real public email address, if any?
2. Which YouTube, SoundCloud, ResearchGate, university, and social links should be published?
3. Which compositions, performances, recordings, publications, and teaching projects should be featured first?
4. Which images may be used publicly, and what captions or credits are required?
5. Should Thai and English be complete parallel versions or should one language be primary?
6. Should the redesign remain a single-page portfolio or introduce dedicated project pages?
7. Is GitHub Pages still required, or is the Hostinger VPS the sole production target?

## Final Deliverables Expected From the Implementer

- Working `redesign-v2` branch
- Reviewable preview URL
- Responsive static site source
- Optimized image assets
- Updated README
- Content/placeholder inventory
- Accessibility and performance test summary
- Pull request with screenshots and deployment notes
- Production deployment plan and rollback instructions

