import Logo from './Logo';

export default function BrandPanel({ headline, body, bullets }) {
  return (
    <aside style={{
      position: 'relative',
      background: 'var(--color-brand-teal)',
      color: 'var(--color-on-dark)',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>
      <Logo dark to="/" />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px' }}>
        <h2 style={{ font: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display-md)', margin: 0, textWrap: 'balance' }}>
          {headline}
        </h2>
        <p style={{ font: 'var(--text-body-md)', color: 'rgba(255,255,255,.78)', margin: '20px 0 0', textWrap: 'pretty' }}>
          {body}
        </p>
        {bullets && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', font: 'var(--text-body-md)', color: 'rgba(255,255,255,.9)' }}>
                <span style={{ color: 'var(--color-brand-mint)' }}>●</span> {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p style={{ position: 'relative', zIndex: 2, font: 'var(--text-caption)', color: 'rgba(255,255,255,.55)', margin: 0 }}>
        Trusted by 8,000+ revenue teams
      </p>

      {/* clay blobs */}
      <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '46% 54% 50% 50% / 55% 50% 50% 45%', background: 'var(--color-brand-lavender)', opacity: .35, bottom: '-60px', right: '-40px' }} />
      <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-brand-pink)', opacity: .3, top: '30%', right: '-30px' }} />
    </aside>
  );
}
