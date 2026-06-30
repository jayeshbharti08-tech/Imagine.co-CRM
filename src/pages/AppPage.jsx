import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

// ── helpers ──────────────────────────────────────────────────────
function toneFromName(name) {
  const tones = ['lavender', 'peach', 'mint', 'ochre', 'teal'];
  let h = 0; for (const ch of name) h = (h + ch.charCodeAt(0)) % tones.length;
  return tones[h];
}
const STATUS_META = {
  auto_reply:  { bg: '#ede8fb', color: '#6b40e0', label: 'On AI' },
  awaiting:    { bg: '#fff4d6', color: '#b45309', label: 'Awaiting reply' },
  resolved:    { bg: '#d1fae5', color: '#15803d', label: 'Resolved' },
  new:         { bg: '#ffe4d6', color: '#c2410c', label: 'New' },
};
const CONTACT_STATUS = {
  lead:        { bg: '#ffe4d6', color: '#c2410c', label: 'Lead' },
  opportunity: { bg: '#ede8fb', color: '#6b40e0', label: 'Opportunity' },
  customer:    { bg: '#d1fae5', color: '#15803d', label: 'Customer' },
};
const TONE_STYLES = {
  lavender: { bg: '#ede8fb', color: '#6b40e0' },
  peach:    { bg: '#ffe4d6', color: '#c2410c' },
  mint:     { bg: '#d6f5ee', color: '#0d7a5f' },
  ochre:    { bg: '#fff4d6', color: '#b45309' },
  teal:     { bg: '#d0e8e8', color: '#1a4a4a' },
  pink:     { bg: '#ffe4f0', color: '#be185d' },
  cream:    { bg: 'var(--color-surface-card)', color: 'var(--color-muted)' },
  success:  { bg: '#d1fae5', color: '#15803d' },
  warning:  { bg: '#fff4d6', color: '#b45309' },
  error:    { bg: '#fee2e2', color: '#b91c1c' },
};
function Badge({ tone = 'cream', children }) {
  const s = TONE_STYLES[tone] || TONE_STYLES.cream;
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 'var(--radius-pill)', padding: '3px 10px', font: 'var(--text-caption)', fontWeight: 600, whiteSpace: 'nowrap', display: 'inline-block' }}>
      {children}
    </span>
  );
}
function Avatar({ name = '', size = 30 }) {
  const tone = toneFromName(name);
  const s = TONE_STYLES[tone] || TONE_STYLES.cream;
  return (
    <span style={{ width: size, height: size, borderRadius: '50%', background: s.bg, color: s.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: `600 ${size * 0.4}px/1 var(--font-body)`, flexShrink: 0 }}>
      {name.charAt(0)}
    </span>
  );
}
function Card({ children, variant = 'plain', padding = '22px', style }) {
  const bg = variant === 'cream' ? 'var(--color-surface-soft)' : '#fff';
  return (
    <div style={{ background: bg, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-hairline-soft)', overflow: 'hidden', padding: padding === '0' ? undefined : padding, ...style }}>
      {children}
    </div>
  );
}
function Table({ head, rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>{head.map((h, i) => <th key={i} style={{ textAlign: h.right ? 'right' : 'left', padding: '10px 20px', font: 'var(--text-caption)', color: 'var(--color-muted)', borderBottom: '1px solid var(--color-hairline)', fontWeight: 600 }}>{h.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ textAlign: head[ci]?.right ? 'right' : 'left', padding: '12px 20px', font: 'var(--text-body-sm)', color: 'var(--color-body-strong)', borderBottom: ri < rows.length - 1 ? '1px solid var(--color-hairline-soft)' : 'none', verticalAlign: 'middle' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function Input({ placeholder, value, onChange, label, type = 'text', id, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && <label htmlFor={id} style={{ font: 'var(--text-caption)', fontWeight: 600, color: 'var(--color-body-strong)' }}>{label}</label>}
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-hairline)', background: 'var(--color-canvas)', font: 'var(--text-body-sm)', color: 'var(--color-ink)', outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );
}

// ── Tab components ────────────────────────────────────────────────

function Inbox() {
  const [convs, setConvs] = useState([
    { id: 'c1', idShort: 'a3f1c9', title: 'Northwind Robotics', preview: 'Do you support multi-region data residency?', state: 'auto_reply', assigneeId: null },
    { id: 'c2', idShort: 'b7c20e', title: 'Lumen Co', preview: 'Can we get a demo next week?', state: 'awaiting', assigneeId: 'me' },
    { id: 'c3', idShort: 'c9d4a1', title: 'Acme Inc', preview: 'Thanks — that answered it!', state: 'resolved', assigneeId: null },
  ]);
  const [threads, setThreads] = useState({
    c1: [
      { dir: 'in', author: 'Northwind Robotics', body: 'Hi! Do you support multi-region data residency?' },
      { dir: 'out', author: 'AI agent', body: 'Great question — yes. Agentic CRM keeps each workspace\'s data row-isolated and lets you pin storage to US or EU regions. Want me to send the security overview?' },
      { dir: 'in', author: 'Northwind Robotics', body: 'Please do, and pricing for 25 seats.' },
    ],
    c2: [
      { dir: 'in', author: 'Lumen Co', body: 'Can we get a demo next week?' },
      { dir: 'out', author: 'AI agent', body: 'Absolutely. I have Tue 2pm or Wed 11am open — which works?' },
    ],
    c3: [
      { dir: 'in', author: 'Acme Inc', body: 'How do lead scores update over time?' },
      { dir: 'out', author: 'AI agent', body: 'They retrain on your own funnel weekly, so scores reflect what actually converts for you.' },
      { dir: 'in', author: 'Acme Inc', body: 'Thanks — that answered it!' },
    ],
  });
  const [selId, setSelId] = useState('c1');
  const [newMsg, setNewMsg] = useState('');

  const sel = convs.find(c => c.id === selId) || convs[0];
  const isMine = sel?.assigneeId === 'me';
  const openCount = convs.filter(c => c.state !== 'resolved').length;
  const aiCount = convs.filter(c => c.assigneeId == null).length;

  const sendInbound = () => {
    if (!newMsg.trim()) return;
    const id = 'c' + Date.now();
    const idShort = Math.random().toString(16).slice(2, 8);
    setConvs(cs => [{ id, idShort, title: 'New web lead', preview: newMsg, state: 'auto_reply', assigneeId: null }, ...cs]);
    setThreads(t => ({ ...t, [id]: [
      { dir: 'in', author: 'New web lead', body: newMsg },
      { dir: 'out', author: 'AI agent', body: "Thanks for reaching out! I can help with that right away — could you share your team size and timeline so I tailor the answer?" },
    ]}));
    setSelId(id);
    setNewMsg('');
  };

  const toggleAssign = () => {
    setConvs(cs => cs.map(c => c.id === selId ? { ...c, assigneeId: c.assigneeId === 'me' ? null : 'me', state: c.assigneeId === 'me' ? 'auto_reply' : 'awaiting' } : c));
  };

  const agentReply = () => {
    setThreads(t => ({ ...t, [selId]: [...(t[selId] || []), { dir: 'out', author: 'AI agent', body: "Happy to help — I've logged this and pulled the relevant details. Anything else you'd like me to cover?" }] }));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Inbox</h1>
          <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Every lead gets an instant agent reply. Jump in whenever you want to.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge tone="success">{openCount} open</Badge>
          <Badge tone="lavender">{aiCount} on AI</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card variant="cream" padding="20px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 4px' }}>Simulate an inbound lead</h3>
            <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '0 0 14px' }}>Web channel · contact provisioned. Type a message to see the auto-reply.</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <input placeholder="e.g. Do you integrate with HubSpot?" value={newMsg} onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendInbound()}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-hairline)', background: '#fff', font: 'var(--text-body-sm)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <Button onClick={sendInbound}>Send → auto-reply</Button>
            </div>
          </Card>

          <Card variant="plain" padding="0">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}>
              <h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Conversations</h3>
            </div>
            {convs.map(conv => {
              const meta = STATUS_META[conv.state] || STATUS_META.new;
              return (
                <div key={conv.id} onClick={() => setSelId(conv.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '14px 20px', borderBottom: '1px solid var(--color-hairline-soft)', cursor: 'pointer', background: conv.id === selId ? 'var(--color-surface-soft)' : 'transparent' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ font: 'var(--text-title-sm)' }}>{conv.title}</span>
                      <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)' }}>#{conv.idShort}</span>
                    </div>
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '320px' }}>{conv.preview}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <Badge tone={meta.bg === '#ede8fb' ? 'lavender' : meta.bg === '#d1fae5' ? 'success' : meta.bg === '#fff4d6' ? 'warning' : 'peach'}>{meta.label}</Badge>
                    <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{conv.assigneeId === 'me' ? 'Assigned to me' : 'Handled by AI'}</span>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        <div style={{ position: 'sticky', top: '84px' }}>
          <Card variant="plain" padding="0">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ font: 'var(--text-title-sm)' }}>{sel?.title || '—'}</div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>Thread #{sel?.idShort} · {(STATUS_META[sel?.state] || STATUS_META.new).label}</div>
              </div>
              <Button variant="secondary" size="sm" onClick={toggleAssign}>{isMine ? 'Hand back to AI' : 'Assign to me'}</Button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto' }}>
              {(threads[selId] || []).map((msg, i) => {
                const out = msg.dir === 'out';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: out ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: out ? 'var(--color-brand-teal)' : 'var(--color-surface-card)', color: out ? 'var(--color-on-dark)' : 'var(--color-ink)' }}>
                      <div style={{ font: 'var(--text-caption)', marginBottom: '3px', color: out ? 'rgba(255,255,255,.7)' : 'var(--color-muted)' }}>{msg.author}</div>
                      <div style={{ font: 'var(--text-body-sm)', lineHeight: 1.5 }}>{msg.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-hairline-soft)', display: 'flex', gap: '10px' }}>
              <Button onClick={agentReply}>Generate agent reply</Button>
              <Button variant="secondary" onClick={toggleAssign}>{isMine ? 'Hand back to AI' : 'Assign to me'}</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Contacts() {
  const [contacts, setContacts] = useState([
    { id: 'k1', name: 'Dana Wells', email: 'dana@northwind.co', status: 'opportunity', score: 88 },
    { id: 'k2', name: 'Marcus Vue', email: 'marcus@lumen.io', status: 'lead', score: 54 },
    { id: 'k3', name: 'Priya Raman', email: 'priya@acme.com', status: 'customer', score: 92 },
    { id: 'k4', name: 'Tom Becker', email: 'tom@vantage.dev', status: 'lead', score: 31 },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const tierFor = s => s >= 80 ? { tier: 'Hot', tone: 'pink' } : s >= 50 ? { tier: 'Warm', tone: 'ochre' } : { tier: 'Cold', tone: 'cream' };

  const addContact = () => {
    if (!name.trim()) return;
    setContacts(cs => [{ id: 'k' + Date.now(), name, email, status: 'lead', score: 20 + Math.floor(Math.random() * 40) }, ...cs]);
    setName(''); setEmail('');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Contacts</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Scored and segmented automatically as your funnel learns.</p>
      </div>

      <Card variant="cream" padding="20px" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '160px' }}><Input label="Name" placeholder="Dana Wells" value={name} onChange={e => setName(e.target.value)} /></div>
          <div style={{ flex: 1, minWidth: '160px' }}><Input label="Email" placeholder="dana@company.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <Button onClick={addContact} style={{ height: '44px' }}>Add contact</Button>
        </div>
      </Card>

      <Card variant="plain" padding="0">
        <Table
          head={[{ label: 'Name' }, { label: 'Status' }, { label: 'Lead score' }, { label: 'Owner' }, { label: 'Actions', right: true }]}
          rows={contacts.map(c => {
            const sm = CONTACT_STATUS[c.status] || CONTACT_STATUS.lead;
            const t = tierFor(c.score);
            return [
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar name={c.name} size={30} />
                <div>
                  <div style={{ font: 'var(--text-title-sm)' }}>{c.name}</div>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{c.email}</div>
                </div>
              </div>,
              <Badge tone={c.status === 'opportunity' ? 'lavender' : c.status === 'customer' ? 'success' : 'peach'}>{sm.label}</Badge>,
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ font: 'var(--text-title-sm)' }}>{c.score}</span>
                <Badge tone={t.tone}>{t.tier}</Badge>
              </div>,
              'Jordan Lee',
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button variant="secondary" size="sm" onClick={() => setContacts(cs => cs.map(x => x.id === c.id ? { ...x, score: Math.min(99, Math.max(5, x.score + Math.floor(Math.random() * 30) - 12)) } : x))}>Re-score</Button>
                <Button variant="secondary" size="sm" onClick={() => setContacts(cs => cs.map(x => x.id === c.id && x.status === 'lead' ? { ...x, status: 'opportunity' } : x))}>Enrich</Button>
              </div>,
            ];
          })}
        />
      </Card>
    </div>
  );
}

function Cohorts() {
  const cohorts = [
    { name: 'Hot leads', kind: 'auto', tone: 'pink', members: 42, desc: 'Score ≥ 80, active in the last 14 days.' },
    { name: 'Champions', kind: 'auto', tone: 'lavender', members: 18, desc: 'Customers who referred or expanded.' },
    { name: 'At-risk', kind: 'auto', tone: 'ochre', members: 9, desc: 'No touch in 30+ days, falling score.' },
    { name: 'Demo requested', kind: 'rule', tone: 'peach', members: 27, desc: 'Asked for a demo via any channel.' },
    { name: 'Enterprise', kind: 'rule', tone: 'teal', members: 12, desc: 'Company size 500+ employees.' },
    { name: 'Newsletter', kind: 'manual', tone: 'cream', members: 310, desc: 'Opted in to product updates.' },
  ];
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Cohorts</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Segments your agents maintain as contacts move through the funnel.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {cohorts.map(co => (
          <Card key={co.name} padding="22px">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Badge tone={co.tone}>{co.kind}</Badge>
              <span style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)' }}>{co.members}</span>
            </div>
            <h3 style={{ font: 'var(--text-title-md)', margin: '18px 0 4px' }}>{co.name}</h3>
            <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: 0 }}>{co.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Pipeline() {
  const stages = [
    { name: 'New', count: 64 }, { name: 'Qualified', count: 38 }, { name: 'Demo', count: 21 }, { name: 'Proposal', count: 11 }, { name: 'Won', count: 7 },
  ];
  const funnel = [
    { label: 'New → Qualified', actual: '59%', target: '55%', status: 'met', tone: 'success' },
    { label: 'Qualified → Demo', actual: '55%', target: '60%', status: 'below', tone: 'warning' },
    { label: 'Demo → Proposal', actual: '52%', target: '45%', status: 'above', tone: 'lavender' },
    { label: 'Proposal → Won', actual: '64%', target: '50%', status: 'above', tone: 'lavender' },
  ];
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Pipeline</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Conversion at each stage, benchmarked against your targets.</p>
      </div>
      <Card padding="0">
        <div style={{ padding: '20px' }}>
          <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 14px' }}>Sales pipeline</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {stages.map(st => (
              <span key={st.name} style={{ font: 'var(--text-caption)', padding: '8px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-card)', color: 'var(--color-ink)' }}>{st.name} · {st.count}</span>
            ))}
          </div>
        </div>
        <Table
          head={[{ label: 'Stage transition' }, { label: 'Actual' }, { label: 'Benchmark' }, { label: 'Status' }]}
          rows={funnel.map(f => [f.label, <strong>{f.actual}</strong>, <span style={{ color: 'var(--color-muted)' }}>{f.target}</span>, <Badge tone={f.tone}>{f.status}</Badge>])}
        />
      </Card>
    </div>
  );
}

function Analytics() {
  const [period, setPeriod] = useState('30 days');
  const factor = period === '7 days' ? 0.3 : period === '90 days' ? 2.7 : 1;
  const r = n => Math.round(n * factor);
  const money = n => '$' + (r(n) / 1000).toFixed(0) + 'k';
  const kpis = [
    { label: 'Leads', value: r(184) },
    { label: 'Pipeline value', value: money(742000) },
    { label: 'Deals won', value: r(23) },
    { label: 'Win rate', value: '31%' },
  ];
  const agentsData = [
    { name: 'Jordan Lee', role: 'owner', leads: r(64), pipeline: money(280000), won: r(9), winRate: '34%', meetings: r(18), tone: 'peach' },
    { name: 'Sara Kade', role: 'admin', leads: r(58), pipeline: money(244000), won: r(8), winRate: '32%', meetings: r(15), tone: 'lavender' },
    { name: 'Devon Rao', role: 'sales_agent', leads: r(62), pipeline: money(218000), won: r(6), winRate: '27%', meetings: r(12), tone: 'mint' },
  ];
  const pills = ['7 days', '30 days', '90 days'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Analytics</h1>
          <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Team performance across the selected window.</p>
        </div>
        <div style={{ display: 'inline-flex', gap: '4px' }}>
          {pills.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', font: 'var(--text-nav-link)', background: period === p ? 'var(--color-surface-card)' : 'transparent', color: period === p ? 'var(--color-ink)' : 'var(--color-muted)' }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: 'var(--color-surface-card)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{k.label}</div>
            <div style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', marginTop: '6px' }}>{k.value}</div>
          </div>
        ))}
      </div>
      <Card padding="0">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}>
          <h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>By team member</h3>
        </div>
        <Table
          head={[{ label: 'Member' }, { label: 'Role' }, { label: 'Leads' }, { label: 'Pipeline' }, { label: 'Won' }, { label: 'Win rate' }, { label: 'Meetings' }]}
          rows={agentsData.map(a => [
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar name={a.name} size={30} /><span style={{ font: 'var(--text-title-sm)' }}>{a.name}</span></div>,
            <span style={{ color: 'var(--color-muted)' }}>{a.role}</span>,
            a.leads, a.pipeline,
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{a.won}</span>,
            a.winRate, a.meetings,
          ])}
        />
      </Card>
    </div>
  );
}

function Team() {
  const [members] = useState([
    { name: 'Jordan Lee', email: 'jordan@acme.com', role: 'owner' },
    { name: 'Sara Kade', email: 'sara@acme.com', role: 'admin' },
    { name: 'Devon Rao', email: 'devon@acme.com', role: 'sales_agent' },
  ]);
  const [invites, setInvites] = useState([
    { email: 'alex@acme.com', role: 'sales_agent', expires: 'Jul 14, 2026' },
  ]);
  const [invEmail, setInvEmail] = useState('');
  const [invRole, setInvRole] = useState('sales_agent');

  const addInvite = () => {
    if (!invEmail.trim()) return;
    setInvites(inv => [{ email: invEmail, role: invRole, expires: 'Jul 30, 2026' }, ...inv]);
    setInvEmail('');
  };

  const roleTone = r => r === 'owner' ? 'pink' : r === 'admin' ? 'lavender' : r === 'sales_agent' ? 'teal' : 'cream';

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Team</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Members, roles, and pending invites for this workspace.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Members</h3></div>
          <Table
            head={[{ label: 'Name' }, { label: 'Email' }, { label: 'Role' }]}
            rows={members.map(m => [
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar name={m.name} size={30} /><span style={{ font: 'var(--text-title-sm)' }}>{m.name}</span></div>,
              <span style={{ color: 'var(--color-muted)' }}>{m.email}</span>,
              <Badge tone={roleTone(m.role)}>{m.role}</Badge>,
            ])}
          />
        </Card>

        <Card variant="cream" padding="20px">
          <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 12px' }}>Invite someone</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <Input placeholder="teammate@company.com" value={invEmail} onChange={e => setInvEmail(e.target.value)} />
            </div>
            <select value={invRole} onChange={e => setInvRole(e.target.value)}
              style={{ height: '44px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1.5px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }}>
              <option>admin</option><option>sales_agent</option><option>marketer</option><option>viewer</option>
            </select>
            <Button onClick={addInvite} style={{ height: '44px' }}>Create invite</Button>
          </div>
        </Card>

        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Pending invites</h3></div>
          <Table
            head={[{ label: 'Email' }, { label: 'Role' }, { label: 'Status' }, { label: 'Expires' }]}
            rows={invites.map(i => [
              i.email,
              <span style={{ color: 'var(--color-muted)' }}>{i.role}</span>,
              <Badge tone="warning">pending</Badge>,
              <span style={{ color: 'var(--color-muted)' }}>{i.expires}</span>,
            ])}
          />
        </Card>
      </div>
    </div>
  );
}

function Integrations() {
  const [ints, setInts] = useState([
    { name: 'WhatsApp', glyph: 'W' },
    { name: 'Email', glyph: '@' },
  ]);
  const [provider, setProvider] = useState('WhatsApp');
  const [secret, setSecret] = useState('');

  const addInt = () => {
    if (ints.some(g => g.name === provider)) return;
    setInts(gs => [...gs, { name: provider, glyph: provider[0] }]);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Integrations</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Connect channels and providers. Every webhook is HMAC-verified.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Connected</h3></div>
          {ints.map(g => (
            <div key={g.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-title-sm)' }}>{g.glyph}</span>
                <span style={{ font: 'var(--text-title-sm)' }}>{g.name}</span>
              </div>
              <Badge tone="success">connected</Badge>
            </div>
          ))}
        </Card>

        <Card variant="cream" padding="22px">
          <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 4px' }}>Connect a provider</h3>
          <p style={{ font: 'var(--text-body-sm)', color: 'var(--color-muted)', margin: '0 0 16px' }}>Add a channel to start routing leads to your agents.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <select value={provider} onChange={e => setProvider(e.target.value)}
              style={{ height: '44px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1.5px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }}>
              <option>WhatsApp</option><option>Email</option><option>Meta lead ads</option>
            </select>
            <Input placeholder="Webhook secret" value={secret} onChange={e => setSecret(e.target.value)} />
            <Button onClick={addInt} style={{ width: '100%' }}>Connect</Button>
          </div>
          <p style={{ font: 'var(--text-caption)', color: 'var(--color-muted-soft)', margin: '16px 0 0' }}>Webhook URL: /v1/webhooks/acme/&lt;provider&gt;</p>
        </Card>
      </div>
    </div>
  );
}

function Billing() {
  const usage = [
    { label: 'Contacts', value: '3,482' }, { label: 'Messages', value: '11,920' },
    { label: 'AI responses', value: '8,640' }, { label: 'Seats', value: '3' },
  ];
  const invoice = [
    { item: 'Growth plan (base)', qty: '1', amount: '$499.00' },
    { item: 'Seats', qty: '3', amount: '$147.00' },
    { item: 'AI responses (overage)', qty: '1,640', amount: '$82.00' },
  ];
  const marketplace = [
    { name: 'Claygent research', kind: 'AI agent', tier: 'Add-on', tone: 'lavender' },
    { name: 'LinkedIn enrichment', kind: 'Data provider', tier: 'Included', tone: 'success' },
    { name: 'Dialer Pro', kind: 'Integration', tier: 'Add-on', tone: 'ochre' },
  ];
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Billing</h1>
        <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Usage this period, your invoice, and add-ons from the marketplace.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
        {usage.map(u => (
          <div key={u.label} style={{ background: 'var(--color-surface-card)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{u.label}</div>
            <div style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', marginTop: '6px' }}>{u.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Invoice</h3>
            <Badge tone="lavender">Growth plan</Badge>
          </div>
          <Table
            head={[{ label: 'Item' }, { label: 'Qty' }, { label: 'Amount', right: true }]}
            rows={[
              ...invoice.map(ln => [ln.item, <span style={{ color: 'var(--color-muted)' }}>{ln.qty}</span>, ln.amount]),
              [<strong>Total</strong>, '', <span style={{ font: 'var(--text-title-sm)' }}>$728.00</span>],
            ]}
          />
        </Card>
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Marketplace</h3></div>
          {marketplace.map(mk => (
            <div key={mk.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}>
              <div>
                <div style={{ font: 'var(--text-title-sm)' }}>{mk.name}</div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{mk.kind}</div>
              </div>
              <Badge tone={mk.tone}>{mk.tier}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Harness() {
  const [agent, setAgent] = useState('Chatbot');
  const [evalResult, setEvalResult] = useState('');
  const [bm, setBm] = useState({ Helpfulness: 88, Groundedness: 82, Safety: 95, Resolution: 71 });
  const [ops, setOps] = useState({ 'Error rate': 5, 'Handoff rate': 50 });
  const [levers, setLevers] = useState([
    { key: 'prompt', label: 'Prompt', on: true, weight: 50 },
    { key: 'memory', label: 'Memory', on: true, weight: 40 },
    { key: 'tools', label: 'Tools', on: true, weight: 60 },
    { key: 'skills', label: 'Skills', on: false, weight: 30 },
    { key: 'loop', label: 'Loop', on: true, weight: 50 },
    { key: 'guardrails', label: 'Guardrails', on: true, weight: 70 },
    { key: 'model', label: 'Model', on: false, weight: 20 },
  ]);
  const [evalCases, setEvalCases] = useState(['Lead asks about SOC 2 compliance', 'Pricing request for 250 seats', 'Angry customer wants a refund']);
  const [newCase, setNewCase] = useState('');
  const [versionActive, setVersionActive] = useState(4);
  const versions = [
    { version: 4, eval: 'pass', evalTone: 'success' },
    { version: 3, eval: 'pass', evalTone: 'success' },
    { version: 2, eval: 'fail', evalTone: 'error' },
  ];
  const observe = [
    { label: 'Runs', value: '1,284' }, { label: 'Input tokens', value: '412k' }, { label: 'Output tokens', value: '118k' },
    { label: 'Avg latency', value: '1.8s' }, { label: 'Avg steps', value: '3.2' }, { label: 'Errors', value: '6', warn: true },
  ];
  const traces = [
    { when: '2m ago', status: 'ok', tone: 'success', steps: 3, latency: '1.6s' },
    { when: '14m ago', status: 'ok', tone: 'success', steps: 4, latency: '2.1s' },
    { when: '1h ago', status: 'handoff', tone: 'lavender', steps: 5, latency: '3.4s' },
    { when: '3h ago', status: 'error', tone: 'error', steps: 2, latency: '0.9s' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ font: 'var(--text-display-sm)', letterSpacing: 'var(--tracking-display-sm)', margin: 0 }}>Agent harness</h1>
          <p style={{ font: 'var(--text-body-md)', color: 'var(--color-muted)', margin: '6px 0 0' }}>Tune the prompt, guardrails, and benchmarks — then eval before you ship.</p>
        </div>
        <div style={{ display: 'inline-flex', gap: '4px' }}>
          {['Chatbot', 'Voicebot'].map(a => (
            <button key={a} onClick={() => { setAgent(a); setEvalResult(''); }}
              style={{ padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', font: 'var(--text-nav-link)', background: agent === a ? 'var(--color-surface-card)' : 'transparent', color: agent === a ? 'var(--color-ink)' : 'var(--color-muted)' }}>{a}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <Card padding="22px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 14px' }}>Configuration</h3>
            <label style={{ font: 'var(--text-caption)', color: 'var(--color-body-strong)', fontWeight: 600 }}>System prompt</label>
            <textarea rows={4} defaultValue="You are a helpful, on-brand sales assistant. Answer leads accurately, cite the security overview when relevant, and hand off to a human for pricing above 100 seats."
              style={{ width: '100%', marginTop: '6px', padding: '12px 14px', font: 'var(--text-body-sm)', border: '1.5px solid var(--color-hairline)', borderRadius: 'var(--radius-md)', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: 'var(--color-canvas)' }} />
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
              {[['Model', <select style={{ height: '36px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }}><option>haiku</option><option selected>sonnet</option><option>opus</option></select>],
                ['Temperature', <input type="number" step="0.1" min="0" max="1" defaultValue="0.3" style={{ width: '80px', height: '36px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }} />],
                ['Max steps', <input type="number" min="1" max="50" defaultValue="8" style={{ width: '80px', height: '36px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }} />],
                ['Memory top-k', <input type="number" min="0" max="50" defaultValue="5" style={{ width: '80px', height: '36px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }} />],
              ].map(([label, ctrl]) => (
                <div key={label}><label style={{ font: 'var(--text-caption)', fontWeight: 600, color: 'var(--color-body-strong)', display: 'block', marginBottom: '6px' }}>{label}</label>{ctrl}</div>
              ))}
            </div>
            <div style={{ marginTop: '18px' }}>
              <label style={{ font: 'var(--text-caption)', fontWeight: 600, color: 'var(--color-body-strong)', display: 'block', marginBottom: '8px' }}>Guardrails</label>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                {['Injection scan', 'Self-correction', 'Auto-approve actions'].map(g => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '8px', font: 'var(--text-body-sm)' }}><input type="checkbox" defaultChecked={g !== 'Auto-approve actions'} /> {g}</label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={{ font: 'var(--text-caption)', fontWeight: 600, color: 'var(--color-body-strong)', display: 'block', marginBottom: '8px' }}>Memory</label>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                {[['Procedural', true], ['Semantic', true], ['Episodic', false]].map(([m, def]) => (
                  <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', font: 'var(--text-body-sm)' }}><input type="checkbox" defaultChecked={def} /> {m}</label>
                ))}
              </div>
            </div>
          </Card>

          <Card padding="22px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 14px' }}>Quality benchmark targets</h3>
            {Object.entries(bm).map(([k, val]) => (
              <div key={k} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-body-sm)', marginBottom: '8px' }}><span>{k}</span><span style={{ color: 'var(--color-muted)' }}>{val}%</span></div>
                <input type="range" min="0" max="100" value={val} onChange={e => setBm(b => ({ ...b, [k]: +e.target.value }))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
              </div>
            ))}
          </Card>

          <Card padding="22px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 4px' }}>Self-improvement</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {levers.map(lv => (
                <div key={lv.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '7px 0', borderBottom: '1px solid var(--color-hairline-soft)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, font: 'var(--text-body-sm)' }}>
                    <input type="checkbox" checked={lv.on} onChange={() => setLevers(ls => ls.map(x => x.key === lv.key ? { ...x, on: !x.on } : x))} /> {lv.label}
                  </label>
                  <input type="range" min="0" max="100" value={lv.weight} disabled={!lv.on}
                    onChange={e => setLevers(ls => ls.map(x => x.key === lv.key ? { ...x, weight: +e.target.value } : x))}
                    style={{ width: '130px', accentColor: 'var(--color-primary)' }} />
                  <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted)', width: '36px', textAlign: 'right' }}>{lv.on ? lv.weight + '%' : 'off'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="cream" padding="20px">
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button onClick={() => setEvalResult(`✓ Eval passed — helpfulness ${bm.Helpfulness}%, groundedness ${bm.Groundedness}%, safety ${bm.Safety}%, resolution ${bm.Resolution}%. Gate: PASS.`)}>Run eval</Button>
              <Button variant="secondary" onClick={() => setEvalResult(`Quality: 3/4 targets met (resolution ${bm.Resolution}% under target). Operational: error ${ops['Error rate']}%, handoff ${ops['Handoff rate']}% — within budget.`)}>Benchmark status</Button>
              <Button variant="secondary" onClick={() => setEvalResult('Self-improve: ran 4 iterations, +6% resolution. Proposed a draft version — review before promoting.')}>Self-improve</Button>
              <Button variant="secondary" onClick={() => setEvalResult('Proposed v5 — eval queued. Promote from the Versions panel once it passes.')}>Propose new version</Button>
            </div>
            {evalResult && <div style={{ marginTop: '14px', padding: '12px 14px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-md)', font: 'var(--text-body-sm)' }}>{evalResult}</div>}
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card padding="22px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 4px' }}>Observe</h3>
            <p style={{ font: 'var(--text-caption)', color: 'var(--color-muted)', margin: '0 0 16px' }}>Last 14 days</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {observe.map(o => (
                <div key={o.label} style={{ background: 'var(--color-surface-card)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--color-muted)' }}>{o.label}</div>
                  <div style={{ font: 'var(--text-title-md)', color: o.warn ? 'var(--color-warning)' : 'var(--color-ink)', marginTop: '2px' }}>{o.value}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="0">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Versions</h3></div>
            <Table
              head={[{ label: 'Version' }, { label: 'Status' }, { label: 'Eval' }, { label: '' }]}
              rows={versions.map(ver => [
                `v${ver.version}`,
                <Badge tone={ver.version === versionActive ? 'success' : 'cream'}>{ver.version === versionActive ? 'active' : 'archived'}</Badge>,
                <Badge tone={ver.evalTone}>{ver.eval}</Badge>,
                ver.version !== versionActive ? <Button variant="secondary" size="sm" onClick={() => { setVersionActive(ver.version); setEvalResult(`Promoted v${ver.version} to active.`); }}>Promote</Button> : null,
              ])}
            />
          </Card>

          <Card padding="22px">
            <h3 style={{ font: 'var(--text-title-sm)', margin: '0 0 12px' }}>Eval cases</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input type="text" placeholder="New case input" value={newCase} onChange={e => setNewCase(e.target.value)}
                style={{ flex: 1, height: '40px', padding: '0 10px', font: 'var(--text-body-sm)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-sm)', background: 'var(--color-canvas)', outline: 'none' }} />
              <Button variant="secondary" size="sm" onClick={() => { if (newCase.trim()) { setEvalCases(cs => [...cs, newCase]); setNewCase(''); } }}>Add</Button>
            </div>
            {evalCases.map((ec, i) => (
              <div key={i} style={{ font: 'var(--text-body-sm)', color: 'var(--color-body-strong)', padding: '8px 0', borderBottom: '1px solid var(--color-hairline-soft)' }}>{ec}</div>
            ))}
          </Card>

          <Card padding="0">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline-soft)' }}><h3 style={{ font: 'var(--text-title-sm)', margin: 0 }}>Recent traces</h3></div>
            <Table
              head={[{ label: 'When' }, { label: 'Status' }, { label: 'Steps' }, { label: 'Latency' }]}
              rows={traces.map(tr => [<span style={{ color: 'var(--color-muted)' }}>{tr.when}</span>, <Badge tone={tr.tone}>{tr.status}</Badge>, tr.steps, tr.latency])}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────
const TABS = ['Inbox', 'Contacts', 'Cohorts', 'Pipeline', 'Analytics', 'Team', 'Integrations', 'Billing', 'Harness'];
const TAB_VIEWS = { Inbox, Contacts, Cohorts, Pipeline, Analytics, Team, Integrations, Billing, Harness };

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('Inbox');
  const View = TAB_VIEWS[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, height: '60px', background: 'rgba(255,250,240,.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo to="/" />
          <span style={{ font: 'var(--text-caption)', color: 'var(--color-muted)', background: 'var(--color-surface-card)', padding: '4px 12px', borderRadius: 'var(--radius-pill)' }}>Acme Inc · workspace</span>
          <span style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar name="Jordan Lee" size={32} />
            <span style={{ font: 'var(--text-nav-link)' }}>Jordan Lee</span>
          </div>
          <Button variant="secondary" size="sm" to="/login">Log out</Button>
        </div>
      </header>

      {/* Tab nav */}
      <div style={{ borderBottom: '1px solid var(--color-hairline-soft)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '10px 28px' }}>
          <div style={{ display: 'inline-flex', gap: '4px', flexWrap: 'wrap' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', font: 'var(--text-nav-link)', transition: 'background .15s, color .15s', background: activeTab === tab ? 'var(--color-surface-card)' : 'transparent', color: activeTab === tab ? 'var(--color-ink)' : 'var(--color-muted)' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px' }}>
        <View />
      </main>
    </div>
  );
}
