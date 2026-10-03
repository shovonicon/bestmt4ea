# Design system

The visual system for bestmt4ea.com. It mirrors **strivealgo.com** — same palette,
type, background, chrome and motion — so the two properties read as one brand.

Tokens live in **`src/styles/global.css`** (`@theme` + `@layer components`). Change
them there, never inline.

## Colour

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#000000` | Page base — pure black |
| `--color-bg-soft` | `#050816` | Raised sections (ink-900) |
| `--color-surface` | `rgba(5, 8, 24, 0.6)` | Panels / cards |
| `--color-surface-2` | `rgba(255, 255, 255, 0.03)` | Inner chips, image wells |
| `--color-line` | `rgba(255, 255, 255, 0.10)` | Borders |
| `--color-line-soft` | `rgba(255, 255, 255, 0.05)` | Dividers |
| `--color-ink` | `#f5f7fa` | Headings / primary text |
| `--color-ink-soft` | `#cbd5e1` | Body text |
| `--color-ink-dim` | `#94a3b8` | Muted / meta |
| `--color-accent` | `#00c190` | Brand emerald |
| `--color-accent-soft` | `#00e0a8` | Hover emerald |
| `--color-accent-dim` | `#0f8f72` | Deep emerald |
| `--color-info` | `#2dd4bf` | Teal |
| `--color-warn` | `#fbbf24` | Risk / caution |
| `--color-danger` | `#f87171` | Negative / drawdown |

Gradient: `.brand-gradient` = `linear-gradient(135deg, #00e0a8, #00c190 50%, #2dd4bf)`.
Gradient text: `.text-gradient-brand`.

**Rules**
- Emerald is an accent, never a background wash. The page is black.
- Red is only ever used for drawdown / loss. Never for marketing emphasis.
- Never hard-code a hex in a component — use the token.

## Typography

| Role | Family | Token |
|---|---|---|
| Headings | **Sora** | `--font-heading` |
| Body | **Manrope** | `--font-sans` |
| Numerics / code / kickers | **JetBrains Mono** | `--font-mono` |

- Loaded in `BaseLayout.astro` from Google Fonts.
- `h1–h6` get Sora + `-0.02em` tracking from `@layer base`. Don't restate it.
- Numbers that sit in a column (gain, drawdown, price) use `.metric-value` so they
  are tabular and align.
- Small uppercase labels use `.eyebrow` or `.section-kicker` (letter-spaced, mono-ish).

## Background

Fixed radial emerald glows on `body`, painted once and never scrolled:

```
radial-gradient(ellipse 80% 40% at 50% -5%, rgba(0,193,144,.22), transparent),
radial-gradient(ellipse 50% 40% at 90% 5%,  rgba(0,193,187,.10), transparent),
radial-gradient(ellipse 40% 30% at 10% 95%, rgba(0,150,110,.12), transparent)
```

On top of that, ambient layers (all `pointer-events-none`, behind content at `z-0`):
- **`ParticleField.astro`** — a canvas of slowly falling emerald particles. Count
  scales with viewport area (max 90); DPR-aware; particles wrap at the edges.
- **Cursor glow** — a blurred emerald disc that eases toward the pointer (lerp 0.12).

Content sits at `z-10` (`main`, `footer`); the header is `z-50`; the reading
progress bar is `z-[60]`.

## Components

| Class / component | Purpose |
|---|---|
| `.container-x` | Page gutter — max `82rem`, responsive padding |
| `.panel` | Default card — surface + hairline border, `1rem` radius |
| `.panel-flat` | Quieter card on `--color-bg-soft` |
| `.brand-card` | Gradient-bordered card (`::before` mask) for feature blocks |
| `.hover-brand-card` | Card that lifts, glows and brightens its border on hover |
| `.stats-panel` / `.stats-panel-item` | Bordered emerald metric strip (4-up, 2-up on mobile) |
| `.eyebrow` / `.section-kicker` | Small uppercase labels |
| `.live-dot` | Pulsing emerald dot — "live / verified" signal |
| `.badge` / `.badge-accent` | Pill tags |
| `.btn` / `.btn-primary` / `.btn-ghost` | Pill buttons; primary carries the gradient + glow |
| `.data-table` | Spec tables |
| `.prose-article` | Long-form markdown styling (Sora headings, emerald links, bordered tables) |

## Site chrome

Every page renders these from `BaseLayout.astro`:

- **Reading progress bar** (`ReadingProgress.astro`) — 3px, top edge, brand gradient,
  fills with scroll depth.
- **Back to top** (`BackToTop.astro`) — bottom-left, appears past 600px.
- **Floating Telegram** (`TelegramFab.astro`) — bottom-right, pulsing ping ring,
  links to `site.telegram.support`.

## Navigation

- Fixed header, transparent at the top and `bg-black/80` + `backdrop-blur-xl` with a
  hairline border once scrolled.
- Order: **Home · Top Ranking · Products ▾ · Reviews ▾ · Blog ▾ · Shop**, then the
  Support link and the gradient "Explore EAs" CTA.
- Dropdowns are **mega-menus** (`.menu-panel`, `.menu-open`): 2–3 columns, mono
  uppercase emerald column headers, links with an emerald left-border + wash on hover.
  Open on hover *and* click; close on mouse-leave (220ms delay), Escape, or outside
  click. Panels are solid `#05070f` — never translucent.
- **Never** put a link in the top level if it already lives in a dropdown.

## Motion

| Utility | Effect |
|---|---|
| `.animate-fade-in-up` (+ `-delay-1..4`) | Entrance; used with stagger on hero content |
| `.animate-float` | Slow vertical drift (decorative orbs) |
| `.animate-aurora` | Slow drift + scale (hero glow) |
| `.live-dot` | 1.8s opacity pulse |
| `animate-ping` | Expanding ring on the Telegram button |

**Hard rule:** everything above is disabled under
`@media (prefers-reduced-motion: reduce)` — keeps a static particle field, no cursor
glow, no transitions. Never ship motion that ignores this.

## Accessibility

- Focus is always visible (`:focus-visible` emerald outline, 2px offset).
- Interactive targets ≥ 40px.
- Text contrast: body on black uses `--color-ink-soft` (`#cbd5e1`) or lighter.
- Dropdown triggers carry `aria-haspopup` / `aria-expanded`.

## When adding a page or component

1. Use tokens, never raw hex.
2. Reach for `.panel` / `.hover-brand-card` / `.brand-card` before inventing a card.
3. Sections get a `.section-kicker` + large Sora heading, and a `border-t border-white/5`
   separator — that is the strivealgo rhythm.
4. Put content at `z-10` so the particle field stays behind it.
