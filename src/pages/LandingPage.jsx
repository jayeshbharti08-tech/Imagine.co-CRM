import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '5px 12px',
      borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--color-hairline)',
      font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)',
      textTransform: 'uppercase', color: 'var(--color-muted)',
      background: 'var(--color-surface-card)',
    }}>
      {children}
    </span>
  );
}

const featureCards = [
  {
    color: '#ffe4f0', accent: 'var(--color-brand-pink)',
    eyebrow: 'Agentic inbox', title: 'Every lead, answered instantly',
    description: 'WhatsApp, email, and web leads get an on-brand reply in seconds — with guardrails and human handoff when it matters.',
    preview: (
      <div style={{ background: 'rgba(255,255,255,.92)', borderRadius: 'var(--radius-md)', padding: '12px', color: 'var(--color-ink)', font: 'var(--text-body-sm)', lineHeight: 1.7 }}>
        <div style={{ color: 'var(--color-muted)' }}>New lead · Northwind</div>
        <div style={{ marginTop: '4px' }}>Auto-reply sent · meeting booked</div>
      </div>
    ),
    minH: '300px',
  },
  {
    color: '#d6f5ee', accent: '#2a7a6a',
    eyebrow: 'Scoring', title: 'Self-learning lead scores',
    description: 'Scores, cohorts, and next-best-actions that retrain on your own funnel — not someone else\'s averages.',
    preview: (
      <div style={{ background: 'rgba(255,255,255,.14)', borderRadius: 'var(--radius-md)', padding: '14px', font: 'var(--text-body-sm)', lineHeight: 1.8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: .8 }}>Acme Inc</span><span>92 · Hot</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: .8 }}>Lumen Co</span><span>61 · Warm</span></div>
      </div>
    ),
    minH: '300px',
  },
  {
    color: '#ede8fb', accent: 'var(--color-brand-lavender)',
    eyebrow: 'Schema', title: 'Build it by describing it',
    description: 'Custom objects, fields, and pipelines from a sentence. Every change is a reversible change-set.',
    preview: (
      <div style={{ background: 'rgba(255,255,255,.7)', borderRadius: 'var(--radius-md)', padding: '12px', color: 'var(--color-ink)', font: 'var(--text-body-sm)', lineHeight: 1.6 }}>
        <div style={{ color: 'var(--color-muted)' }}>"Add a renewal date to accounts"</div>
        <div style={{ marginTop: '4px', color: 'var(--color-success)' }}>✓ Field created · change-set #214</div>
      </div>
    ),
    minH: '300px',
  },
  {
    color: '#ffe8d8', accent: 'var(--color-brand-peach)',
    eyebrow: 'Journeys', title: 'Autonomous nurture sequences',
    description: 'Durable, scheduled journeys with bandit-tested variants and funnel-driven experiment suggestions.',
    preview: (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {['Email', 'Wait 2d', 'SMS'].map((step, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span style={{ background: 'rgba(255,255,255,.85)', color: 'var(--color-ink)', font: 'var(--text-caption)', padding: '8px 12px', borderRadius: 'var(--radius-pill)' }}>{step}</span>
            {i < 2 && <span style={{ opacity: .6 }}>→</span>}
          </span>
        ))}
      </div>
    ),
    minH: '260px',
  },
  {
    color: '#fdf3cc', accent: 'var(--color-brand-ochre)',
    eyebrow: 'MCP-native', title: 'Your CRM is an MCP server',
    description: 'Scoped, expiring tokens let any agent operate your CRM through the same RBAC path your team uses.',
    preview: null,
    minH: '260px',
  },
  {
    color: '#f8f4ea', accent: '#c8b870',
    eyebrow: 'Guardrails', title: 'Enterprise from day one',
    description: 'Row-level tenant isolation, role-based access, audited writes, and hashed, expiring invites.',
    preview: null,
    minH: '260px',
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 20, height: '64px', background: 'color-mix(in srgb, var(--color-canvas) 88%, transparent)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-hairline-soft)', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 'var(--container-max)', width: '100%', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Logo />
          <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
            {['Product', 'Solutions', 'Pricing', 'Docs'].map(label => (
              <a key={label} href="#features" style={{ cursor: 'pointer', padding: '8px 12px', borderRadius: 'var(--radius-sm)', font: 'var(--text-nav-link)', color: 'var(--color-muted)', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/login" style={{ cursor: 'pointer', font: 'var(--text-nav-link)', color: 'var(--color-ink)', textDecoration: 'none' }}>Sign in</Link>
            <Button to="/signup">Get started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <Badge>Agentic CRM</Badge>
            <h1 style={{ font: 'var(--text-display-xl)', letterSpacing: 'var(--tracking-display-xl)', margin: '20px 0 0', textWrap: 'balance' }}>
              The CRM that works your pipeline while you sleep
            </h1>
            <p style={{ font: 'var(--text-title-md)', fontWeight: 400, color: 'var(--color-body)', maxWidth: '480px', margin: '24px 0 0', textWrap: 'pretty' }}>
              AI agents answer every lead, score and segment your contacts, and run nurture journeys — with audit trails, RBAC, and tenant isolation built in from day one.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <Button size="lg" to="/signup">Create your workspace</Button>
              <Button size="lg" variant="secondary" to="/login">Sign in</Button>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginTop: '40px', alignItems: 'center', font: 'var(--text-caption)', color: 'var(--color-muted)' }}>
              <span>Trusted by 8,000+ revenue teams</span>
              <span style={{ display: 'flex', gap: '14px', opacity: .7 }}>
                {['Ramp', 'Vanta', 'Notion'].map(b => <strong key={b} style={{ fontWeight: 600 }}>{b}</strong>)}
              </span>
            </div>
          </div>

          {/* Illustration placeholder */}
          <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface-soft)', overflow: 'hidden', border: '1px solid var(--color-hairline-soft)' }}>
            <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--color-brand-pink)', top: '12%', left: '10%', filter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-brand-ochre)', bottom: '14%', left: '32%' }} />
            <div style={{ position: 'absolute', width: '170px', height: '170px', borderRadius: '46% 54% 50% 50% / 55% 50% 50% 45%', background: 'var(--color-brand-lavender)', top: '20%', right: '12%' }} />
            <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: 'var(--color-brand-mint)', bottom: '10%', right: '26%' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '14px', textAlign: 'center', font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>3D claymation illustration — placeholder</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: 'var(--color-surface-soft)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
            <Badge>The platform</Badge>
            <h2 style={{ font: 'var(--text-display-lg)', letterSpacing: 'var(--tracking-display-lg)', margin: '16px 0 0', textWrap: 'balance' }}>
              Everything a CRM should do — done for you
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {featureCards.map((card, i) => (
              <div key={i} style={{ background: card.color, borderRadius: 'var(--radius-xl)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: card.minH }}>
                <div>
                  <div style={{ font: 'var(--text-caption-uppercase)', letterSpacing: 'var(--tracking-caption-uppercase)', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '8px' }}>{card.eyebrow}</div>
                  <div style={{ font: 'var(--text-title-md)' }}>{card.title}</div>
                  <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-body)', margin: '8px 0 0' }}>{card.description}</p>
                </div>
                {card.preview && <div style={{ marginTop: 'auto' }}>{card.preview}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '96px 32px' }}>
        <div style={{ background: 'var(--color-surface-soft)', borderRadius: 'var(--radius-xl)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '32px', padding: '64px' }}>
          <div>
            <h2 style={{ font: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display-md)', margin: 0, textWrap: 'balance' }}>
              Turn every lead into pipeline — automatically
            </h2>
            <p style={{ font: 'var(--text-body-md)', color: 'var(--color-body)', margin: '16px 0 0', maxWidth: '420px' }}>
              Spin up your workspace in under a minute. No credit card required.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <Button size="lg" to="/signup">Create your workspace</Button>
              <Button size="lg" variant="secondary" to="/signup">Talk to sales</Button>
            </div>
          </div>
          <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-card)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', background: 'var(--color-brand-coral)', top: '18%', left: '14%' }} />
            <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '48% 52% 50% 50% / 55% 50% 50% 45%', background: 'var(--color-brand-ochre)', bottom: '12%', right: '22%' }} />
            <div style={{ position: 'absolute', width: '70px', height: '70px', borderRadius: '50%', background: 'var(--color-brand-mint)', bottom: '20%', left: '40%' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '12px', textAlign: 'center', font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>Mascot scene — placeholder</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-hairline-soft)', background: 'var(--color-surface-soft)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '8px', background: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--color-brand-pink)' }} />
            </span>
            <span style={{ font: 'var(--text-title-sm)' }}>Agentic CRM</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', font: 'var(--text-nav-link)', color: 'var(--color-muted)' }}>
            <Link to="/login" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Sign in</Link>
            <Link to="/signup" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Sign up</Link>
            <a href="#features" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Product</a>
          </div>
          <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>© 2026 Agentic CRM</span>
        </div>
      </footer>
    </div>
  );
}
