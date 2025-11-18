import { useState } from 'react'
import { Menu, Search, Plus, Settings, BarChart3, LayoutDashboard, Layers, Share2 } from 'lucide-react'

export default function LuxShell({ sidebar, header, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#e5e4e2]">
      <div className="fixed inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 20% -10%, rgba(212,175,55,0.25), transparent 35%), radial-gradient(circle at 80% 110%, rgba(180,144,90,0.15), transparent 35%)' }} />

      <div className="relative flex">
        {/* Sidebar */}
        <aside className={`transition-all duration-300 ${open ? 'w-72' : 'w-20'} h-screen sticky top-0 bg-[#0f0f14]/80 backdrop-blur border-r border-white/10`}> 
          <div className="flex items-center gap-3 px-4 py-5">
            <button onClick={() => setOpen(!open)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
              <Menu size={18} />
            </button>
            {open && <div className="text-lg font-semibold tracking-tight">LuxSurvey</div>}
          </div>
          <nav className="px-2 space-y-1">
            {[
              { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
              { icon: <Layers size={18} />, label: 'Surveys' },
              { icon: <BarChart3 size={18} />, label: 'Analytics' },
              { icon: <Settings size={18} />, label: 'Settings' },
            ].map((i) => (
              <div key={i.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/10 cursor-pointer">
                <span className="opacity-80">{i.icon}</span>
                {open && <span>{i.label}</span>}
              </div>
            ))}
          </nav>
          <div className="px-3 mt-4">
            <button className="w-full inline-flex items-center gap-2 justify-center bg-gradient-to-tr from-[#b08d57] to-[#e6c266] text-black font-medium py-2.5 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3)_inset]">
              <Plus size={16} />
              {open && <span>New Survey</span>}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 backdrop-blur bg-[#0a0a0d]/70 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-full max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30" placeholder="Search surveys, responses, tags" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Invite</button>
                <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm inline-flex items-center gap-2"><Share2 size={16}/>Share</button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#b08d57] to-[#e6c266]" />
              </div>
            </div>
          </header>
          <div className="max-w-7xl mx-auto p-6">
            {header}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
