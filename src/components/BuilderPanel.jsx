import { useState } from 'react'

export default function BuilderPanel({ value, onChange }) {
  const [local, setLocal] = useState(value || { title: '', description: '', questions: [] })

  const set = (patch) => {
    const next = { ...local, ...patch }
    setLocal(next)
    onChange?.(next)
  }

  const addQuestion = (type) => {
    const id = Math.random().toString(36).slice(2, 8)
    const q = { id, type, title: `${type} question`, required: false }
    set({ questions: [...(local.questions || []), q] })
  }

  const updateQ = (id, patch) => {
    set({ questions: local.questions.map(q => q.id === id ? { ...q, ...patch } : q) })
  }

  const removeQ = (id) => {
    set({ questions: local.questions.filter(q => q.id !== id) })
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-5">
        <input value={local.title} onChange={e=>set({title:e.target.value})} placeholder="Survey title" className="w-full bg-transparent text-2xl font-semibold outline-none" />
        <textarea value={local.description||''} onChange={e=>set({description:e.target.value})} placeholder="Add a short description" className="w-full mt-2 bg-transparent outline-none text-white/70" />
        <div className="mt-6 space-y-3">
          {(local.questions||[]).map(q => (
            <div key={q.id} className="bg-black/20 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <select value={q.type} onChange={e=>updateQ(q.id,{type:e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm">
                  <option value="short_text">Short Text</option>
                  <option value="long_text">Long Text</option>
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="rating">Rating</option>
                  <option value="nps">NPS</option>
                </select>
                <input value={q.title} onChange={e=>updateQ(q.id,{title:e.target.value})} className="flex-1 bg-transparent outline-none" />
                <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={q.required} onChange={e=>updateQ(q.id,{required:e.target.checked})}/> Required</label>
                <button onClick={()=>removeQ(q.id)} className="px-2 py-1 text-rose-300 bg-white/5 border border-white/10 rounded-lg">Remove</button>
              </div>
              {['multiple_choice','checkbox'].includes(q.type) && (
                <OptionsEditor value={q.options||['Option 1']} onChange={(opts)=>updateQ(q.id,{options:opts})} />
              )}
              {q.type==='rating' && (
                <div className="mt-3 text-sm text-white/70">Scale max: <input type="number" min={3} max={10} value={q.scale_max||5} onChange={e=>updateQ(q.id,{scale_max:parseInt(e.target.value)})} className="bg-white/5 border border-white/10 rounded px-2 ml-2 w-16"/></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="text-sm text-white/60 mb-2">Add questions</div>
          <div className="flex flex-wrap gap-2">
            {[
              {t:'short_text',label:'Short Text'},
              {t:'long_text',label:'Long Text'},
              {t:'multiple_choice',label:'Multiple Choice'},
              {t:'checkbox',label:'Checkboxes'},
              {t:'rating',label:'Rating'},
              {t:'nps',label:'NPS'},
            ].map(b => (
              <button key={b.t} onClick={()=>addQuestion(b.t)} className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm">{b.label}</button>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-gradient-to-tr from-[#b08d57] to-[#e6c266] rounded-2xl p-4 text-black">
          <div className="font-medium">Luxury Tip</div>
          <div className="text-sm opacity-80">Use fewer, more focused questions to increase completion rate.</div>
        </div>
      </div>
    </div>
  )
}

function OptionsEditor({ value, onChange }) {
  const add = () => onChange([...(value||[]), `Option ${value.length+1}`])
  const set = (i, v) => onChange(value.map((o,idx)=> idx===i ? v : o))
  const remove = (i) => onChange(value.filter((_,idx)=> idx!==i))
  return (
    <div className="mt-3 space-y-2">
      {(value||[]).map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={opt} onChange={e=>set(i,e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1"/>
          <button onClick={()=>remove(i)} className="px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10">Remove</button>
        </div>
      ))}
      <button onClick={add} className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10">Add option</button>
    </div>
  )
}
