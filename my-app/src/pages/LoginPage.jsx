import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { login } from '../api'

const font = 'Montserrat, sans-serif'

export default function LoginPage() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await login({ email, password })
      const token = result?.token || result?.accessToken || result?.jwt || result?.data?.token || result?.data?.accessToken || result?.data?.jwt
      const userId = result?.userId || result?.id || result?.user?.id || result?.data?.userId || result?.data?.id || email.trim().toLowerCase()
      const userName = result?.name || result?.user?.name || result?.email || email

      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('currentUser', JSON.stringify({
          id: userId,
          email: email.trim().toLowerCase(),
          name: userName,
        }))
        navigate('/contractor')
      } else if (result?.message) {
        setError(result.message)
      } else {
        setError('Login failed')
      }
    } catch (err) {
      setError(err?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

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
          <button onClick={() => navigate('/register')} style={{ background: 'none', border: '1px solid var(--color-base-300)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)' }}>Register</button>
        </div>
      </header>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--color-base-100)', borderRadius: '16px', border: '1px solid var(--color-base-300)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '36px 32px' }}>

          {/* Heading */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: font, fontSize: '22px', fontWeight: 700, color: 'var(--color-base-content)', margin: '0 0 6px' }}>Welcome back</h1>
            <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.5, margin: 0 }}>Sign in to your VoQuota account</p>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <label style={{ fontFamily: font, fontSize: '11px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Password</label>
                <a href="#" style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.4, textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Error */}
          {error && <div style={{ marginTop: 12, color: 'var(--color-accent)', fontFamily: font, fontSize: 13 }}>{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: '24px', padding: '11px', borderRadius: '8px', border: 'none', backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontSize: '14px', fontWeight: 600, cursor: loading ? 'default' : 'pointer' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-base-300)' }} />
            <span style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.35 }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-base-300)' }} />
          </div>

          {/* Register link */}
          <p style={{ fontFamily: font, fontSize: '13px', color: 'var(--color-base-content)', opacity: 0.5, textAlign: 'center', margin: 0 }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} style={{ color: 'var(--color-base-content)', opacity: 1, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Register</span>
          </p>
        </form>
      </div>
    </div>
  )
}
