import { useEffect, useMemo, useState } from 'react'
import LuxShell from './components/LuxShell'
import SurveyCards from './components/SurveyCards'
import BuilderPanel from './components/BuilderPanel'
import { apiGet, apiPost, apiPatch, apiDelete, baseUrl } from './lib/api'

function App() {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(null)

  const fetchSurveys = async () => {
    setLoading(true)
    try {
      const data = await apiGet('/api/surveys')
      setSurveys(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  const startCreate = async () => {
    setCreating(true)
    const draft = {
      title: 'Untitled Survey',
      description: '',
      status: 'draft',
      questions: [],
    }
    try {
      const res = await apiPost('/api/surveys', draft)
      const created = { id: res.id, ...draft }
      setSurveys((s) => [created, ...s])
      setEditing(created)
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  const saveEditing = async (data) => {
    try {
      const saved = await apiPatch(`/api/surveys/${editing.id}`, data)
      setSurveys((all) => all.map((s) => (s.id === editing.id ? saved : s)))
      setEditing(saved)
    } catch (e) {
      console.error(e)
    }
  }

  const removeSurvey = async (s) => {
    if (!confirm('Delete this survey?')) return
    try {
      await apiDelete(`/api/surveys/${s.id}`)
      setSurveys((all) => all.filter((i) => i.id !== s.id))
    } catch (e) {
      console.error(e)
    }
  }

  const header = (
    <div className="flex items-center justify-between py-6">
      <div>
        <div className="text-2xl font-semibold">Welcome back</div>
        <div className="text-white/60 text-sm">Design luxurious, high‑converting surveys</div>
      </div>
      <div className="text-white/40 text-xs">API: {baseUrl}</div>
    </div>
  )

  return (
    <LuxShell header={header}>
      {editing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Editing: {editing.title}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(null)} className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Back</button>
              <button onClick={() => saveEditing(editing)} className="px-3 py-2 rounded-lg bg-gradient-to-tr from-[#b08d57] to-[#e6c266] text-black">Save</button>
            </div>
          </div>
          <BuilderPanel value={editing} onChange={setEditing} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-5">
            <div className="text-lg font-semibold">Your Surveys</div>
            <button disabled={creating} onClick={startCreate} className="px-4 py-2 rounded-xl bg-gradient-to-tr from-[#b08d57] to-[#e6c266] text-black disabled:opacity-60">{creating ? 'Creating…' : 'New Survey'}</button>
          </div>
          {loading ? (
            <div className="text-white/60">Loading…</div>
          ) : (
            <SurveyCards surveys={surveys} onEdit={setEditing} onDelete={removeSurvey} onOpen={(s)=>setEditing(s)} />
          )}
        </>
      )}
    </LuxShell>
  )
}

export default App
