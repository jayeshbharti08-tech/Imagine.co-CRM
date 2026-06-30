import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  type = 'button',
  onClick,
  style,
  disabled,
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-sm)',
    font: 'var(--text-button)',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    transition: 'opacity .15s, background .15s',
    whiteSpace: 'nowrap',
    ...(disabled && { opacity: 0.5, pointerEvents: 'none' }),
  };

  const sizes = {
    sm: { padding: '8px 14px', fontSize: '13px' },
    md: { padding: '10px 18px' },
    lg: { padding: '14px 24px', fontSize: '15px' },
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-ink)',
      border: '1.5px solid var(--color-hairline)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-muted)',
    },
  };

  const combined = { ...base, ...sizes[size], ...variants[variant], ...style };

  if (to) return <Link to={to} style={combined}>{children}</Link>;
  if (href) return <a href={href} style={combined}>{children}</a>;
  return <button type={type} style={combined} onClick={onClick} disabled={disabled}>{children}</button>;
}
