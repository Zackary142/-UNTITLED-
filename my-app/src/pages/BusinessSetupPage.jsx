import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api'

const font = 'Montserrat, sans-serif'

export default function BusinessSetupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ businessName: '', businessEmail: '', businessPhone: '', accentColour: '#111827' })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('voquota:business') || '{}')
    setForm(prev => ({ ...prev, ...saved }))
  }, [])

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

 async function handleContinue() {
  localStorage.setItem('voquota:business', JSON.stringify(form))

  const token = localStorage.getItem('token')
  if (token) {
    try {
      // Convert hex accent colour to RGB
      const hex = form.accentColour.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)

      const formData = new FormData()
      formData.append('BusinessName', form.businessName || '')
      formData.append('Email', form.businessEmail || '')
      formData.append('PhoneNumber', form.businessPhone || '')
      formData.append('AccentR', r)
      formData.append('AccentG', g)
      formData.append('AccentB', b)
      // Logo file upload — wire up later when file input is connected
      // formData.append('LogoFile', logoFile)

      const res = await fetch('http://localhost:5139/api/BusinessProfile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {
        const text = await res.text()
        console.error('Business profile save failed:', text)
      }
    } catch (err) {
      console.error('Error saving business profile:', err)
    }
  }

  navigate('/first-quote')
}

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 520, backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: 18, padding: 26, boxShadow: '0 18px 38px rgba(0,0,0,0.12)' }}>
        <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.45, marginBottom: 6 }}>Business Setup</p>
        <h1 style={{ fontFamily: font, fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Set up your business profile</h1>
        <p style={{ fontFamily: font, fontSize: 13, color: 'var(--color-base-content)', opacity: 0.6, lineHeight: 1.5, marginBottom: 18 }}>Add your brand details and continue to your first quote.</p>

        <div style={{ display: 'grid', gap: 12 }}>
          <label style={fieldLabel}>Business Name</label>
          <input style={inputStyle} value={form.businessName} onChange={e => updateField('businessName', e.target.value)} placeholder="Acme Build Co." />

          <label style={fieldLabel}>Business Email</label>
          <input style={inputStyle} type="email" value={form.businessEmail} onChange={e => updateField('businessEmail', e.target.value)} placeholder="hello@acme.co" />

          <label style={fieldLabel}>Business Phone</label>
          <input style={inputStyle} type="tel" value={form.businessPhone} onChange={e => updateField('businessPhone', e.target.value)} placeholder="+44 7700 000000" />

          <label style={fieldLabel}>Logo</label>
          <label style={{ border: '1px dashed var(--color-base-300)', borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-base-200)', cursor: 'pointer' }}>
            <span style={{ fontFamily: font, fontSize: 13, opacity: 0.7 }}>Upload a logo</span>
            <span style={{ fontFamily: font, fontSize: 12, opacity: 0.75 }}>Browse Files</span>
            <input type="file" hidden />
          </label>

          <label style={fieldLabel}>Accent colour</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="color" value={form.accentColour} onChange={e => updateField('accentColour', e.target.value)} style={{ width: 42, height: 42, border: 'none', background: 'transparent', padding: 0 }} />
            <span style={{ fontFamily: font, fontSize: 13, opacity: 0.7 }}>{form.accentColour}</span>
          </div>
        </div>

        <button onClick={handleContinue} style={{ width: '100%', marginTop: 18, padding: '11px 14px', borderRadius: 10, border: 'none', backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }}>Continue</button>
        <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: 10, padding: '11px 14px', borderRadius: 10, border: '1px solid var(--color-base-300)', background: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }}>Back</button>
      </div>
    </div>
  )
}

const fieldLabel = { display: 'block', fontFamily: font, fontSize: 11, fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: 13, outline: 'none', boxSizing: 'border-box' }
