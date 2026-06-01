import Navbar from '../../components/Navbar'

export default function ContractorManagement() {
  return (
    <div className="min-h-screen bg-base-200">

      <Navbar pageTitle="Document Pipeline" />

      {/* Trello Style Board */}
      <div className="grid grid-cols-3 gap-4 p-5">

        {/* Quotes Column */}
        <div className="flex flex-col gap-3">
          <div className="bg-base-100 rounded-xl border border-base-300 p-4">
            <div className="border-b-2 border-amber-500 pb-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber-500">
                  <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-sm">Quotes</span>
                <span className="badge badge-sm bg-base-200 border-0 text-base-content/50">0</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-base-content/40">Awaiting approval</p>
                  <p className="text-sm font-semibold text-base-content/50">—</p>
                </div>
                <button className="text-base-content/30 hover:text-base-content text-lg leading-none tracking-widest">···</button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/30">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="3" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-center leading-relaxed">No quotes yet.<br/>Cards will appear here once<br/>the backend is connected.</p>
            </div>

            <button className="btn btn-ghost btn-sm w-full border border-dashed border-base-300 text-base-content/40 hover:text-base-content hover:border-base-400 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add card
            </button>
          </div>
        </div>

        {/* Invoices Column */}
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
                <span className="badge badge-sm bg-base-200 border-0 text-base-content/50">0</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-base-content/40">Pending payment</p>
                  <p className="text-sm font-semibold text-base-content/50">—</p>
                </div>
                <button className="text-base-content/30 hover:text-base-content text-lg leading-none tracking-widest">···</button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/30">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="3" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-center leading-relaxed">No invoices yet.<br/>Cards will appear here once<br/>the backend is connected.</p>
            </div>

            <button className="btn btn-ghost btn-sm w-full border border-dashed border-base-300 text-base-content/40 hover:text-base-content hover:border-base-400 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add card
            </button>
          </div>
        </div>

        {/* Payment Confirmed Column */}
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
              <p className="text-xs text-center leading-relaxed">No confirmed payments.<br/>Cards will appear here once<br/>the backend is connected.</p>
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
