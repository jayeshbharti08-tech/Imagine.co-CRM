import { Link } from 'react-router-dom';

export default function Logo({ dark = false, to = '/' }) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: dark ? 'var(--color-on-dark)' : 'var(--color-ink)' }}>
      <span style={{
        width: '28px', height: '28px', borderRadius: '9px',
        background: dark ? '#fff' : 'var(--color-primary)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transform: 'rotate(45deg)',
      }}>
        <span style={{ width: '9px', height: '9px', borderRadius: '3px', background: 'var(--color-brand-pink)' }} />
      </span>
      <span style={{ font: 'var(--text-title-md)', fontWeight: 600, letterSpacing: '-0.02em' }}>Agentic CRM</span>
    </Link>
  );
}
