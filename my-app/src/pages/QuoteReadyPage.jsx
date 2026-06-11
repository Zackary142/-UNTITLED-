import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api'

const font = 'Montserrat, sans-serif'

export default function QuoteReadyPage() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    setQuote(JSON.parse(localStorage.getItem('voquota:firstQuote') || 'null'))
  }, [])

 async function handleDownload() {
  if (!quote) return
  const token = localStorage.getItem('token')
  navigate('/contractor')

  if (!token || !quote?.id) {
    alert('Please sign in before downloading.')
    return
  }

  try {
    // Step 1 — generate the PDF
    const genRes = await fetch(`${API}/api/Quote/${quote.id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!genRes.ok) {
      const payload = await genRes.json().catch(() => null)
      throw new Error(payload?.message || payload?.title || `Failed to generate PDF (${genRes.status})`)
    }

    // Step 2 — download it
    const dlRes = await fetch(`${API}/api/Quote/${quote.id}/pdf/download`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!dlRes.ok) {
      const payload = await dlRes.json().catch(() => null)
      throw new Error(payload?.message || payload?.title || `Failed to download PDF (${dlRes.status})`)
    }

    const blob = await dlRes.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(quote.title || 'quote').replace(/\s+/g, '-').toLowerCase()}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error(err)
    alert(err?.message || 'Unable to download the PDF.')
  }
}

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 640, backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: 18, padding: 24, boxShadow: '0 18px 38px rgba(0,0,0,0.12)' }}>
        <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.45, marginBottom: 4 }}>Success</p>
        <h1 style={{ fontFamily: font, fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Your first quote is ready</h1>
        <p style={{ fontFamily: font, fontSize: 13, color: 'var(--color-base-content)', opacity: 0.65, lineHeight: 1.5, marginBottom: 18 }}>Preview the quote details, download the file, or continue to your contractor pipeline.</p>

        <div style={{ border: '1px solid var(--color-base-300)', borderRadius: 14, padding: 14, backgroundColor: 'var(--color-base-200)', marginBottom: 18 }}>
          <p style={{ fontFamily: font, fontSize: 15, fontWeight: 700 }}>{quote?.title || 'My First Quote'}</p>
          <p style={{ fontFamily: font, fontSize: 12, opacity: 0.65 }}>{quote?.customer?.firstName || 'Customer'} {quote?.customer?.lastName || ''}</p>
          <p style={{ fontFamily: font, fontSize: 12, opacity: 0.65 }}>Total: £{(quote?.grandTotal || 0).toFixed(2)}</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={handleDownload} style={primaryButton}>Download PDF</button>
          <button onClick={() => navigate('/contractor')} style={secondaryButton}>Send Quote</button>
        </div>
      </div>
    </div>
  )
}

const primaryButton = { padding: '10px 14px', borderRadius: 10, border: 'none', backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }
const secondaryButton = { padding: '10px 14px', borderRadius: 10, border: '1px solid var(--color-base-300)', background: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }
