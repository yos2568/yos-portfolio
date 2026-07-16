# yos.in.th — Portfolio

Static portfolio site for **Dr. Yos Vaneesorn** (composer, clarinetist, educator, researcher).

- **Production:** https://yos.in.th/
- **Repository:** https://github.com/yos2568/yos-portfolio
- **Primary branch:** `main`
- **Redesign branch:** `redesign-v2`

## Local preview

No build step. From the repository root:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/

## Structure

```text
/
├── index.html                 # Redesigned single-page portfolio
├── assets/
│   ├── css/                   # tokens, base, components, pages
│   └── js/                    # language, navigation, motion
├── images/                    # Photography (keep stable URLs)
├── form-analysis/             # Teaching materials (stable paths)
├── tofu/                      # Private family page
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Language

English / Thai toggle stores preference in `localStorage` (`yos-lang`).  
Content is marked with `data-en` / `data-th` on elements. Core content works without JavaScript (English default in markup).

## Safety / deploy

1. Production backup tag: `production-backup-2026-07-17` (commit `7e3c304`)
2. Do **not** merge `redesign-v2` to `main` without explicit approval
3. Do not change DNS / VPS routing unless approved
4. Contact email on the page is a **placeholder** until confirmed

## Rollback

```bash
git checkout main
git reset --hard production-backup-2026-07-17
# then redeploy that tree to the Hostinger container / static root
```

## Content rules

- Do not invent works, awards, dates, or contact details
- Preserve teaching URLs under `form-analysis/`
- Flag incomplete translations or profile links rather than fabricating them

## Handoff

See `HANDOFF-REDESIGN.md` and `CONTENT-INVENTORY.md`.
