import { useTheme } from '../context/ThemeContext'

export default function Navbar({ pageTitle }) {
  const { dark, toggle } = useTheme()

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-3 min-h-[52px]">

      {/* Left */}
      <div className="navbar-start gap-2">
        <div className="flex items-center gap-2">
          <img src="/vq_logo.png" alt="VoQuota" className="vq-logo" style={{ height: '26px', width: '26px', objectFit: 'contain' }} />
          <span className="font-semibold text-sm hidden sm:inline">VoQuota</span>
        </div>

        <div className="w-px h-5 bg-base-300 hidden sm:block" />

        <button className="hidden sm:flex items-center gap-1 text-sm text-base-content/60 hover:text-base-content">
          Workspace
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-base-300 hidden sm:block" />

        <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-none">{pageTitle}</span>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">

        {/* Search — hidden on mobile */}
        <label className="input input-sm input-bordered hidden md:flex items-center gap-2 w-44">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input type="text" placeholder="Search cards..." className="grow text-xs" />
        </label>

        {/* Total — hidden on mobile */}
        <div className="hidden sm:block border border-base-300 rounded-lg px-3 py-1 text-xs font-medium bg-base-100">
          TOTAL <span className="font-bold ml-1">N/A</span>
        </div>

        {/* Notifications */}
        <button className="btn btn-ghost btn-sm btn-circle relative">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2a5.5 5.5 0 015.5 5.5c0 2.7.6 4.3 1.2 5.1.3.4 0 .9-.5.9H2.8c-.5 0-.8-.5-.5-.9.6-.8 1.2-2.4 1.2-5.1A5.5 5.5 0 019 2z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 14.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-base-100" />
        </button>

        {/* Settings — hidden on mobile */}
        <button className="hidden sm:flex btn btn-ghost btn-sm btn-circle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 2v1M9 15v1M2 9h1M15 9h1M3.93 3.93l.7.7M13.37 13.37l.7.7M3.93 14.07l.7-.7M13.37 4.63l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Theme toggle */}
        <button className="btn btn-ghost btn-sm btn-circle" onClick={toggle} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {dark ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a5 5 0 013.9 8.1c-.5.6-.9 1.4-.9 2.1V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-.8c0-.7-.4-1.5-.9-2.1A5 5 0 019 2z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-black cursor-pointer flex-shrink-0" />
      </div>
    </div>
  )
}
