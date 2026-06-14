import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const font = 'Montserrat, sans-serif'

const features = [
  {
    title: 'Quotes in minutes',
    desc: 'Build professional quotes with labour, materials and extras — all calculated for you.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6h8M6 9h8M6 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'One-click invoicing',
    desc: 'Turn an accepted quote into an invoice instantly, with your branding applied automatically.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6h8M6 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M12 13l1 1 1.5-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: 'Customer portal',
    desc: 'Customers accept or decline quotes from a clean, branded page — no account required.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 17c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'Track everything',
    desc: 'A kanban-style pipeline shows quotes, invoices and payments at a glance.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="5" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="8.5" y="3" width="5" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="15" y="3" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    title: 'Get paid faster',
    desc: 'Send polished, on-brand invoices that make it easy for customers to pay on time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v8M7.5 8.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.3-2.5 1.5-2.5.7-2.5 1.7 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'Your brand, everywhere',
    desc: 'Logo, colours and business details flow through to every quote, invoice and customer page.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5.5L18 8.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
    ),
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)' }}>

      {/* ── Navbar ── */}
      <header className="landing-header">
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src="/vq_logo.png" alt="VoQuota" className="vq-logo" style={{ height: '26px', width: '26px', objectFit: 'contain' }} />
          <span style={{ fontFamily: font, fontWeight: 600, fontSize: '15px' }}>VoQuota</span>
        </div>

        <nav className="landing-nav">
          {['Features', 'Pricing', 'FAQs'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: font, fontSize: '14px', color: 'var(--color-base-content)', textDecoration: 'none', opacity: 0.65 }}>{link}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-content)', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '50%', opacity: 0.6 }}>
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 15.5h4M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 15.5h4M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          {/* <button onClick={() => navigate('/login')} style={{ background: 'none', border: '1px solid var(--color-base-300)', borderRadius: '8px', padding: '7px 16px', cursor: 'pointer', fontFamily: font, fontSize: '14px', color: 'var(--color-base-content)' }}>Log in</button>
          <button onClick={() => navigate('/register')} style={{ backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontFamily: font, fontSize: '14px', fontWeight: 600 }}>Sign up</button> */}
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '90px 24px 70px', textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', marginBottom: '24px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
          <span style={{ fontFamily: font, fontSize: '12px', color: 'var(--color-base-content)', opacity: 0.6 }}>Built for contractors</span>
        </div>

        <h1 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 4rem)', letterSpacing: '-2px', lineHeight: 1.1, margin: '0 0 18px' }}>
          Quote, invoice, paid.<br />
          <span style={{ color: 'var(--color-accent)' }}>That's it.</span>
        </h1>

        <p style={{ fontFamily: font, fontSize: '16px', color: 'var(--color-base-content)', opacity: 0.6, lineHeight: 1.6, margin: '0 auto 32px', maxWidth: '520px' }}>
          VoQuota helps contractors create professional quotes, convert them to invoices, and track every job from one simple dashboard.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* <button onClick={() => navigate('/register')} style={{ backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', cursor: 'pointer', fontFamily: font, fontSize: '15px', fontWeight: 600 }}>
            Get started for free
          </button>
          <button onClick={() => navigate('/login')} style={{ backgroundColor: 'transparent', color: 'var(--color-base-content)', border: '1px solid var(--color-base-300)', borderRadius: '10px', padding: '12px 28px', cursor: 'pointer', fontFamily: font, fontSize: '15px', fontWeight: 600 }}>
            Log in
          </button> */}
        </div>
      </section>

      {/* ── Product preview placeholder ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '960px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ borderRadius: '16px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', padding: '4px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
          <div style={{ borderRadius: '12px', backgroundColor: 'var(--color-base-100)', padding: '40px 24px', textAlign: 'center', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.35 }}>Product preview</p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '60px 24px 90px', backgroundColor: 'var(--color-base-200)', borderTop: '1px solid var(--color-base-300)', borderBottom: '1px solid var(--color-base-300)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '10px' }}>Features</p>
            <h2 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', letterSpacing: '-1px', margin: 0 }}>Everything you need, nothing you don't</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map(f => (
              <div key={f.title} style={{ backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: '14px', padding: '24px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-base-200)', border: '1px solid var(--color-base-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '16px' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: font, fontWeight: 600, fontSize: '16px', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.55, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ padding: '90px 24px', maxWidth: '720px', margin: '0 auto', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        <p style={{ fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '10px' }}>Pricing</p>
        <h2 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', letterSpacing: '-1px', margin: '0 0 16px' }}>Simple pricing, no surprises</h2>
        <p style={{ fontFamily: font, fontSize: '14px', color: 'var(--color-base-content)', opacity: 0.55, marginBottom: '40px' }}>
          Free while we're in early access. Paid plans coming soon.
        </p>

        <div style={{ display: 'inline-block', textAlign: 'left', backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: '16px', padding: '32px 36px', minWidth: '260px' }}>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Early access</p>
          <p style={{ fontFamily: font, fontSize: '40px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-1px' }}>£0</p>
          <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.5, margin: '0 0 20px' }}>per month, forever (for now)</p>
          {['Unlimited quotes & invoices', 'Customer accept/decline portal', 'Your branding everywhere'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--color-accent)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.75 }}>{item}</span>
            </div>
          ))}
          {/* <button onClick={() => navigate('/register')} style={{ width: '100%', marginTop: '16px', backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', cursor: 'pointer', fontFamily: font, fontSize: '14px', fontWeight: 600 }}>
            Get started
          </button> */}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" style={{ padding: '0 24px 90px', maxWidth: '680px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontFamily: font, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '10px' }}>FAQs</p>
          <h2 style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', letterSpacing: '-1px', margin: 0 }}>Frequently asked questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: 'Who is VoQuota for?', a: 'Contractors and tradespeople who need a fast way to send quotes, turn them into invoices, and keep track of payments without spreadsheets.' },
            { q: 'Do my customers need an account?', a: 'No. Customers receive a link to a branded page where they can review and accept or decline a quote — no sign up required.' },
            { q: 'Can I add my own branding?', a: 'Yes. Your logo, business details and accent colour appear on every quote, invoice and customer-facing page.' },
            { q: 'Is there a free plan?', a: 'VoQuota is currently free during early access. We\'ll introduce paid plans later, with plenty of notice.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ backgroundColor: 'var(--color-base-200)', border: '1px solid var(--color-base-300)', borderRadius: '12px', padding: '18px 20px' }}>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, margin: '0 0 6px' }}>{q}</p>
              <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.55, margin: 0, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--color-base-300)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '12px', color: 'var(--color-base-content)', opacity: 0.4, margin: 0 }}>
          © {new Date().getFullYear()} VoQuota. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
