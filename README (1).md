# OdFe — Landing Page

Section 1 of 20: **Hero**. Built one section at a time.

## Install

```bash
npm install gsap
```

Files:

```
app/layout.tsx
app/page.tsx
app/globals.css
components/site/Navbar.tsx
components/hero/Hero.tsx
components/hero/HeroDashboard.tsx
components/hero/useHeroTimeline.ts
```

`@/` must alias the project root (the `create-next-app` default).
No Tailwind required — the hero ships its own CSS in `globals.css`.

## Design tokens

| Token | Hex | Used for |
|---|---|---|
| paper | `#FFFFFF` | hero background |
| haze | `#FAF8F4` | warm floor below the fold |
| ink | `#101F19` | headline, active nav pill |
| ink-soft | `#71807A` | body copy, secondary labels |
| green | `#14503E` | primary buttons, peak chart bars, logo |
| brass | `#C98A2E` | small accents, chip dots |
| copper | `#C0703A` | secondary data accent |
| line | `#E8E4DB` | borders |

Type: **Fraunces** (display) + **Hanken Grotesk** (UI + body).

## The animation

One orchestrated load sequence in `useHeroTimeline.ts`:

1. nav fades down
2. headline mask-reveals, line by line, from below
3. sub → CTAs → trust line
4. **dashboard rises up from below into place** (the moment)
5. chart bars grow
6. floating chips pop, then bob gently

Scroll adds a scrubbed parallax lift. `prefers-reduced-motion` skips all of it
and renders the final state. Everything is scoped with `gsap.context()`.
