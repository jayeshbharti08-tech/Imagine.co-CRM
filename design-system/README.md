# OUTFIT® — Design System

An editorial-commerce design language reconstructed from the art direction of
[outfit.hellohello.is](https://outfit.hellohello.is/) — the apparel/merch store
by the Uruguayan studio **++hellohello** (Awwwards & CSS Winner Site of the Day,
May 2026).

> **Note on provenance.** The live site is built in Framer and its assets were
> not directly reachable from this environment (the host is blocked by the
> workspace egress policy). This system is a faithful reconstruction from the
> site's documented art direction — neutral Swiss grotesque (**Neue Haas
> Grotesk**), warm paper / deep ink, monospace metadata, editorial commerce
> layout. Every value is a token, so retuning it to match exact site pixels is a
> one-line change per token.

## The six principles

1. **Type is the layout** — big grotesque headlines and a strict grid do the work.
2. **Warm paper, deep ink** — a bone-white canvas (`#f1eee6`) and near-black ink.
3. **Metadata is monospace** — prices, sizes, SKUs and labels read like a care tag.
4. **One electric accent** — cobalt (`#2b2bf5`) for every CTA, link and focus ring.
5. **Sharp, printed corners** — radii stay 2–4px; softness comes from space.
6. **Restrained motion** — a marquee, a hover reveal, a quick fade. Nothing more.

## What ships

| File | Purpose |
| --- | --- |
| `src/styles/outfit-tokens.css` | **Source of truth.** Tokens (`--of-*`) for color, type, space, radius, elevation, motion + class-based component primitives (`.of-btn`, `.of-tag`, `.of-card`, `.of-marquee`, …). |
| `src/design-system/OutfitKit.jsx` | React kit consuming the tokens: `Button`, `Tag`, `Swatches`, `SizeSelector`, `Stepper`, `Field`, `Input`, `Marquee`, `ProductCard`, `Eyebrow`, `Reg`. |
| `src/pages/DesignSystemPage.jsx` | Living style guide, routed at **`/design-system`**. |
| `design-system/styleguide.html` | Self-contained, framework-free mirror of the style guide (published as a Claude Artifact). |

## Foundations at a glance

- **Type:** `--of-font-sans` = Neue Haas Grotesk → Helvetica Neue → Arial (no
  webfont needed — the Helvetica family *is* the faithful fallback).
  `--of-font-mono` for all metadata. Display is tightly tracked (`-0.045em`);
  labels are mono, uppercase, and widely tracked (`+0.14em`).
- **Color:** a warm neutral ramp (paper → ink), one cobalt accent, and a
  10-swatch **product colorway** set (cobalt, lime, red, lilac, butter, forest,
  clay, sky, cream, black).
- **Space:** 4px base scale (`--of-space-1` … `--of-space-10`).
- **Radius:** deliberately tight — `--of-radius-xs` 2px through `--of-radius-pill`.

## Usage

```jsx
// 1 — import the token layer once
import './styles/outfit-tokens.css';

// 2 — reference tokens in your own CSS
.price { font: var(--of-price); color: var(--of-ink); }

// 3 — or compose the React kit under a `.of` root
import { Button, ProductCard } from './design-system/OutfitKit';

<div className="of">
  <Button variant="accent">Checkout</Button>
</div>
```

Run the app (`npm run dev`) and open `/design-system` to browse the full guide,
or open `design-system/styleguide.html` for the standalone version.

## Retuning the brand

All brand decisions live in the `PRIMITIVES` block of `outfit-tokens.css`.
Change `--of-accent` to reskin every CTA/link/focus state; change `--of-paper`
and `--of-ink` to shift the whole ground. Everything downstream is derived.
