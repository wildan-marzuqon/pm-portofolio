'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, Input, Textarea, slugify } from './ui'

type ProjectItem = {
  id?: string
  title: string
  slug: string
  description: string
  category: string
  featured: boolean
}

const emptyProject: ProjectItem = {
  title: '',
  slug: '',
  description: '',
  category: '',
  featured: false,
}

export function ProjectsEditor() {
  const [items, setItems] = useState<ProjectItem[]>([])
  const [draft, setDraft] = useState<ProjectItem>(emptyProject)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminFetch<ProjectItem[]>('/api/admin/projects')
      setItems(data)
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat projects' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetDraft = () => {
    setDraft(emptyProject)
    setEditingId(null)
  }

  const saveDraft = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const payload = {
        ...draft,
        slug: draft.slug || slugify(draft.title),
      }

      if (editingId) {
        await adminFetch(`/api/admin/projects/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setMessage({ type: 'success', text: 'Project diperbarui.' })
      } else {
        await adminFetch('/api/admin/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage({ type: 'success', text: 'Project ditambahkan.' })
      }

      resetDraft()
      await load()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menyimpan project' })
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Hapus project ini?')) return

    try {
      await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      setMessage({ type: 'success', text: 'Project dihapus.' })
      if (editingId === id) resetDraft()
      await load()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menghapus project' })
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat projects...</p>
  }

  return (
    <div className="space-y-4">
      {message ? <Alert type={message.type} message={message.text} /> : null}

      <AdminCard
        title={editingId ? 'Edit Project' : 'Tambah Project'}
        actions={
          editingId ? (
            <Button type="button" variant="ghost" onClick={resetDraft}>
              Batal
            </Button>
          ) : null
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Judul">
            <Input
              value={draft.title}
              onChange={(event) => {
                const title = event.target.value
                setDraft({
                  ...draft,
                  title,
                  slug: editingId ? draft.slug : slugify(title),
                })
              }}
            />
          </Field>
          <Field label="Slug" hint="URL-friendly identifier, harus unik.">
            <Input
              value={draft.slug}
              onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })}
            />
          </Field>
          <Field label="Kategori">
            <Input
              value={draft.category}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              placeholder="AI & NLP"
            />
          </Field>
          <Field label="Featured">
            <label className="flex items-center gap-2 pt-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
                className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
              />
              Tampilkan sebagai featured
            </label>
          </Field>
        </div>
        <Field label="Deskripsi">
          <Textarea
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
        </Field>
        <Button type="button" onClick={saveDraft} disabled={saving}>
          {saving ? 'Menyimpan...' : editingId ? 'Update Project' : 'Tambah Project'}
        </Button>
      </AdminCard>

      <AdminCard title="Daftar Projects" description={`${items.length} item`}>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                  {item.featured ? (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      Featured
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-500">
                  {item.category} · {item.slug}
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
            <p className="text-xs text-slate-400">Belum ada project.</p>
          ) : null}
        </div>
      </AdminCard>
    </div>
  )
}
