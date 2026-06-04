import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { API, createInvoice, createQuote } from '../../api'

// ── Shared styles ──────────────────────────────────────────────────────────────
const font = 'Montserrat, sans-serif'

const sectionTitle = {
  fontFamily: font, fontSize: '13px', fontWeight: 700,
  color: 'var(--color-base-content)', textTransform: 'uppercase',
  letterSpacing: '0.6px', marginBottom: '14px',
}

const fieldLabel = {
  display: 'flex', alignItems: 'center', gap: '6px',
  fontFamily: font, fontSize: '11px', fontWeight: 600,
  color: 'var(--color-base-content)', opacity: 0.55,
  textTransform: 'uppercase', letterSpacing: '0.4px',
  marginBottom: '5px',
}

const optionalTag = {
  fontFamily: font, fontSize: '10px', fontWeight: 400,
  color: 'var(--color-base-content)', opacity: 0.35,
  textTransform: 'none', letterSpacing: 0,
}

const input = {
  width: '100%', padding: '9px 12px', borderRadius: '8px',
  border: '1px solid var(--color-base-300)',
  backgroundColor: 'var(--color-base-200)',
  color: 'var(--color-base-content)',
  fontFamily: font, fontSize: '13px', outline: 'none',
  boxSizing: 'border-box',
}

const divider = {
  border: 'none', borderTop: '1px solid var(--color-base-300)',
  margin: '24px 0',
}

// ── Shared mini card ───────────────────────────────────────────────────────────
function MiniCard({ title, subtitle, actionLabel, onAction }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div style={{
      backgroundColor: 'var(--color-base-100)',
      border: '1px solid var(--color-base-300)',
      borderRadius: '10px', padding: '12px 14px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: '8px',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: 'var(--color-base-content)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </p>
        <p style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.45, marginTop: '2px' }}>
          {subtitle}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {actionLabel && (
          <button onClick={onAction} style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--color-base-300)', backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', fontFamily: font, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
            {actionLabel}
          </button>
        )}
        <button onClick={() => setVisible(false)} title="Minimise" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-content)', opacity: 0.35, fontSize: '18px', lineHeight: 1, padding: '2px 4px' }}>×</button>
      </div>
    </div>
  )
}

// ── Shared project fields (used in both modals) ────────────────────────────────
function ProjectFields({ labourRate, setLabourRate, labourHours, setLabourHours, labourTotal, materials, updateMaterial, removeMaterial, addMaterialRow, materialsTotal, additionals, updateAdditional, removeAdditional, addAdditionalRow, additionalsTotal }) {
  return (
    <div>
      <p style={sectionTitle}>Project Details</p>

      <div style={{ marginBottom: '16px' }}>
        <div style={fieldLabel}>Labour</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
          <div>
            <div style={{ ...fieldLabel, fontSize: '10px', marginBottom: '4px' }}>Rate (£/hr)</div>
            <input style={input} type="number" min="0" value={labourRate} onChange={e => setLabourRate(e.target.value)} placeholder="0.00" />
          </div>
          <div>
            <div style={{ ...fieldLabel, fontSize: '10px', marginBottom: '4px' }}>Hours worked <span style={optionalTag}>Optional</span></div>
            <input style={input} type="number" min="0" value={labourHours} onChange={e => setLabourHours(e.target.value)} placeholder="0" />
          </div>
        </div>
        {labourTotal > 0 && (
          <p style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.5, textAlign: 'right' }}>
            Labour total: <strong>£{labourTotal.toFixed(2)}</strong>
          </p>
        )}
      </div>

      <hr style={divider} />

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={fieldLabel}>Materials <span style={optionalTag}>Optional</span></div>
          <button onClick={addMaterialRow} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.5 }}>+ Add item</button>
        </div>
        {materials.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 24px', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
            <input style={input} type="text" value={m.name} onChange={e => updateMaterial(i, 'name', e.target.value)} placeholder="e.g. Timber, paint…" />
            <input style={{ ...input, textAlign: 'right' }} type="number" min="0" value={m.cost} onChange={e => updateMaterial(i, 'cost', e.target.value)} placeholder="£0.00" />
            {materials.length > 1 && (
              <button onClick={() => removeMaterial(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-content)', opacity: 0.3, fontSize: '16px', lineHeight: 1 }}>×</button>
            )}
          </div>
        ))}
        {materialsTotal > 0 && (
          <p style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.5, textAlign: 'right', marginTop: '4px' }}>
            Materials total: <strong>£{materialsTotal.toFixed(2)}</strong>
          </p>
        )}
      </div>

      <hr style={divider} />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={fieldLabel}>Additionals <span style={optionalTag}>Optional</span></div>
          <button onClick={addAdditionalRow} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.5 }}>+ Add item</button>
        </div>
        {additionals.map((a, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 24px', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
            <input style={input} type="text" value={a.description} onChange={e => updateAdditional(i, 'description', e.target.value)} placeholder="e.g. Emergency call-out" />
            <input style={{ ...input, textAlign: 'right' }} type="number" min="0" value={a.amount} onChange={e => updateAdditional(i, 'amount', e.target.value)} placeholder="£0.00" />
            {additionals.length > 1 && (
              <button onClick={() => removeAdditional(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-content)', opacity: 0.3, fontSize: '16px', lineHeight: 1 }}>×</button>
            )}
          </div>
        ))}
        {additionalsTotal > 0 && (
          <p style={{ fontFamily: font, fontSize: '11px', color: 'var(--color-base-content)', opacity: 0.5, textAlign: 'right', marginTop: '4px' }}>
            Additionals total: <strong>£{additionalsTotal.toFixed(2)}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

// ── Shared customer fields ─────────────────────────────────────────────────────
function CustomerFields({ FirstName, setFirstName, LastName, setLastName, Email, setEmail, Number, setNumber }) {
  return (
    <div>
      <p style={sectionTitle}>Customer Details</p>
      <div style={{ marginBottom: '12px' }}>
        <div style={fieldLabel}>First Name</div>
        <input style={input} type="text" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <div style={fieldLabel}>Surname</div>
        <input style={input} type="text" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <div style={fieldLabel}>Email</div>
        <input style={input} type="email" value={Email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
      </div>
      <div>
        <div style={fieldLabel}>Phone No.</div>
        <input style={input} type="tel" value={Number} onChange={e => setNumber(e.target.value)} placeholder="+44 7700 000000" />
      </div>
    </div>
  )
}

// ── Quote Modal ────────────────────────────────────────────────────────────────
function QuoteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Number, setNumber] = useState('')
  const [labourRate, setLabourRate] = useState('')
  const [labourHours, setLabourHours] = useState('')
  const [materials, setMaterials] = useState([{ name: '', cost: '' }])
  const [additionals, setAdditionals] = useState([{ description: '', amount: '' }])

  const labourTotal = (parseFloat(labourRate) || 0) * (parseFloat(labourHours) || 0)
  const materialsTotal = materials.reduce((sum, m) => sum + (parseFloat(m.cost) || 0), 0)
  const additionalsTotal = additionals.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0)
  const grandTotal = labourTotal + materialsTotal + additionalsTotal

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(95vw, 820px)', maxHeight: '88vh', backgroundColor: 'var(--color-base-100)', borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', zIndex: 201, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--color-base-300)' }}>
          <div>
            <h2 style={{ fontFamily: font, fontSize: '16px', fontWeight: 700, color: 'var(--color-base-content)', margin: 0 }}>New Quote</h2>
            <p style={{ fontFamily: font, fontSize: '12px', color: 'var(--color-base-content)', opacity: 0.4, margin: '2px 0 0' }}>Fill in the details below to create a quote</p>
          </div>
          <button onClick={onClose} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={fieldLabel}>Quote Title</div>
            <input style={input} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Website Redesign — Acme Co." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <CustomerFields FirstName={FirstName} setFirstName={setFirstName} LastName={LastName} setLastName={setLastName} Email={Email} setEmail={setEmail} Number={Number} setNumber={setNumber} />
            <ProjectFields
              labourRate={labourRate} setLabourRate={setLabourRate}
              labourHours={labourHours} setLabourHours={setLabourHours}
              labourTotal={labourTotal}
              materials={materials} updateMaterial={(i,k,v) => setMaterials(p => p.map((m,idx) => idx===i?{...m,[k]:v}:m))} removeMaterial={i => setMaterials(p => p.filter((_,idx) => idx!==i))} addMaterialRow={() => setMaterials(p => [...p, { name:'', cost:'' }])} materialsTotal={materialsTotal}
              additionals={additionals} updateAdditional={(i,k,v) => setAdditionals(p => p.map((a,idx) => idx===i?{...a,[k]:v}:a))} removeAdditional={i => setAdditionals(p => p.filter((_,idx) => idx!==i))} addAdditionalRow={() => setAdditionals(p => [...p, { description:'', amount:'' }])} additionalsTotal={additionalsTotal}
            />
          </div>
          {grandTotal > 0 && (
            <div style={{ marginTop: '28px', padding: '14px 18px', backgroundColor: 'var(--color-base-200)', borderRadius: '10px', border: '1px solid var(--color-base-300)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.6 }}>Grand Total</span>
              <span style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: 'var(--color-base-content)' }}>£{grandTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-base-300)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave({ title, FirstName, LastName, Email, Number, labourRate, labourHours, labourTotal, materials, materialsTotal, additionals, additionalsTotal, grandTotal })} style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-base-content)', color: 'var(--color-base-100)', fontFamily: font, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Save quote</button>
        </div>
      </div>
    </>
  )
}

// ── Invoice Modal ──────────────────────────────────────────────────────────────
function InvoiceModal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Number, setNumber] = useState('')
  const [labourRate, setLabourRate] = useState('')
  const [labourHours, setLabourHours] = useState('')
  const [materials, setMaterials] = useState([{ name: '', cost: '' }])
  const [additionals, setAdditionals] = useState([{ description: '', amount: '' }])
  const [dueDate, setDueDate] = useState('')

  const labourTotal = (parseFloat(labourRate) || 0) * (parseFloat(labourHours) || 0)
  const materialsTotal = materials.reduce((sum, m) => sum + (parseFloat(m.cost) || 0), 0)
  const additionalsTotal = additionals.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0)
  const grandTotal = labourTotal + materialsTotal + additionalsTotal

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(95vw, 820px)', maxHeight: '88vh', backgroundColor: 'var(--color-base-100)', borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', zIndex: 201, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--color-base-300)' }}>
          <div>
            <h2 style={{ fontFamily: font, fontSize: '16px', fontWeight: 700, color: 'var(--color-base-content)', margin: 0 }}>New Invoice</h2>
            <p style={{ fontFamily: font, fontSize: '12px', color: 'var(--color-base-content)', opacity: 0.4, margin: '2px 0 0' }}>Fill in the details below to create an invoice</p>
          </div>
          <button onClick={onClose} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* Title + due date row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={fieldLabel}>Invoice Title</div>
              <input style={input} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Website Redesign — Acme Co." />
            </div>
            <div>
              <div style={fieldLabel}>Due Date <span style={optionalTag}>Optional</span></div>
              <input style={input} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <CustomerFields FirstName={FirstName} setFirstName={setFirstName} LastName={LastName} setLastName={setLastName} Email={Email} setEmail={setEmail} Number={Number} setNumber={setNumber} />
            <ProjectFields
              labourRate={labourRate} setLabourRate={setLabourRate}
              labourHours={labourHours} setLabourHours={setLabourHours}
              labourTotal={labourTotal}
              materials={materials} updateMaterial={(i,k,v) => setMaterials(p => p.map((m,idx) => idx===i?{...m,[k]:v}:m))} removeMaterial={i => setMaterials(p => p.filter((_,idx) => idx!==i))} addMaterialRow={() => setMaterials(p => [...p, { name:'', cost:'' }])} materialsTotal={materialsTotal}
              additionals={additionals} updateAdditional={(i,k,v) => setAdditionals(p => p.map((a,idx) => idx===i?{...a,[k]:v}:a))} removeAdditional={i => setAdditionals(p => p.filter((_,idx) => idx!==i))} addAdditionalRow={() => setAdditionals(p => [...p, { description:'', amount:'' }])} additionalsTotal={additionalsTotal}
            />
          </div>
          {grandTotal > 0 && (
            <div style={{ marginTop: '28px', padding: '14px 18px', backgroundColor: 'var(--color-base-200)', borderRadius: '10px', border: '1px solid var(--color-base-300)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: 'var(--color-base-content)', opacity: 0.6 }}>Amount Due</span>
              <span style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: 'var(--color-base-content)' }}>£{grandTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-base-300)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid var(--color-base-300)', backgroundColor: 'transparent', color: 'var(--color-base-content)', fontFamily: font, fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave({ title, FirstName, LastName, Email, Number, labourRate, labourHours, labourTotal, materials, materialsTotal, additionals, additionalsTotal, grandTotal, dueDate })} style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontFamily: font, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Save invoice</button>
        </div>
      </div>
    </>
  )
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch {
    return null
  }
}

function getUserKey(user) {
  return (user?.id || user?.email || 'guest').toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '_')
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ContractorManagement() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(getCurrentUser)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [invoices, setInvoices] = useState([])
  const storageKey = currentUser ? `voquota:contractor:${getUserKey(currentUser)}` : null

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
      setQuotes(saved.quotes || [])
      setInvoices(saved.invoices || [])
    } catch {
      setQuotes([])
      setInvoices([])
    }
  }, [currentUser, navigate, storageKey])

  useEffect(() => {
    if (!currentUser || !storageKey) return

    localStorage.setItem(storageKey, JSON.stringify({
      quotes,
      invoices,
      updatedAt: new Date().toISOString(),
    }))
  }, [currentUser, storageKey, quotes, invoices])

  useEffect(() => {
    const syncUser = () => setCurrentUser(getCurrentUser())
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  function formatSubtitle(card) {
    const name = `${card.FirstName || ''} ${card.LastName || ''}`.trim()
    const amount = (Number(card.grandTotal || 0) > 0)
      ? `£${Number(card.grandTotal || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'Draft'
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    return [name, amount, date].filter(Boolean).join(' · ')
  }

  async function handleGenerateDocument(type, card) {
    console.log('generating', type, 'for id:', card?.id)
    const token = localStorage.getItem('token')
    console.log('token:', token)

    if (!token) {
      alert('Please sign in before generating a document.')
      return
    }

    try {
      const id = card?.id
      if (!id) {
        throw new Error('This document has not been created by the backend yet.')
      }

const res = await fetch(`${API}/api/${type === 'quote' ? 'Quote' : 'Invoice'}/${id}/pdf/download`, {
  headers: { Authorization: `Bearer ${token}` },
})

console.log('response status:', res.status)
console.log('response headers:', res.headers.get('content-type'))

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        throw new Error(payload?.message || payload?.title || 'Unable to generate the document PDF.')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      alert(err?.message || 'Unable to generate the document.')
    }
  }

  if (!currentUser) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-base-200)' }}>
      <Navbar pageTitle="Document Pipeline" />

      {quoteModalOpen && <QuoteModal onClose={() => setQuoteModalOpen(false)} onSave={async (card) => {
        try {
          const token = localStorage.getItem('token')
          if (!token) {
            alert('Please sign in before creating a quote.')
            return
          }

          const items = [
            ...(Number(card.labourRate || 0) > 0 || Number(card.labourHours || 0) > 0
              ? [{ name: 'Labour', quantity: Number(card.labourHours || 0), unitPrice: Number(card.labourRate || 0) }]
              : []),
            ...(card.materials || []).filter(item => item.name || item.cost).map(item => ({ name: item.name || 'Material', quantity: 1, unitPrice: Number(item.cost || 0) })),
            ...(card.additionals || []).filter(item => item.description || item.amount).map(item => ({ name: item.description || 'Additional', quantity: 1, unitPrice: Number(item.amount || 0) })),
          ]

          const created = await createQuote({
            title: card.title || 'Untitled Quote',
            customer: {
              firstName: card.FirstName || '',
              lastName: card.LastName || '',
              email: card.Email || '',
              number: card.Number || '',
            },
            items: items.length ? items : [{ name: card.title || 'Quote', quantity: 1, unitPrice: Number(card.grandTotal || 0) }],
          }, token)

          setQuotes(p => [...p, { ...card, ...created, id: created?.id || Date.now(), kind: 'quote' }])
          setQuoteModalOpen(false)
        } catch (err) {
          alert(err?.message || 'Unable to create quote.')
        }
      }} />}
      {invoiceModalOpen && <InvoiceModal onClose={() => setInvoiceModalOpen(false)} onSave={async (card) => {
        try {
          const token = localStorage.getItem('token')
          if (!token) {
            alert('Please sign in before creating an invoice.')
            return
          }

          const items = [
            ...(Number(card.labourRate || 0) > 0 || Number(card.labourHours || 0) > 0
              ? [{ name: 'Labour', quantity: Number(card.labourHours || 0), unitPrice: Number(card.labourRate || 0) }]
              : []),
            ...(card.materials || []).filter(item => item.name || item.cost).map(item => ({ name: item.name || 'Material', quantity: 1, unitPrice: Number(item.cost || 0) })),
            ...(card.additionals || []).filter(item => item.description || item.amount).map(item => ({ name: item.description || 'Additional', quantity: 1, unitPrice: Number(item.amount || 0) })),
          ]

          const created = await createInvoice({
            title: card.title || 'Untitled Invoice',
            customer: {
              firstName: card.FirstName || '',
              lastName: card.LastName || '',
              email: card.Email || '',
              number: card.Number || '',
            },
            items: items.length ? items : [{ name: card.title || 'Invoice', quantity: 1, unitPrice: Number(card.grandTotal || 0) }],
            dueDate: card.dueDate || null,
          }, token)

          setInvoices(p => [...p, { ...card, ...created, id: created?.id || Date.now(), kind: 'invoice' }])
          setInvoiceModalOpen(false)
        } catch (err) {
          alert(err?.message || 'Unable to create invoice.')
        }
      }} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">

        {/* ── Quotes ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-base-100 rounded-xl border border-base-300 p-4">
            <div className="border-b-2 border-amber-500 pb-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber-500">
                  <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-sm">Quotes</span>
                <span className="badge badge-sm bg-base-200 border-0 text-base-content/50">{quotes.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-base-content/40">Awaiting approval</p>
                  <p className="text-sm font-semibold text-base-content/50">
                    {quotes.length > 0 ? `£${quotes.reduce((s, q) => s + q.grandTotal, 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                  </p>
                </div>
                <button className="text-base-content/30 hover:text-base-content text-lg leading-none tracking-widest">···</button>
              </div>
            </div>
            {quotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/30">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="3" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-center leading-relaxed">No quotes yet.<br/>Press Add card to get started.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                {quotes.map(card => <MiniCard key={card.id} title={card.title || 'Untitled Quote'} subtitle={formatSubtitle(card)} actionLabel="Generate Quote" onAction={() => handleGenerateDocument('quote', card)} />)}
              </div>
            )}
            <button onClick={() => setQuoteModalOpen(true)} className="btn btn-ghost btn-sm w-full border border-dashed border-base-300 text-base-content/40 hover:text-base-content hover:border-base-400 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add card
            </button>
          </div>
        </div>

        {/* ── Invoices ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-base-100 rounded-xl border border-base-300 p-4">
            <div className="border-b-2 border-blue-500 pb-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-500">
                  <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 5h6M5 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 11h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-sm">Invoices</span>
                <span className="badge badge-sm bg-base-200 border-0 text-base-content/50">{invoices.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-base-content/40">Pending payment</p>
                  <p className="text-sm font-semibold text-base-content/50">
                    {invoices.length > 0 ? `£${invoices.reduce((s, i) => s + i.grandTotal, 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                  </p>
                </div>
                <button className="text-base-content/30 hover:text-base-content text-lg leading-none tracking-widest">···</button>
              </div>
            </div>
            {invoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/30">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="3" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-center leading-relaxed">No invoices yet.<br/>Press Add card to get started.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                {invoices.map(card => (
                  <MiniCard
                    key={card.id}
                    title={card.title || 'Untitled Invoice'}
                    subtitle={[
                      `${card.FirstName || ''} ${card.LastName || ''}`.trim(),
                      Number(card.grandTotal || 0) > 0 ? `£${Number(card.grandTotal || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Draft',
                      card.dueDate ? `Due ${new Date(card.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                    ].filter(s => s.trim()).join(' · ')}
                    actionLabel="Generate Invoice"
                    onAction={() => handleGenerateDocument('invoice', card)}
                  />
                ))}
              </div>
            )}
            <button onClick={() => setInvoiceModalOpen(true)} className="btn btn-ghost btn-sm w-full border border-dashed border-base-300 text-base-content/40 hover:text-base-content hover:border-base-400 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add card
            </button>
          </div>
        </div>

        {/* ── Payment Confirmed ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-base-100 rounded-xl border border-base-300 p-4">
            <div className="border-b-2 border-green-500 pb-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-500">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-sm">Payment Confirmed</span>
                <span className="badge badge-sm bg-base-200 border-0 text-base-content/50">0</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-base-content/40">Completed</p>
                  <p className="text-sm font-semibold text-base-content/50">—</p>
                </div>
                <button className="text-base-content/30 hover:text-base-content text-lg leading-none tracking-widest">···</button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/30">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-xs text-center leading-relaxed">No confirmed payments.</p>
            </div>
            <button className="btn btn-ghost btn-sm w-full border border-dashed border-base-300 text-base-content/40 hover:text-base-content hover:border-base-400 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add card
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
