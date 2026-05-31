import { Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import ContractorManagement from './pages/contractor/ContractorManagement'
import './styles/App.css'

function HomeNav() {
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="taskbar" style={{ justifyContent: 'space-between' }}>
      <button className="taskbar-button" onClick={() => navigate('/contractor')}>
        Contractors Homepage
      </button>
      <button
        onClick={toggle}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'oklch(var(--bc))',
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
          borderRadius: '50%',
        }}
      >
        {dark ? (
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <HomeNav />
      <main className="landing-page">
        <h1 className="brand-title">VoQuota</h1>
        <p className="brand-subtitle">Quote, Invoice, That's it.</p>
        <div className="brand-footer">
          <span className="footer-date">JULY 2026</span>
          <span className="footer-email">inquiries@VoQuota.com</span>
        </div>
      </main>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contractor" element={<ContractorManagement />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
