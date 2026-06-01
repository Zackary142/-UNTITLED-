import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)' }}>

      {/* Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '56px',
        borderBottom: '1px solid var(--color-base-300)',
        backgroundColor: 'var(--color-base-100)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            backgroundColor: 'var(--color-base-content)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9.5 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H4.5L7 1Z" fill="var(--color-base-100)"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '15px' }}>VoQuota</span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Product', 'User Stories', 'Pricing'].map(link => (
            <a key={link} href="#" style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '14px',
              color: 'var(--color-base-content)', textDecoration: 'none', opacity: 0.8,
            }}>{link}</a>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-base-content)', display: 'flex', alignItems: 'center',
            padding: '4px', borderRadius: '50%', opacity: 0.7,
          }}>
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

          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: '1px solid var(--color-base-300)',
            borderRadius: '8px', padding: '6px 16px', cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif', fontSize: '14px',
            color: 'var(--color-base-content)',
          }}>Sign in</button>

          <button onClick={() => navigate('/register')} style={{
            backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)',
            border: 'none', borderRadius: '8px', padding: '7px 16px', cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600,
          }}>Register</button>
        </div>
      </header>

      {/* Hero */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 40px', textAlign: 'center',
        backgroundColor: 'var(--color-base-200)',
      }}>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-2px',
          color: 'var(--color-base-content)', margin: '0 0 16px',
          lineHeight: 1.1,
        }}>
          VoQuota
        </h1>

        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
          fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--color-base-content)', opacity: 0.5,
          margin: '0 0 40px',
        }}>
          Quote, Invoice, That's it.
        </p>

        {/* Email signup */}
        <div style={{ display: 'flex', gap: '0', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-base-300)' }}>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              padding: '10px 16px', fontSize: '14px', width: '260px',
              border: 'none', outline: 'none',
              backgroundColor: 'var(--color-base-100)',
              color: 'var(--color-base-content)',
              fontFamily: 'Montserrat, sans-serif',
            }}
          />
          <button style={{
            padding: '10px 20px', border: 'none', cursor: 'pointer',
            backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)',
            fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600,
          }}>
            Submit
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-base-100)',
        borderTop: '1px solid var(--color-base-300)',
        padding: '48px 40px',
        display: 'grid',
        gridTemplateColumns: '180px repeat(3, 1fr)',
        gap: '32px',
      }}>
        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              backgroundColor: 'var(--color-base-content)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L9.5 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H4.5L7 1Z" fill="var(--color-base-100)"/>
              </svg>
            </div>
          </div>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              // X
              <svg key="x" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
              // Instagram
              <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
              // YouTube
              <svg key="yt" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.8 9.2.8 11.5v2.1C.8 16 1 18 1 18s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.4 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.2-2.2.2-4.4v-2C23.2 9.2 23 7 23 7zm-13.5 7.5v-6l5.5 3-5.5 3z"/></svg>,
              // LinkedIn
              <svg key="li" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
            ].map((icon, i) => (
              <a key={i} href="#" style={{ color: 'var(--color-base-content)', opacity: 0.6 }}>{icon}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          {
            title: 'Use cases',
            links: ['Contractor quoting', 'Invoice management', 'Customer portal', 'Payment tracking', 'Job management', 'Team collaboration'],
          },
          {
            title: 'Explore',
            links: ['Features', 'Pricing', 'How it works', 'Integrations', 'Roadmap'],
          },
          {
            title: 'Resources',
            links: ['Blog', 'Help centre', 'Contact us', 'Privacy policy', 'Terms of service', 'Status'],
          },
        ].map(col => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '13px',
              color: 'var(--color-base-content)', marginBottom: '4px',
            }}>{col.title}</p>
            {col.links.map(link => (
              <a key={link} href="#" style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '13px',
                color: 'var(--color-base-content)', opacity: 0.6,
                textDecoration: 'none',
              }}>{link}</a>
            ))}
          </div>
        ))}
      </footer>

    </div>
  )
}
