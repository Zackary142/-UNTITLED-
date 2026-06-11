import { useNavigate } from 'react-router-dom'

const font = 'Montserrat, sans-serif'

export default function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(145deg, var(--color-base-200), var(--color-base-100))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 460, backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: 18, boxShadow: '0 18px 38px rgba(0,0,0,0.12)', padding: 28 }}>
        <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--color-base-content)', opacity: 0.45, marginBottom: 10 }}>Welcome</p>
        <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 700, margin: '0 0 10px' }}>Welcome to VoQuota</h1>
        <p style={{ fontFamily: font, fontSize: 14, color: 'var(--color-base-content)', opacity: 0.65, lineHeight: 1.6 }}>Let’s set up your business profile and create your first quote in a few quick steps.</p>
        <button onClick={() => navigate('/business-setup')} style={{ width: '100%', marginTop: 18, padding: '11px 14px', borderRadius: 10, border: 'none', backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }}>Get Started</button>
      </div>
    </div>
  )
}
