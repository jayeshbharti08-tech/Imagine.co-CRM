import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', workspaceName: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); navigate('/app'); };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>

      <BrandPanel
        headline="Set up a CRM that runs itself"
        body="Create your workspace and AI agents start answering leads, scoring contacts, and running journeys from your first import."
        bullets={[
          'Agentic inbox & lead scoring',
          'Reshape your schema in plain language',
          'RBAC & tenant isolation from day one',
        ]}
      />

      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
        <div style={{ width: 'min(420px, 100%)' }}>
          <span style={{ font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Get started free</span>
          <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: '8px 0 0' }}>Create your account</h1>
          <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '8px 0 0' }}>No credit card required. Set up in under a minute.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '32px' }}>
            <Input label="Your name" name="name" placeholder="Jordan Lee" autoComplete="name" value={form.name} onChange={handleChange} />
            <Input label="Work email" type="email" name="email" placeholder="you@company.com" autoComplete="email" required value={form.email} onChange={handleChange} />
            <Input label="Password" type="password" name="password" placeholder="8+ characters" autoComplete="new-password" minLength={8} required hint="Use 8 or more characters." value={form.password} onChange={handleChange} />
            <Input label="Workspace name" name="workspaceName" placeholder="Acme Inc" required value={form.workspaceName} onChange={handleChange} />
            <Button size="lg" type="submit" style={{ width: '100%' }}>Create account</Button>
          </form>

          <p style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)', margin: '16px 0 0', textAlign: 'center', textWrap: 'pretty' }}>
            By creating an account you agree to our Terms and Privacy Policy.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
            <span style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }} />
            <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>or</span>
            <span style={{ flex: 1, height: '1px', background: 'var(--color-hairline)' }} />
          </div>

          <Button variant="secondary" size="lg" style={{ width: '100%' }}>Continue with Google</Button>

          <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '28px 0 0', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
