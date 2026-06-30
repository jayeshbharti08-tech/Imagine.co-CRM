import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';
import Button from '../components/Button';
import Input from '../components/Input';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); navigate('/app'); };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>

      <BrandPanel
        headline="Welcome back to your pipeline"
        body="Your agents have been working while you were away. Sign in to see what moved."
        bullets={[
          '24 leads answered overnight',
          '6 contacts re-scored to hot',
          '3 meetings booked automatically',
        ]}
      />

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
        <div style={{ width: 'min(420px, 100%)' }}>
          <span style={{ font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Sign in</span>
          <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: '8px 0 0' }}>Log in to your workspace</h1>
          <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '8px 0 0' }}>Pick up right where your agents left off.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '32px' }}>
            <Input label="Email" type="email" name="email" placeholder="you@company.com" autoComplete="email" required value={form.email} onChange={handleChange} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ font: 'var(--text-caption)', color: 'var(--color-body-strong)', fontWeight: 600 }}>Password</label>
                <Link to="/reset-password" style={{ font: 'var(--text-caption)', color: 'var(--color-muted)', textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <Input type="password" name="password" placeholder="Your password" autoComplete="current-password" required value={form.password} onChange={handleChange} />
            </div>

            <Button size="lg" type="submit" style={{ width: '100%' }}>Log in</Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
            <span style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }} />
            <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>or</span>
            <span style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }} />
          </div>

          <Button variant="secondary" size="lg" style={{ width: '100%' }}>Continue with Google</Button>

          <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '28px 0 0', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
