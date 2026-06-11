import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const font = 'Montserrat, sans-serif'

export default function BusinessProfilePage() {
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)

  useEffect(() => {
    setBusiness(JSON.parse(localStorage.getItem('voquota:business') || '{}'))
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 560, backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: 18, padding: 24, boxShadow: '0 18px 38px rgba(0,0,0,0.12)' }}>
        <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.45, marginBottom: 6 }}>Business profile</p>
        <h1 style={{ fontFamily: font, fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Your profile</h1>
        <p style={{ fontFamily: font, fontSize: 13, color: 'var(--color-base-content)', opacity: 0.65, lineHeight: 1.5, marginBottom: 16 }}>This is where your business details will appear once you save them during setup.</p>

        <div style={{ border: '1px solid var(--color-base-300)', borderRadius: 14, padding: 14, backgroundColor: 'var(--color-base-200)', display: 'grid', gap: 8 }}>
          <Row label="Business name" value={business?.businessName || '—'} />
          <Row label="Business email" value={business?.businessEmail || '—'} />
          <Row label="Phone" value={business?.businessPhone || '—'} />
          <Row label="Accent colour" value={business?.accentColour || '—'} />
        </div>

        <button onClick={() => navigate('/business-setup')} style={{ width: '100%', marginTop: 16, padding: '11px 14px', borderRadius: 10, border: '1px solid var(--color-base-300)', background: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }}>Edit business setup</button>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontFamily: font, fontSize: 13 }}><span style={{ opacity: 0.6 }}>{label}</span><strong style={{ textAlign: 'right' }}>{value}</strong></div>
}
