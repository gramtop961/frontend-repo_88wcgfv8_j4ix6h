import { Eye, BarChart3, Pencil, Trash2, Clock } from 'lucide-react'

export default function SurveyCards({ surveys = [], onEdit, onDelete, onOpen }) {
  if (!surveys.length) {
    return (
      <div className="grid place-items-center py-24">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">No surveys yet</div>
          <p className="text-white/60">Create your first survey to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {surveys.map((s) => (
        <div key={s.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-colors">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'radial-gradient(600px 60px at 0% 0%, rgba(212,175,55,0.12), transparent)'}}/>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-lg font-semibold line-clamp-1">{s.title}</div>
              <span className={`text-xs px-2 py-1 rounded-full border ${s.status==='published' ? 'border-emerald-400/40 text-emerald-300/90' : s.status==='draft' ? 'border-white/20 text-white/70' : 'border-rose-400/40 text-rose-300/90'}`}>{s.status}</span>
            </div>
            <p className="text-white/60 line-clamp-2 min-h-[40px]">{s.description || '—'}</p>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <Clock size={14} className="opacity-60" />
              <span>Updated just now</span>
            </div>
          </div>
          <div className="px-5 pb-5 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-white/70">
              <Eye size={16} /> <span>{s.views || 0}</span>
              <BarChart3 size={16} className="ml-3" /> <span>{s.responses || 0}</span>
            </div>
            <div className="inline-flex items-center gap-2 opacity-80">
              <button onClick={() => onEdit?.(s)} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"><Pencil size={16}/></button>
              <button onClick={() => onOpen?.(s)} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Open</button>
              <button onClick={() => onDelete?.(s)} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-rose-300"><Trash2 size={16}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
