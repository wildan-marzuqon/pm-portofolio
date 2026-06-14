'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, Input, ListEditor, Textarea } from './ui'

type ExperienceItem = {
  id?: string
  title: string
  company: string
  date: string
  achievements: string[]
  sortOrder: number
}

const emptyExperience: ExperienceItem = {
  title: '',
  company: '',
  date: '',
  achievements: [''],
  sortOrder: 0,
}

export function ExperienceEditor() {
  const [items, setItems] = useState<ExperienceItem[]>([])
  const [draft, setDraft] = useState<ExperienceItem>(emptyExperience)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminFetch<ExperienceItem[]>('/api/admin/experience')
      setItems(data)
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat experience' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetDraft = () => {
    setDraft({ ...emptyExperience, sortOrder: items.length })
    setEditingId(null)
  }

  const saveDraft = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const payload = {
        ...draft,
        achievements: draft.achievements.filter(Boolean),
      }

      if (editingId) {
        await adminFetch(`/api/admin/experience/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setMessage({ type: 'success', text: 'Experience diperbarui.' })
      } else {
        await adminFetch('/api/admin/experience', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage({ type: 'success', text: 'Experience ditambahkan.' })
      }

      resetDraft()
      await load()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menyimpan experience' })
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Hapus experience ini?')) return

    try {
      await adminFetch(`/api/admin/experience/${id}`, { method: 'DELETE' })
      setMessage({ type: 'success', text: 'Experience dihapus.' })
      if (editingId === id) resetDraft()
      await load()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menghapus experience' })
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat experience...</p>
  }

  return (
    <div className="space-y-4">
      {message ? <Alert type={message.type} message={message.text} /> : null}

      <AdminCard
        title={editingId ? 'Edit Experience' : 'Tambah Experience'}
        actions={
          editingId ? (
            <Button type="button" variant="ghost" onClick={resetDraft}>
              Batal
            </Button>
          ) : null
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Jabatan">
            <Input
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
          </Field>
          <Field label="Perusahaan">
            <Input
              value={draft.company}
              onChange={(event) => setDraft({ ...draft, company: event.target.value })}
            />
          </Field>
          <Field label="Periode">
            <Input
              value={draft.date}
              onChange={(event) => setDraft({ ...draft, date: event.target.value })}
              placeholder="2024 - Present"
            />
          </Field>
          <Field label="Urutan">
            <Input
              type="number"
              value={draft.sortOrder}
              onChange={(event) =>
                setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })
              }
            />
          </Field>
        </div>
        <ListEditor
          label="Achievements"
          items={draft.achievements}
          onChange={(achievements) => setDraft({ ...draft, achievements })}
          placeholder="achievement"
        />
        <Button type="button" onClick={saveDraft} disabled={saving}>
          {saving ? 'Menyimpan...' : editingId ? 'Update Experience' : 'Tambah Experience'}
        </Button>
      </AdminCard>

      <AdminCard title="Daftar Experience" description={`${items.length} item`}>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {item.company} · {item.date}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(item.id ?? null)
                    setDraft(item)
                  }}
                >
                  Edit
                </Button>
                <Button type="button" variant="danger" onClick={() => item.id && remove(item.id)}>
                  Hapus
                </Button>
              </div>
            </div>
          ))}
          {!items.length ? (
            <p className="text-xs text-slate-400">Belum ada experience.</p>
          ) : null}
        </div>
      </AdminCard>
    </div>
  )
}
