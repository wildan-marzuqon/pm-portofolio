'use client'

import { useState } from 'react'
import { adminFetch, setAdminToken } from '@/lib/admin-fetch'
import { Alert, Button, Field, Input } from './ui'

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      setAdminToken(password)
      await adminFetch('/api/admin/hero')
      onSuccess()
    } catch {
      setError('Password salah atau akses ditolak.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
            Portfolio CMS
          </p>
          <h1 className="mt-1 text-lg font-bold text-slate-900">Masuk Admin</h1>
          <p className="mt-1 text-xs text-slate-500">
            Gunakan password dari env <code className="text-blue-700">ADMIN_SECRET</code>.
            Di development, kosongkan jika belum diset.
          </p>
        </div>

        {error ? <Alert type="error" message={error} /> : null}

        <div className="mt-4 space-y-4">
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password admin"
              autoFocus
            />
          </Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </Button>
        </div>
      </form>
    </div>
  )
}
