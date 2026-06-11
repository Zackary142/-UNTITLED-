import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5139'
const font = 'Montserrat, sans-serif'

export default function CustomerQuoteView() {
  const { token } = useParams()
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [accepted, setAccepted] = useState(null) // null | 'accepted' | 'declined'
  const [showConfirm, setShowConfirm] = useState(null) // null | 'accept' | 'decline'
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    async function loadQuote() {
      try {
        const res = await fetch(`${API}/api/Quote/quotes/public/${token}`)
        if (!res.ok) throw new Error('Quote not found')
        const data = await res.json()
        setQuote(data)
        // If quote already has a status set, reflect it
        if (data.status === 1 || data.status === 'Accepted') setAccepted('accepted')
        if (data.status === 2 || data.status === 'Rejected') setAccepted('declined')
      } catch (err) {
        setError(err.message || 'Unable to load this quote.')
      } finally {
        setLoading(false)
      }
    }
    if (token) loadQuote()
  }, [token])

  async function confirmAction() {
    setActionLoading(true)
    try {
      const endpoint = showConfirm === 'accept'
        ? `${API}/api/Quote/quotes/public/${token}/accept`
        : `${API}/api/Quote/quotes/public/${token}/decline`

      const res = await fetch(endpoint, { method: 'POST' })

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        throw new Error(payload?.message || 'Unable to process your response.')
      }

      setAccepted(showConfirm === 'accept' ? 'accepted' : 'declined')
      setShowConfirm(null)
    } catch (err) {
      alert(err.message || 'Something went wrong.')
    } finally {
      setActionLoading(false)
    }
  }

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', fontFamily: font }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #E2E8F0', borderTopColor: '#2563EB', borderRadius: '50%', margin: '0 auto 14px', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Loading your quote…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  // ── Error ──
  if (error || !quote) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', fontFamily: font, padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#fef2f2', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>Quote not found</h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.6 }}>This link may have expired or is invalid. Please contact the business directly.</p>
        </div>
      </div>
    )
  }

  const total = (quote.items || []).reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0)
  const alreadyProcessed = accepted !== null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: font }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', backgroundColor: '#2563EB', opacity: 0.12 }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#2563EB', opacity: 0.08 }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '48px 24px 40px', maxWidth: '680px', margin: '0 auto' }}>
          {/* Business name / logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            {quote.businessLogo && (
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
                <img src={quote.businessLogo} alt={quote.businessName} style={{ width: '26px', height: '26px', objectFit: 'contain', filter: 'invert(1)' }} onError={e => { e.target.style.display = 'none' }} />
              </div>
            )}
            <div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.3px' }}>{quote.businessName || 'Your Contractor'}</p>
              {quote.businessEmail && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{quote.businessEmail}</p>}
            </div>
          </div>

          {/* Title */}
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
              Quote for {quote.customer?.firstName} {quote.customer?.lastName}
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.1 }}>Your Quote</h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              Ref: {quote.qReference} &nbsp;·&nbsp; {new Date(quote.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          {/* Total pill */}
          <div style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 20px' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Total</p>
              <p style={{ fontSize: '26px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-1px' }}>
                £{total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accepted === 'accepted' ? '#22c55e' : accepted === 'declined' ? '#ef4444' : '#fbbf24' }} />
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                {accepted === 'accepted' ? 'Accepted' : accepted === 'declined' ? 'Declined' : 'Awaiting response'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Accept / Decline */}
        {!alreadyProcessed && (
          <div style={{ padding: '24px 0 28px', borderBottom: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px', textAlign: 'center' }}>
              Review the quote below and let us know your decision
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => setShowConfirm('accept')}
                style={{ padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: font, fontSize: '14px', fontWeight: 700, backgroundColor: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Accept Quote
              </button>
              <button
                onClick={() => setShowConfirm('decline')}
                style={{ padding: '14px', borderRadius: '12px', border: '2px solid #E2E8F0', cursor: 'pointer', fontFamily: font, fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent', color: '#64748B' }}
              >
                Decline
              </button>
            </div>
          </div>
        )}

        {/* Response banner */}
        {alreadyProcessed && (
          <div style={{ margin: '20px 0', padding: '18px 20px', borderRadius: '14px', backgroundColor: accepted === 'accepted' ? '#f0fdf4' : '#fef2f2', border: `1px solid ${accepted === 'accepted' ? '#86efac' : '#fca5a5'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: accepted === 'accepted' ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {accepted === 'accepted'
                ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 9l4 4L14.5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              }
            </div>
            <div>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: accepted === 'accepted' ? '#15803d' : '#b91c1c', margin: 0 }}>
                {accepted === 'accepted' ? 'Quote Accepted' : 'Quote Declined'}
              </p>
              <p style={{ fontFamily: font, fontSize: '12px', color: accepted === 'accepted' ? '#166534' : '#991b1b', margin: '2px 0 0', opacity: 0.8 }}>
                {accepted === 'accepted'
                  ? `${quote.businessName || 'The contractor'} has been notified and will be in touch shortly.`
                  : 'Your response has been recorded.'}
              </p>
            </div>
          </div>
        )}

        {/* Line items */}
        <div style={{ marginTop: '28px' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8', marginBottom: '12px' }}>Quote Breakdown</p>
          <div style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
            {(quote.items || []).map((item, i) => (
              <div key={item.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: i < quote.items.length - 1 ? '1px solid #F1F5F9' : 'none', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#94a3b8" strokeWidth="1.5"/><path d="M5 8h6M5 5.5h4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#0F172A', margin: 0 }}>{item.name}</p>
                    {item.description && <p style={{ fontFamily: font, fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>{item.description}</p>}
                    <p style={{ fontFamily: font, fontSize: '11px', color: '#cbd5e1', margin: '2px 0 0' }}>{item.quantity} × £{Number(item.unitPrice).toFixed(2)}</p>
                  </div>
                </div>
                <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0, flexShrink: 0 }}>
                  £{(item.quantity * item.unitPrice).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', backgroundColor: '#F8FAFC', borderTop: '2px solid #E2E8F0' }}>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</p>
              <p style={{ fontFamily: font, fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
                £{total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        {(quote.businessEmail || quote.businessNumber) && (
          <div style={{ marginTop: '20px', padding: '16px 18px', backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8', marginBottom: '12px' }}>Contact</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {quote.businessEmail && (
                <a href={`mailto:${quote.businessEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '13px', color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {quote.businessEmail}
                </a>
              )}
              {quote.businessNumber && (
                <a href={`tel:${quote.businessNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '13px', color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2.5C2 2.5 3 1 4.5 2.5L5.5 4C6 4.5 5.5 5.5 5 6C4.5 6.5 5.5 8.5 7 9.5L7.5 9C8 8.5 9 8 9.5 8.5L11.5 10C13 11.5 11.5 12.5 11.5 12.5C9 14.5 1.5 6 2 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {quote.businessNumber}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontFamily: font, fontSize: '11px', color: '#cbd5e1', margin: 0 }}>
            Powered by <span style={{ fontWeight: 600, color: '#94a3b8' }}>VoQuota</span>
          </p>
        </div>
      </div>

      {/* ── Confirm modal ── */}
      {showConfirm && (
        <>
          <div onClick={() => !actionLoading && setShowConfirm(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 300 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(90vw, 360px)', backgroundColor: '#fff', borderRadius: '18px', padding: '28px 24px', zIndex: 301, boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: showConfirm === 'accept' ? '#f0fdf4' : '#fef2f2', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {showConfirm === 'accept'
                  ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
                }
              </div>
              <h2 style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
                {showConfirm === 'accept' ? 'Accept this quote?' : 'Decline this quote?'}
              </h2>
              <p style={{ fontFamily: font, fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                {showConfirm === 'accept'
                  ? `${quote.businessName || 'The contractor'} will be notified and will contact you to arrange next steps.`
                  : "This will notify the contractor that you've declined their quote."}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => setShowConfirm(null)} disabled={actionLoading} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #E2E8F0', backgroundColor: 'transparent', fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#64748B', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={confirmAction} disabled={actionLoading} style={{ padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: showConfirm === 'accept' ? '#22c55e' : '#ef4444', color: '#fff', fontFamily: font, fontSize: '14px', fontWeight: 700, cursor: actionLoading ? 'default' : 'pointer', opacity: actionLoading ? 0.7 : 1 }}>
                {actionLoading ? '…' : showConfirm === 'accept' ? 'Accept' : 'Decline'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
