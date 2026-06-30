export default function Input({
  label,
  hint,
  id,
  type = 'text',
  name,
  placeholder,
  required,
  autoComplete,
  minLength,
  value,
  onChange,
}) {
  const inputId = id || name;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={inputId} style={{ font: 'var(--text-caption)', color: 'var(--color-body-strong)', fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1.5px solid var(--color-hairline)',
          background: '#fff',
          font: 'var(--text-body-md)',
          color: 'var(--color-ink)',
          outline: 'none',
          transition: 'border-color .15s',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--color-ink)')}
        onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
      />
      {hint && <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>{hint}</span>}
    </div>
  );
}
