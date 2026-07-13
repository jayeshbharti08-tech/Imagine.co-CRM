/* ============================================================================
   OUTFIT® — Living style guide
   Documents the token layer + component kit at /design-system.
   ========================================================================== */
import '../styles/outfit-tokens.css';
import {
  Reg, Eyebrow, Button, Tag, Swatches, SizeSelector, Stepper, Field, Input,
  Marquee, ProductCard,
} from '../design-system/OutfitKit';

/* ---- Small local documentation helpers ---------------------------------- */
function Section({ id, index, title, intro, children }) {
  return (
    <section id={id} style={{ padding: 'var(--of-space-9) 0', borderTop: 'var(--of-border)' }}>
      <div className="of-container">
        <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--of-space-4)', marginBottom: 'var(--of-space-7)' }}>
          <span className="of-mono of-muted" style={{ fontSize: 13 }}>{index}</span>
          <h2 style={{ margin: 0 }}>{title}</h2>
          {intro && <p className="of-lead" style={{ flexBasis: '100%', maxWidth: 620 }}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function Swatch({ name, token, value, dark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        height: 76, borderRadius: 'var(--of-radius-sm)', background: value,
        border: 'var(--of-border)',
      }} />
      <div>
        <div style={{ font: 'var(--of-meta)', color: 'var(--of-ink)' }}>{name}</div>
        <div className="of-mono of-muted" style={{ fontSize: 11, marginTop: 2 }}>{token}</div>
        <div className="of-mono of-muted" style={{ fontSize: 11, textTransform: 'uppercase' }}>{value}</div>
      </div>
      {dark && null}
    </div>
  );
}

function SwatchGrid({ items }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--of-space-4)', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
      {items.map((s) => <Swatch key={s.token} {...s} />)}
    </div>
  );
}

function TypeRow({ styleVar, track, label, sample }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 'var(--of-space-5)', alignItems: 'baseline', padding: 'var(--of-space-4) 0', borderTop: 'var(--of-border)' }}>
      <div>
        <div className="of-mono" style={{ fontSize: 12, color: 'var(--of-ink)' }}>{label}</div>
        <div className="of-mono of-muted" style={{ fontSize: 11, marginTop: 4 }}>{styleVar}</div>
      </div>
      <div style={{ font: `var(${styleVar})`, letterSpacing: track ? `var(${track})` : undefined, color: 'var(--of-ink)', overflow: 'hidden' }}>
        {sample}
      </div>
    </div>
  );
}

function Spec({ label, value, box }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--of-space-4)', padding: 'var(--of-space-3) 0', borderTop: 'var(--of-border)' }}>
      <div style={{ width: 120 }} className="of-mono" >{label}</div>
      <div style={{ width: 120 }} className="of-mono of-muted" >{value}</div>
      <div style={{ flex: 1 }}>{box}</div>
    </div>
  );
}

function Panel({ children, pad = 'var(--of-space-6)' }) {
  return (
    <div style={{ background: 'var(--of-surface)', border: 'var(--of-border)', borderRadius: 'var(--of-radius-sm)', padding: pad }}>
      {children}
    </div>
  );
}

/* ---- Data --------------------------------------------------------------- */
const neutrals = [
  { name: 'Paper', token: '--of-paper', value: '#f1eee6' },
  { name: 'Paper sunk', token: '--of-paper-sunk', value: '#e8e4d9' },
  { name: 'Surface', token: '--of-surface', value: '#fcfbf7' },
  { name: 'Ink', token: '--of-ink', value: '#121110' },
  { name: 'Ink 2', token: '--of-ink-2', value: '#2a2824' },
  { name: 'Graphite', token: '--of-graphite', value: '#55524b' },
  { name: 'Slate', token: '--of-slate', value: '#8b877e' },
  { name: 'Fog', token: '--of-fog', value: '#b8b4a9' },
  { name: 'Hairline', token: '--of-hairline', value: '#d9d5c8' },
  { name: 'Hairline strong', token: '--of-hairline-strong', value: '#c3bdad' },
];
const accents = [
  { name: 'Accent', token: '--of-accent', value: '#2b2bf5' },
  { name: 'Accent press', token: '--of-accent-press', value: '#1e1ecb' },
  { name: 'Success', token: '--of-success', value: '#1e7f4e' },
  { name: 'Warning', token: '--of-warning', value: '#b8791b' },
  { name: 'Error', token: '--of-error', value: '#c4362b' },
];
const colorways = [
  { name: 'Cobalt', token: '--of-way-cobalt', value: '#2b2bf5' },
  { name: 'Lime', token: '--of-way-lime', value: '#c7f03d' },
  { name: 'Red', token: '--of-way-red', value: '#ff3b2e' },
  { name: 'Lilac', token: '--of-way-lilac', value: '#c6b4ff' },
  { name: 'Butter', token: '--of-way-butter', value: '#f4ce3a' },
  { name: 'Forest', token: '--of-way-forest', value: '#17493b' },
  { name: 'Clay', token: '--of-way-clay', value: '#c96f4a' },
  { name: 'Sky', token: '--of-way-sky', value: '#9fd6e8' },
  { name: 'Cream', token: '--of-way-cream', value: '#ece5d3' },
  { name: 'Black', token: '--of-way-black', value: '#171614' },
];
const cardColorways = [
  { name: 'Cobalt', value: '#2b2bf5' },
  { name: 'Lime', value: '#c7f03d' },
  { name: 'Clay', value: '#c96f4a' },
  { name: 'Black', value: '#171614' },
];
const spaceScale = [
  ['--of-space-1', '4px'], ['--of-space-2', '8px'], ['--of-space-3', '12px'],
  ['--of-space-4', '16px'], ['--of-space-5', '24px'], ['--of-space-6', '32px'],
  ['--of-space-7', '48px'], ['--of-space-8', '64px'], ['--of-space-9', '96px'],
  ['--of-space-10', '128px'],
];
const radii = [
  ['--of-radius-xs', '2px'], ['--of-radius-sm', '4px'], ['--of-radius-md', '8px'],
  ['--of-radius-lg', '14px'], ['--of-radius-pill', '999px'],
];

const nav = [
  ['01', 'Foundation', '#foundation'],
  ['02', 'Color', '#color'],
  ['03', 'Type', '#type'],
  ['04', 'Space & radius', '#space'],
  ['05', 'Buttons', '#buttons'],
  ['06', 'Commerce', '#commerce'],
  ['07', 'Forms', '#forms'],
  ['08', 'Product card', '#card'],
];

export default function DesignSystemPage() {
  return (
    <div className="of">
      {/* Top nav */}
      <div className="of-nav">
        <span className="of-nav__brand">OUTFIT<Reg /></span>
        <nav className="of-nav__links">
          {nav.slice(0, 4).map(([, label, href]) => (
            <a key={href} className="of-nav__link" href={href}>{label}</a>
          ))}
        </nav>
        <span className="of-nav__cart">Design system</span>
      </div>

      {/* Hero */}
      <header style={{ padding: 'var(--of-space-9) 0 var(--of-space-8)' }}>
        <div className="of-container">
          <Eyebrow>Design system · v1.0 · ++hellohello</Eyebrow>
          <h1 className="of-display" style={{ margin: '20px 0 0' }}>OUTFIT<Reg /></h1>
          <p className="of-lead" style={{ maxWidth: 640, marginTop: 'var(--of-space-5)' }}>
            An editorial commerce language — neutral Swiss grotesque set against warm
            paper, monospace metadata, electric-cobalt accents, and print-sharp corners.
            The apparel store rebuilt as reusable tokens and components.
          </p>
          <div style={{ display: 'flex', gap: 'var(--of-space-3)', marginTop: 'var(--of-space-6)', flexWrap: 'wrap' }}>
            <Button variant="accent" size="lg">Get the tokens</Button>
            <Button variant="outline" size="lg">View components</Button>
          </div>
        </div>
      </header>

      <Marquee items={['Editorial commerce', 'Neue Haas Grotesk', 'Warm paper / deep ink', 'Electric cobalt', 'Print-sharp corners', 'Mono metadata']} />

      {/* 01 Foundation */}
      <Section id="foundation" index="01 / Foundation" title="Principles"
        intro="Six ideas the whole system leans on. Everything below is a consequence of these.">
        <div style={{ display: 'grid', gap: 'var(--of-space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {[
            ['Type is the layout', 'Big grotesque headlines and a strict grid do the design work — decoration stays out of the way.'],
            ['Warm paper, deep ink', 'A bone-white canvas and near-black ink give the store its editorial, printed-catalog warmth.'],
            ['Metadata is monospace', 'Prices, sizes, SKUs and labels are set in mono with wide tracking, like spec sheets and care tags.'],
            ['One electric accent', 'Cobalt carries every call to action, link and focus ring. Product colorways add the rest of the palette.'],
            ['Sharp, printed corners', 'Radii stay small (2–4px). Softness comes from space and photography, not rounded boxes.'],
            ['Restrained motion', 'Marquees, hover reveals and quick fades — nothing that gets between the shopper and the garment.'],
          ].map(([t, d]) => (
            <Panel key={t}>
              <h3 style={{ fontSize: 20 }}>{t}</h3>
              <p className="of-small" style={{ marginTop: 'var(--of-space-3)' }}>{d}</p>
            </Panel>
          ))}
        </div>
      </Section>

      {/* 02 Color */}
      <Section id="color" index="02 / Color" title="Color"
        intro="A neutral ramp from warm paper to ink, one electric accent, and the product colorway set garments actually ship in.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--of-space-7)' }}>
          <div>
            <Eyebrow>Neutrals</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}><SwatchGrid items={neutrals} /></div>
          </div>
          <div>
            <Eyebrow>Accent &amp; status</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}><SwatchGrid items={accents} /></div>
          </div>
          <div>
            <Eyebrow>Product colorways</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}><SwatchGrid items={colorways} /></div>
          </div>
        </div>
      </Section>

      {/* 03 Type */}
      <Section id="type" index="03 / Type" title="Typography"
        intro="Neue Haas Grotesk (falling back to Helvetica Neue / Arial) for everything structural; a monospace for every piece of metadata.">
        <Panel pad="var(--of-space-2) var(--of-space-6) var(--of-space-6)">
          <TypeRow label="Display" styleVar="--of-display" track="--of-track-display" sample="OUTFIT®" />
          <TypeRow label="H1" styleVar="--of-h1" track="--of-track-h1" sample="Whitespace matters" />
          <TypeRow label="H2" styleVar="--of-h2" track="--of-track-h2" sample="The signature collection" />
          <TypeRow label="H3" styleVar="--of-h3" track="--of-track-h3" sample="Heavyweight cotton tee" />
          <TypeRow label="Lead" styleVar="--of-lead" sample="A store that celebrates the studio’s passion for apparel and craft." />
          <TypeRow label="Body" styleVar="--of-body" sample="Cut from 240gsm organic cotton with a boxy, dropped-shoulder fit. Pre-washed for zero shrink." />
          <TypeRow label="Label (mono)" styleVar="--of-label" track="--of-track-label" sample="ADD TO BAG — SIZE GUIDE" />
          <TypeRow label="Meta (mono)" styleVar="--of-meta" sample="SKU HH-0042 · 100% COTTON" />
          <TypeRow label="Price (mono)" styleVar="--of-price" sample="$48.00 USD" />
        </Panel>
      </Section>

      {/* 04 Space & radius */}
      <Section id="space" index="04 / Space & radius" title="Space & radius"
        intro="A 4px spacing base and a deliberately tight radius scale — the corners stay printed-sharp.">
        <div style={{ display: 'grid', gap: 'var(--of-space-7)', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <Panel>
            <Eyebrow>Spacing</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}>
              {spaceScale.map(([token, val]) => (
                <Spec key={token} label={token.replace('--of-', '')} value={val}
                  box={<div style={{ height: 12, width: val, maxWidth: '100%', background: 'var(--of-accent)' }} />} />
              ))}
            </div>
          </Panel>
          <Panel>
            <Eyebrow>Radius</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}>
              {radii.map(([token, val]) => (
                <Spec key={token} label={token.replace('--of-radius-', 'radius-')} value={val}
                  box={<div style={{ height: 44, width: 64, background: 'var(--of-paper-sunk)', border: 'var(--of-border-strong)', borderRadius: `var(${token})` }} />} />
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      {/* 05 Buttons */}
      <Section id="buttons" index="05 / Buttons" title="Buttons"
        intro="Mono, uppercase, wide-tracked labels in sharp 2px frames. Primary inverts to cobalt on hover.">
        <Panel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--of-space-4)', alignItems: 'center' }}>
            <Button variant="primary">Add to bag</Button>
            <Button variant="accent">Checkout</Button>
            <Button variant="outline">Size guide</Button>
            <Button variant="ghost">Keep shopping</Button>
            <Button variant="primary" disabled>Sold out</Button>
          </div>
          <hr className="of-rule" style={{ margin: 'var(--of-space-6) 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--of-space-4)', alignItems: 'center' }}>
            <Button variant="accent" size="sm">Small</Button>
            <Button variant="accent">Medium</Button>
            <Button variant="accent" size="lg">Large</Button>
          </div>
          <hr className="of-rule" style={{ margin: 'var(--of-space-6) 0' }} />
          <div style={{ maxWidth: 320 }}>
            <Button variant="primary" block size="lg">Add to bag — $48</Button>
          </div>
        </Panel>
      </Section>

      {/* 06 Commerce */}
      <Section id="commerce" index="06 / Commerce" title="Commerce controls"
        intro="Tags, colorway swatches, size selectors and quantity steppers — the small parts that make the store shoppable.">
        <div style={{ display: 'grid', gap: 'var(--of-space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <Panel>
            <Eyebrow>Tags &amp; flags</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--of-space-2)', marginTop: 'var(--of-space-4)' }}>
              <Tag variant="new">New</Tag>
              <Tag variant="accent">Restocked</Tag>
              <Tag variant="solid">Bestseller</Tag>
              <Tag>Unisex</Tag>
              <Tag variant="sold">Sold out</Tag>
            </div>
          </Panel>
          <Panel>
            <Eyebrow>Colorways</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}>
              <Swatches colors={cardColorways} />
            </div>
          </Panel>
          <Panel>
            <Eyebrow>Sizes</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}>
              <SizeSelector sizes={['XS', 'S', 'M', 'L', 'XL']} value="M" soldOut={['XL']} />
            </div>
          </Panel>
          <Panel>
            <Eyebrow>Quantity</Eyebrow>
            <div style={{ marginTop: 'var(--of-space-4)' }}>
              <Stepper value={1} />
            </div>
          </Panel>
        </div>
      </Section>

      {/* 07 Forms */}
      <Section id="forms" index="07 / Forms" title="Forms"
        intro="Mono uppercase labels, sharp surfaces, cobalt focus. Used for checkout, newsletter and account.">
        <Panel>
          <div style={{ display: 'grid', gap: 'var(--of-space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', maxWidth: 640 }}>
            <Field label="Email" id="ds-email">
              <Input id="ds-email" type="email" placeholder="you@studio.com" />
            </Field>
            <Field label="Full name" id="ds-name">
              <Input id="ds-name" placeholder="Alex Rivera" />
            </Field>
            <Field label="Discount code" id="ds-code">
              <Input id="ds-code" placeholder="HELLOHELLO" />
            </Field>
            <Field label="Disabled" id="ds-dis">
              <Input id="ds-dis" placeholder="Unavailable" disabled />
            </Field>
          </div>
          <div style={{ marginTop: 'var(--of-space-6)' }}>
            <Button variant="accent" size="lg">Subscribe</Button>
          </div>
        </Panel>
      </Section>

      {/* 08 Product card */}
      <Section id="card" index="08 / Product card" title="Product card & grid"
        intro="The core commerce object — 4:5 media, mono price, colorways, and a quick-add that reveals on hover.">
        <div className="of-grid-products">
          <ProductCard title="Whitespace Tee" price="$48" meta="4 colors" swatch="#2b2bf5"
            flag={<Tag variant="new">New</Tag>} colors={cardColorways} />
          <ProductCard title="Hello Week Hoodie" price="$96" meta="Heavyweight" swatch="#171614"
            colors={cardColorways.slice(0, 3)} />
          <ProductCard title="Grotesk Cap" price="$34" meta="One size" swatch="#c7f03d"
            flag={<Tag variant="accent">Restocked</Tag>} colors={cardColorways.slice(1)} />
          <ProductCard title="Studio Tote" price="$28" meta="Organic cotton" swatch="#c96f4a"
            colors={cardColorways} />
        </div>
      </Section>

      {/* Footer */}
      <footer style={{ borderTop: 'var(--of-border-ink)', padding: 'var(--of-space-8) 0' }}>
        <div className="of-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--of-space-5)', alignItems: 'baseline' }}>
          <span className="of-nav__brand">OUTFIT<Reg /></span>
          <span className="of-mono of-muted" style={{ fontSize: 12 }}>
            Design system reconstructed from outfit.hellohello.is — retune tokens freely.
          </span>
          <span className="of-mono of-muted" style={{ fontSize: 12 }}>© 2026 ++hellohello</span>
        </div>
      </footer>
    </div>
  );
}
