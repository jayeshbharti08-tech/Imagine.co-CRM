/* ============================================================================
   OUTFIT® — React component kit
   Thin, unstyled-logic components that render the class-based primitives
   defined in ../styles/outfit-tokens.css. Import the stylesheet once at the
   app root (or on the design-system page) and use these anywhere under a `.of`
   ancestor.
   ========================================================================== */
import { useState } from 'react';

/* ---- Registered mark ---------------------------------------------------- */
export const Reg = () => <sup className="of-reg">®</sup>;

/* ---- Eyebrow / kicker --------------------------------------------------- */
export function Eyebrow({ children, ...rest }) {
  return <span className="of-eyebrow" {...rest}>{children}</span>;
}

/* ---- Button ------------------------------------------------------------- */
export function Button({
  children,
  variant = 'primary',
  size,
  block,
  as: As = 'button',
  className = '',
  ...rest
}) {
  const cls = [
    'of-btn',
    `of-btn--${variant}`,
    size ? `of-btn--${size}` : '',
    block ? 'of-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');
  return <As className={cls} {...rest}>{children}</As>;
}

/* ---- Tag ---------------------------------------------------------------- */
export function Tag({ children, variant, className = '', ...rest }) {
  const cls = ['of-tag', variant ? `of-tag--${variant}` : '', className]
    .filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}

/* ---- Colorway swatches -------------------------------------------------- */
export function Swatches({ colors = [], value, onChange }) {
  const [internal, setInternal] = useState(colors[0]?.value);
  const active = value ?? internal;
  return (
    <span className="of-swatches" role="group" aria-label="Colorways">
      {colors.map((c) => (
        <button
          key={c.value}
          type="button"
          className="of-swatch"
          title={c.name}
          aria-label={c.name}
          aria-pressed={active === c.value}
          style={{ background: c.value }}
          onClick={() => { setInternal(c.value); onChange?.(c.value); }}
        />
      ))}
    </span>
  );
}

/* ---- Size selector ------------------------------------------------------ */
export function SizeSelector({ sizes = [], value, onChange, soldOut = [] }) {
  const [internal, setInternal] = useState(value);
  const active = value ?? internal;
  return (
    <span className="of-sizes" role="group" aria-label="Sizes">
      {sizes.map((s) => (
        <button
          key={s}
          type="button"
          className="of-size"
          disabled={soldOut.includes(s)}
          aria-pressed={active === s}
          onClick={() => { setInternal(s); onChange?.(s); }}
        >
          {s}
        </button>
      ))}
    </span>
  );
}

/* ---- Quantity stepper --------------------------------------------------- */
export function Stepper({ value = 1, min = 1, max = 99, onChange }) {
  const [internal, setInternal] = useState(value);
  const clamp = (n) => Math.max(min, Math.min(max, n));
  const set = (n) => { const v = clamp(n); setInternal(v); onChange?.(v); };
  return (
    <span className="of-stepper">
      <button type="button" aria-label="Decrease" onClick={() => set(internal - 1)}>–</button>
      <output>{internal}</output>
      <button type="button" aria-label="Increase" onClick={() => set(internal + 1)}>+</button>
    </span>
  );
}

/* ---- Field + input ------------------------------------------------------ */
export function Field({ label, id, children }) {
  return (
    <div className="of-field">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
}
export function Input({ className = '', ...rest }) {
  return <input className={`of-input ${className}`.trim()} {...rest} />;
}

/* ---- Marquee ------------------------------------------------------------ */
export function Marquee({ items = [], repeat = 2 }) {
  const line = Array.from({ length: repeat }).flatMap((_, r) =>
    items.map((it, i) => (
      <span className="of-marquee__item" key={`${r}-${i}`}>{it}</span>
    ))
  );
  return (
    <div className="of-marquee" aria-hidden="true">
      <div className="of-marquee__track">{line}</div>
    </div>
  );
}

/* ---- Product card ------------------------------------------------------- */
export function ProductCard({
  title,
  price,
  meta,
  flag,
  colors = [],
  swatch,
  quickAction = 'Add to bag',
  onQuick,
}) {
  return (
    <article className="of-card">
      <div className="of-card__media">
        {flag && <span className="of-card__flag">{flag}</span>}
        {swatch && <div style={{ width: '100%', height: '100%', background: swatch }} />}
        <div className="of-card__quick">
          <Button variant="primary" size="sm" block onClick={onQuick}>{quickAction}</Button>
        </div>
      </div>
      <div className="of-card__row">
        <span className="of-card__title">{title}</span>
        <span className="of-card__price">{price}</span>
      </div>
      <div className="of-card__row">
        {meta && <span className="of-card__meta">{meta}</span>}
        {colors.length > 0 && <Swatches colors={colors} />}
      </div>
    </article>
  );
}
