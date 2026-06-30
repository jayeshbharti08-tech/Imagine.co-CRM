import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const handleRequest = e => { e.preventDefault(); setStep('confirm'); };
  const handleConfirm = e => { e.preventDefault(); navigate('/login'); };

  const step2Active = step === 'confirm';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <header style={{ width: '100%', maxWidth: 'var(--container-max)', padding: '24px 32px', boxSizing: 'border-box' }}>
        <Logo />
      </header>

      <main style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 24px 48px' }}>
        <div style={{ width: 'min(440px, 100%)', background: '#fff', borderRadius: 'var(--radius-xl)', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)' }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <span style={{ height: '4px', flex: 1, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)' }} />
            <span style={{ height: '4px', flex: 1, borderRadius: 'var(--radius-pill)', background: step2Active ? 'var(--color-primary)' : 'var(--color-surface-strong)' }} />
          </div>

          {step === 'request' ? (
            <>
              <span style={{ font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Step 1 of 2</span>
              <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: '8px 0 0' }}>Reset your password</h1>
              <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '8px 0 0' }}>Enter your account email and we'll send a reset link.</p>

              <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '28px' }}>
                <Input label="Email" type="email" name="email" placeholder="you@company.com" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
                <Button size="lg" type="submit" style={{ width: '100%' }}>Send reset link</Button>
              </form>

              <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '24px 0 0', textAlign: 'center' }}>
                <span onClick={() => setStep('confirm')} style={{ color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>Already have a reset token?</span>
              </p>
            </>
          ) : (
            <>
              <span style={{ font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Step 2 of 2</span>
              <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: '8px 0 0' }}>Set a new password</h1>
              <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '8px 0 0' }}>Paste the token from your email and choose a new password.</p>

              <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '28px' }}>
                <Input label="Reset token" name="token" placeholder="Paste your token" required value={token} onChange={e => setToken(e.target.value)} />
                <Input label="New password" type="password" name="password" placeholder="8+ characters" autoComplete="new-password" minLength={8} required hint="Use 8 or more characters." value={password} onChange={e => setPassword(e.target.value)} />
                <Button size="lg" type="submit" style={{ width: '100%' }}>Set new password</Button>
              </form>

              <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '24px 0 0', textAlign: 'center' }}>
                <span onClick={() => setStep('request')} style={{ color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>Need a new token?</span>
              </p>
            </>
          )}

          <div style={{ borderTop: '1px solid var(--color-hairline-soft)', marginTop: '28px', paddingTop: '20px', textAlign: 'center' }}>
            <Link to="/login" style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', textDecoration: 'none' }}>← Back to log in</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
