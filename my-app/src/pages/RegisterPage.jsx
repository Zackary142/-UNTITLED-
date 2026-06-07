import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { register } from '../api'

const font = 'Montserrat, sans-serif'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '52px', borderBottom: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-100)' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src="/vq_logo.png" alt="VoQuota" className="vq-logo" style={{ height: '26px', width: '26px', objectFit: 'contain' }} />
          <span style={{ fontFamily: font, fontWeight: 600, fontSize: '15px', color: 'var(--color-base-content)' }}>VoQuota</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-content)', opacity: 0.6, display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '50%' }}>
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
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: '1px solid var(--color-base-300)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)' }}>Sign in</button>
        </div>
      </header>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--color-base-100)', borderRadius: '16px', border: '1px solid var(--color-base-300)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '36px 32px' }}>

          {/* Heading */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: font, fontSize: '22px', fontWeight: 700, color: 'var(--color-base-content)', margin: '0 0 6px' }}>Create an account</h1>
            <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.5, margin: 0 }}>Get started with VoQuota for free</p>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>First Name</label>
                <input type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Jane" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Surname</label>
                <input type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Smith" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Phone No. <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, opacity: 0.4, textTransform: 'none', letterSpacing: 0 }}>Optional</span></label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+44 7700 000000" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Terms */}
          <p style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.4, margin: '16px 0 0', lineHeight: 1.6 }}>
            By registering you agree to our{' '}
            <a href="#" style={{ color: 'var(--color-base-content)', opacity: 1, textDecoration: 'underline' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--color-base-content)', opacity: 1, textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>

          {error && <div style={{ marginTop: 12, color: 'var(--color-accent)', fontFamily: font, fontSize: 13 }}>{error}</div>}

          {/* Submit */}
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              setError(null)
              if (!form.email || !form.password || !form.firstName || !form.lastName) {
                setError('Please fill in all required fields.')
                return
              }
              if (form.password !== confirmPassword) {
                setError('Passwords do not match.')
                return
              }
              setLoading(true)
              try {
                const result = await register({
                  firstName: form.firstName,
                  lastName: form.lastName,
                  email: form.email,
                  password: form.password,
                  phone: form.phone || null,
                })
                console.log('register result:', result)
                console.log('token in storage:', localStorage.getItem('token'))
                const token = result?.token || result?.accessToken || result?.jwt || result?.data?.token || result?.data?.accessToken || result?.data?.jwt
                const userId = result?.userId || result?.id || result?.user?.id || result?.data?.userId || result?.data?.id || form.email.trim().toLowerCase()
                const userName = result?.name || result?.user?.name || `${form.firstName} ${form.lastName}`.trim() || form.email

                if (token) localStorage.setItem('token', token)
                localStorage.setItem('currentUser', JSON.stringify({ id: userId, email: form.email.trim().toLowerCase(), name: userName }))
                navigate('/welcome')
              } catch (err) {
  // Backend returns array of Identity errors
                if (Array.isArray(err?.errors)) {
                  setError(err.errors.map(e => e.description).join(' '))
                } else {
                  setError(err?.message || 'Registration failed.')
                }
            }
            }}
            
            style={{ width: '100%', marginTop: '20px', padding: '11px', borderRadius: '8px', border: 'none', backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontSize: '14px', fontWeight: 600, cursor: loading ? 'default' : 'pointer' }}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-base-300)' }} />
            <span style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.35 }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-base-300)' }} />
          </div>

          {/* Login link */}
          <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.5, textAlign: 'center', margin: 0 }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: 'var(--color-base-content)', opacity: 1, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  )
}
