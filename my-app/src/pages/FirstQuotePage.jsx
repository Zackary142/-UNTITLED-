import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuote } from '../api'

const font = 'Montserrat, sans-serif'

export default function FirstQuotePage() {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [quoteItem, setQuoteItem] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [unitPrice, setUnitPrice] = useState('')
  const [saveCustomer, setSaveCustomer] = useState(true)

  async function handleSaveQuote() {
    const token = localStorage.getItem('token')
    console.log('token on quote save:', token)
    const payload = {
      title: 'My First Quote',
      customer: {
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        number: customer.phone || '',
      },
      items: [
        {
          name: quoteItem || 'Project work',
          quantity: Number(quantity || 1),
          unitPrice: Number(unitPrice || 0),
        },
      ],
    }

    try {
      const created = token ? await createQuote(payload, token) : null
      const savedQuote = {
        id: created?.id || Date.now(),
        title: created?.title || payload.title,
        customer,
        quoteItem,
        quantity: Number(quantity || 1),
        unitPrice: Number(unitPrice || 0),
        grandTotal: Number(quantity || 1) * Number(unitPrice || 0),
        createdAt: new Date().toISOString(),
        ...created,
      }

      localStorage.setItem('voquota:firstQuote', JSON.stringify(savedQuote))
      if (saveCustomer) localStorage.setItem('voquota:customer', JSON.stringify(customer))
      navigate('/quote-ready')
    } catch (err) {
      alert(err?.message || 'Unable to create your quote.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)', padding: '24px 16px 40px' }}>
      <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', display: 'grid', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.45, marginBottom: 4 }}>First Quote</p>
            <h1 style={{ fontFamily: font, fontSize: 24, fontWeight: 700, margin: 0 }}>Create your first quote</h1>
          </div>
          <button onClick={() => navigate('/contractor')} style={{ border: '1px solid var(--color-base-300)', borderRadius: 10, background: 'transparent', padding: '8px 12px', cursor: 'pointer', fontFamily: font, fontSize: 13 }}>Back to pipeline</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18 }}>
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Customer details</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input style={inputStyle} placeholder="First name" value={customer.firstName} onChange={e => setCustomer(prev => ({ ...prev, firstName: e.target.value }))} />
                <input style={inputStyle} placeholder="Last name" value={customer.lastName} onChange={e => setCustomer(prev => ({ ...prev, lastName: e.target.value }))} />
              </div>
              <input style={inputStyle} type="email" placeholder="Email" value={customer.email} onChange={e => setCustomer(prev => ({ ...prev, email: e.target.value }))} />
              <input style={inputStyle} type="tel" placeholder="Phone" value={customer.phone} onChange={e => setCustomer(prev => ({ ...prev, phone: e.target.value }))} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: font, fontSize: 13, color: 'var(--color-base-content)', opacity: 0.8 }}>
                <input type="checkbox" checked={saveCustomer} onChange={e => setSaveCustomer(e.target.checked)} />
                Save customer for later
              </label>
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitle}>Quote items</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <input style={inputStyle} placeholder="Description" value={quoteItem} onChange={e => setQuoteItem(e.target.value)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input style={inputStyle} type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <input style={inputStyle} type="number" min="0" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} placeholder="Unit price" />
              </div>
              <div style={{ border: '1px solid var(--color-base-300)', borderRadius: 12, padding: 12, backgroundColor: 'var(--color-base-200)' }}>
                <p style={{ fontFamily: font, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.4, opacity: 0.45, marginBottom: 4 }}>Preview</p>
                <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600 }}>{quoteItem || 'Quote item preview'}</p>
                <p style={{ fontFamily: font, fontSize: 12, opacity: 0.6 }}>{quantity || 1} × £{Number(unitPrice || 0).toFixed(2)}</p>
              </div>
            </div>
          </section>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <button onClick={() => navigate('/business-setup')} style={secondaryButton}>Back</button>
          <button onClick={handleSaveQuote} style={primaryButton}>Save Quote</button>
        </div>
      </div>
    </div>
  )
}

const cardStyle = { backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)', borderRadius: 16, padding: 18, boxShadow: '0 12px 28px rgba(0,0,0,0.08)' }
const sectionTitle = { fontFamily: font, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, opacity: 0.55, marginBottom: 10 }
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: 13, outline: 'none', boxSizing: 'border-box' }
const primaryButton = { padding: '10px 14px', borderRadius: 10, border: 'none', backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }
const secondaryButton = { padding: '10px 14px', borderRadius: 10, border: '1px solid var(--color-base-300)', background: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontWeight: 600, cursor: 'pointer' }
