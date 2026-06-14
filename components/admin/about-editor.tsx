'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, ListEditor, Textarea } from './ui'

type AboutData = {
  title: string
  paragraph1: string
  paragraph2: string
  highlights: string[]
}

const emptyAbout: AboutData = {
  title: '',
  paragraph1: '',
  paragraph2: '',
  highlights: [],
}

export function AboutEditor() {
  const [form, setForm] = useState<AboutData>(emptyAbout)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetch<AboutData | null>('/api/admin/about')
        if (data) {
          setForm({
            title: data.title ?? '',
            paragraph1: data.paragraph1 ?? '',
            paragraph2: data.paragraph2 ?? '',
            highlights: data.highlights ?? [],
          })
        }
      } catch (error) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat about' })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const save = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const saved = await adminFetch<AboutData>('/api/admin/about', {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          highlights: form.highlights.filter(Boolean),
        }),
      })

      setForm(saved)
      setMessage({ type: 'success', text: 'About berhasil disimpan.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menyimpan about' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat about...</p>
  }

  return (
    <div className="space-y-4">
      {message ? <Alert type={message.type} message={message.text} /> : null}

      <AdminCard title="About Section">
        <Field label="Judul">
          <Textarea
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </Field>
        <Field label="Paragraf 1">
          <Textarea
            value={form.paragraph1}
            onChange={(event) => setForm({ ...form, paragraph1: event.target.value })}
          />
        </Field>
        <Field label="Paragraf 2">
          <Textarea
            value={form.paragraph2}
            onChange={(event) => setForm({ ...form, paragraph2: event.target.value })}
          />
        </Field>
        <ListEditor
          label="Highlights"
          items={form.highlights}
          onChange={(highlights) => setForm({ ...form, highlights })}
          placeholder="highlight"
        />
      </AdminCard>

      <Button type="button" onClick={save} disabled={saving}>
        {saving ? 'Menyimpan...' : 'Simpan About'}
      </Button>
    </div>
  )
}
