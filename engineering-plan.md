# Engineering Plan — v2: one English site (academic + blog) on the apex domain

Status: active. Branch: `v2-english`. Written 2026-07-19.

## Context

- This repo (`Hermann-web/academic`) serves the French academic site at
  `https://academic.hermann-agossou.com` (Astro 5, GitHub Pages via
  `.github/workflows/deploy.yml`, Cloudflare-proxied DNS). It was built for the
  FSBM "Digitalisation" module; the graded report
  (`report/rapport-site-personnel.pdf`) cites the French site as it stands.
- The old blog (`~/Github/perso/blog`, repo `hermann-web/blog`) is MkDocs
  Material at the apex `https://hermann-agossou.com`: ~72 markdown files
  (knowledge-base posts + project write-ups), Material-only syntax
  (`!!!`/`???` admonitions, `=== "Tab"` tabs), KaTeX math, 108 co-located PNGs,
  Material blog plugin with `post_url_format: "{slug}/"` (post URLs are
  flattened to `/blog/{slug}/` regardless of folder nesting).
- Decision made with the user: merge the blog into this repo, translate the
  academic pages to English, and serve everything from the apex domain. Work
  happens on `v2-english`; `main` (French site) stays frozen until the module
  grade is in.

## Product Thesis

One long-lived personal site: academic identity pages (CV, publications,
communications, teaching) plus the full technical knowledge base, in English,
on `hermann-agossou.com`, maintained through one toolchain (Astro + typed data
files + markdown content collections). Adding a post, publication, or
attestation must stay a one-file edit + `git push`.

## Anti-Thesis (explicit non-targets)

- No live MkDocs-dialect parser. Material syntax is converted **once** by a
  script into standard markdown/MDX; we do not maintain a custom remark parser
  for an abandoned dialect.
- No second design system. The blog section adopts the existing identity (pine
  green `#0E6E55`, Fraunces / Source Sans 3 / IBM Plex Mono) via Starlight CSS
  custom properties; it must not look like a bolted-on docs template.
- No trackers. The old blog's Google Analytics is dropped, not ported — the
  RGPD/legal page promises a tracker-free site and that promise carries over.
- No CMS, no SSR, no comment system in this phase.

## Quality Bar

- Every one of the ~72 migrated pages renders correctly: admonitions become
  Starlight asides, tab groups become `<Tabs>`, math renders via KaTeX, all
  108 images resolve. "Builds without error" is not the bar — a page with a
  raw `!!! note` literal in its body is a failed migration.
- Legacy URLs keep working: old `/blog/{slug}/` and `/projects/{name}/` URLs
  resolve on the new site (same path or one redirect hop).
- The seven academic pages read as native English, not translationese.
- Site-wide search works (Pagefind, built into Starlight).
- `npx astro check` → 0 errors; `npm run build` green on every task close.

## Objective

Merge the MkDocs blog into this Astro repo as a Starlight-powered section,
translate the academic pages to English, and cut the apex domain over to this
site — while `main` keeps serving the French site unchanged until the grading
gate opens.

## Direction Chosen (frozen)

- **Starlight** (`@astrojs/starlight`) hosts the migrated content; it is the
  Astro-core-team equivalent of MkDocs Material (sidebar, Pagefind search,
  asides, tabs, dark mode). Custom academic pages in `src/pages/` coexist with
  it.
- **Convert-once migration script** (`scripts/migrate-mkdocs.mjs`), then the
  script is retired (see Content Freeze gate). Standard syntax only afterwards.
- **URL preservation via `slug` frontmatter**, not file layout: files keep
  their nested folders for authoring sanity; the script writes
  `slug: blog/{old-slug}` / `slug: projects/{name}` to reproduce MkDocs URLs.
- **`build.format: "directory"` at cutover** (site-wide, including academic
  pages). Old MkDocs URLs end in `/`; directory format reproduces them, and
  GitHub Pages auto-redirects the slashless forms, so academic URLs like `/cv`
  keep resolving. Until cutover the current `"file"` format stays.
- **Math**: `remark-math` + `rehype-katex`, CSS self-hosted (CSP-free, no CDN).
- **Domain**: apex `hermann-agossou.com` on this repo's Pages site;
  `academic.hermann-agossou.com` becomes a Cloudflare redirect to apex. The
  old blog repo's Pages site is detached from the apex, then archived.

## Current Baseline (code-informed)

- `astro.config.mjs`: `site` = academic subdomain, `trailingSlash: "never"`,
  `build.format: "file"`, integrations `[sitemap()]`. All three change at
  defined tasks — nowhere else.
- `src/data/site.ts` is the single source of truth for identity, links, nav
  (`nav` array drives the header in `src/layouts/Base.astro`). French strings
  live in `site.ts`, the other `src/data/*.ts` files, and the eight
  `src/pages/*.astro` files.
- `src/layouts/Base.astro` + `src/components/{PageHeader,EcgTrace}.astro`
  carry the design system; global styles inline in `Base.astro`.
- Deploy: push to `main` → `withastro/action@v3` → `deploy-pages@v4`,
  concurrency group `pages`. **Branches do not deploy** — `v2-english` is safe
  to push.
- Pages custom domain is set via the GitHub API (`PUT /repos/.../pages`,
  OAuth token in `~/.git-credentials`), NOT by `public/CNAME` alone.
- Old blog source of truth: `~/Github/perso/blog/docs/` (`blog/posts/**`,
  `projects/*.md`, `assets/`, co-located `images|assets|img` dirs).
  Frontmatter: `date`, `authors`, `categories`, `title`, `description`,
  `links`, `<!-- more -->` excerpt marker. Nav in `mkdocs.yml` lines 220+.
- Syntax inventory (grep-verified): ~200 admonition blocks across 20 variants
  incl. non-standard `output`/`code`/`examples` types; 22 files with tab
  groups; 3 files with math; **zero** code annotations.
- Node v24, Astro ^5.1. No AGENTS.md/CLAUDE.md in this repo.

## In Scope

Migration script + content conversion, Starlight integration + theming,
blog/projects landing pages, English translation of academic pages, URL/
redirect map, domain cutover, decommissioning the MkDocs deploy.

## Out of Scope

New blog content; comment system; i18n/French mirror of the blog; RSS beyond
what starlight-blog provides by default; redesign of the academic pages beyond
translation; touching `~/Github/perso/latex-repo` (CV pipeline unchanged).

## Hard Contract

- `main` serves the French site untouched until the user says the grade is in
  (Phase 4 gate). All v2 work stays on `v2-english`.
- The seven academic page paths (`/`, `/cv`, `/publications`,
  `/communications-attestations`, `/cours-tps`, `/parcours-contact`,
  `/mentions-legales`) never change. Translation changes copy, not URLs.
- Legacy blog URLs (`/blog/{slug}/`, `/projects/{name}/`) must resolve on the
  new site — enforced by the URL map artifact and post-cutover curl sweep.
- Commits never carry a `Co-Authored-By` trailer.
- `docs/thesis-info.docx` and `docs/*réinscription*` stay gitignored (contain
  CIN/birth date).
- No cookies, no analytics, no external-CDN assets (KaTeX CSS self-hosted).
- After the Content Freeze gate, migrated files are hand-owned: the migration
  script must never run against `src/content/` again.

## Content Contract (migrated markdown)

- Source of truth after migration: `src/content/docs/**` in this repo. The
  MkDocs repo becomes a read-only archive.
- Allowed syntax: CommonMark + Starlight asides (`:::note`…) + MDX components
  imported from `@astrojs/starlight/components` (Tabs/TabItem) + `$…$`/`$$…$$`
  math. Nothing MkDocs-specific may survive (build-time grep guard, task 7).
- Frontmatter schema: `title` (required), `slug` (required — preserves legacy
  URL), `description`, `date`, `tags` (from `categories`); Material-only keys
  (`authors`, `comments`, `links`, `<!-- more -->`) are dropped or mapped by
  the script, never left behind.
- Images live next to their page and are referenced by relative path (Astro
  content-layer native handling; no plugin).
- Non-standard admonition types map deterministically:
  `output|code|examples → note` with the type name as the aside title;
  `quote → blockquote`; `abstract → tip`. Collapsible `???` becomes a regular
  aside (Starlight has no collapsible aside; acceptable loss, recorded once
  here, not per-file).

## Dependency Rules

- `src/data/` imports nothing from `src/pages/`, `src/content/`, or Starlight.
  `astro.config.mjs` and pages import from `src/data/` — one direction only.
- `src/content/docs/**` may import only Starlight-exported components. No
  imports from `src/components/` (those are design-system internals for the
  academic pages) — if a content-facing component is ever needed, create
  `src/components/content/` and allow only that.
- `scripts/migrate-mkdocs.mjs` reads `~/Github/perso/blog/docs` and writes
  `src/content/docs/{blog,projects}` + a report artifact. It imports nothing
  from `src/`.
- Starlight theming lives in `src/styles/starlight.css` (custom-property
  overrides) referenced from `astro.config.mjs`; it may read design tokens but
  academic pages must not depend on it.

## Target Layout

```
src/
├── content/docs/
│   ├── blog/…(nested topics, slug-frontmatter URLs)…/post.md(x) + images
│   ├── projects/*.md(x)
│   └── index.mdx            # blog landing (or starlight-blog index)
├── data/                    # unchanged model, English strings
├── pages/                   # 7 academic pages + 404, English
├── styles/starlight.css     # brand theming for the docs shell
scripts/migrate-mkdocs.mjs   # retired after Content Freeze
docs/migration/              # durable artifacts (committed)
```

## Working Method for Agents

- Work the first unchecked task; split any task touching two phases before
  editing. Do not reopen decisions in "Direction Chosen" without user say-so.
- Never mark a task done without its verification commands passing; append a
  completion note (date, what changed, evidence) under the task.
- Commit per task (or coherent task group) on `v2-english`, plain messages, no
  trailers. Pushing the branch is safe (no deploy).
- Verify before overwriting: the migration script must refuse to run if its
  target dir is non-empty after the Content Freeze gate.

## Durable Artifacts — `docs/migration/`

- `url-map.md` — every old URL → new URL → mechanism (same-path / redirect),
  generated by the script, hand-annotated where needed. Drives the cutover
  curl sweep.
- `conversion-report.md` — script output: per-file conversions applied,
  flagged constructs needing hand-fixes, dropped frontmatter keys.
- `open-decisions.md` — anything discovered mid-migration that needs the user.

## Phase Gates

1. **Phase 1 → 2 (Content Freeze)**: all 72 pages build, zero MkDocs syntax
   remains (grep guard green), links validated. After this, script is retired.
2. **Phase 2 → 3**: Starlight themed + nav integrated; user has seen a preview.
3. **Phase 3 → 4 (Grading Gate)**: **user confirms the module grade is in.**
   Nothing in Phase 4 starts before this — it changes the live site.
4. **Phase 4 exit**: post-cutover sweep green; old blog deploy detached.

## Verification Commands

- `npm run build` — must be green to close any task.
- `npx astro check` — 0 errors to close any task touching `.ts`/`.astro`.
- MkDocs-residue guard (Phase 1 gate):
  `grep -rEn '^\s*(!!!|\?\?\?)|^===\s+"' src/content/docs && echo FAIL || echo CLEAN`
- Link validation: `starlight-links-validator` runs inside `npm run build`.
- Post-cutover sweep (Phase 4): `curl -s -o /dev/null -w '%{http_code} %{url}\n'`
  over every row of `docs/migration/url-map.md` + the 7 academic paths,
  against `https://hermann-agossou.com` (expect 200/301→200).

## Ordered Tasks

### Phase 0 — Branch & inventory

- [x] **0.1 Create `v2-english` branch; commit this plan.**
      Done when: branch pushed; `main` untouched.
      *Completed 2026-07-19: branch created from `e6c32e9`, plan committed as
      `d3658a1`, pushed with upstream tracking. `main` untouched.*
- [ ] **0.2 Generate `docs/migration/url-map.md`.**
      Script-assisted: walk `~/Github/perso/blog/docs`, apply MkDocs URL rules
      (`/blog/{slug}/` flattening from the blog plugin, directory URLs for
      projects/others), emit old→new mapping. Decide per non-post page (home,
      `/projects/` index, licence page) whether it maps or redirects.
      Done when: every one of the 72 files has a row; committed.

### Phase 1 — Starlight + migration (target: all content in, standard syntax)

- [ ] **1.1 Add Starlight without breaking the academic site.**
      `npm i @astrojs/starlight`; add integration with `src/content/docs`
      collection; temporary placeholder page. Done when: `npm run build` green,
      all 8 existing routes still emitted, placeholder docs route renders.
- [ ] **1.2 Write `scripts/migrate-mkdocs.mjs`** implementing the Content
      Contract: admonitions→asides (incl. the deterministic type map),
      tabs→MDX `<Tabs>` (file becomes `.mdx`), frontmatter mapping + `slug`,
      image relocation to co-located dirs, internal-link rewrite via the URL
      map, `<!-- more -->` → `description` fallback/excerpt removal. Emits
      `conversion-report.md`. Done when: dry-run over full corpus reports 0
      unhandled constructs or lists them explicitly as flagged.
- [ ] **1.3 Run migration; commit content + report.**
      Done when: 72 pages + images in `src/content/docs/`, build green.
- [ ] **1.4 Math support**: `remark-math` + `rehype-katex`, self-hosted KaTeX
      CSS, applied to the 3 math files. Done when: rendered formulas verified
      by eye in preview on all 3 pages.
- [ ] **1.5 Hand-fix flagged files** from `conversion-report.md` (expected:
      tab edge cases, odd admonition nesting). Done when: report's flagged
      list is empty or waived in `open-decisions.md`.
- [ ] **1.6 Link validation**: add `starlight-links-validator`, fix breakage.
      Done when: build green with validator on.
- [ ] **1.7 CONTENT FREEZE GATE**: residue grep guard CLEAN; add refuse-to-run
      guard to the script; note freeze date here.

### Phase 2 — Integration & design

- [ ] **2.1 Brand Starlight** (`src/styles/starlight.css`): pine green accent,
      Fraunces headings, Source Sans 3 body, IBM Plex Mono code, light/dark.
      Done when: side-by-side with an academic page reads as one site.
- [ ] **2.2 Unified nav**: add Blog + Projects entries to `site.ts` `nav`;
      link back from the Starlight shell to the academic pages (Starlight
      social/nav config from `src/data/site.ts`). Done when: both directions
      navigable in preview.
- [ ] **2.3 Landing pages**: `/blog` index (recent posts by `date`, by topic)
      and `/projects` overview replacing the old MkDocs indexes. Evaluate
      `starlight-blog` plugin vs. a small custom index — pick whichever needs
      less code, record choice here. Done when: both pages render with real
      content.
- [ ] **2.4 Preview to user** (dev server or screenshots). Gate to Phase 3.

### Phase 3 — English translation (on branch; URLs unchanged)

- [ ] **3.1 Translate `src/data/*.ts`** (identity, summary, works,
      attestations, cours, parcours labels). Done when: `astro check` 0
      errors, no French strings left in data files.
- [ ] **3.2 Translate the 8 `src/pages/*.astro` + `Base.astro` chrome.**
      Keep `/mentions-legales` path; page becomes "Legal & Privacy". Done
      when: full-site read-through finds no French except proper nouns.
- [ ] **3.3 `<html lang>` → `en`, meta descriptions, sitemap rebuild.**

### Phase 4 — Cutover (BLOCKED until user confirms grade is in)

- [ ] **4.1 `build.format: "directory"`** + `trailingSlash` alignment; verify
      academic paths and legacy trailing-slash URLs both resolve in preview.
- [ ] **4.2 Config flip**: `site` → `https://hermann-agossou.com`,
      `public/CNAME` → apex. Merge `v2-english` → `main`, push, deploy green.
- [ ] **4.3 Domain move**: detach apex from the old blog's Pages site;
      `PUT /repos/Hermann-web/academic/pages {"cname":"hermann-agossou.com"}`;
      Cloudflare: apex CNAME (flattened) → `hermann-web.github.io` (proxied),
      redirect rule `academic.hermann-agossou.com/* → https://hermann-agossou.com/$1`.
      Done when: apex serves the new site over HTTPS; academic subdomain
      redirects.
- [ ] **4.4 Post-cutover sweep**: run the url-map curl sweep + 7 academic
      paths + search smoke test. Done when: all 200 (or 301→200); results
      appended to `url-map.md`.
- [ ] **4.5 Decommission**: archive `hermann-web/blog` repo (read-only),
      remove its Pages site, note archival in `open-decisions.md`; update
      memory files.
