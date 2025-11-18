const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function apiGet(path) {
  const res = await fetch(`${baseUrl}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPatch(path, body) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiDelete(path) {
  const res = await fetch(`${baseUrl}${path}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export { baseUrl }
