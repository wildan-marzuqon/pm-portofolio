'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, Input, ListEditor, Textarea, slugify } from './ui'

type ProjectItem = {
  id?: string
  title: string
  slug: string
  subtitle: string
  description: string
  overview: string
  category: string
  context: string
  problem: string
  goals: string[]
  approach: string
  solution: string
  businessImpact: string
  metrics: string[]
  timeline: string
  role: string
  team: string[]
  deliverables: string[]
  tools: string[]
  images: string[]
  documents: string[]
  featured: boolean
  published: boolean
  sortOrder: number
}

const emptyProject: ProjectItem = {
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  overview: '',
  category: '',
  context: '',
  problem: '',
  goals: [],
  approach: '',
  solution: '',
  businessImpact: '',
  metrics: [],
  timeline: '',
  role: '',
  team: [],
  deliverables: [],
  tools: [],
  images: [],
  documents: [],
  featured: false,
  published: true,
  sortOrder: 0,
}

function normalizeProject(project: ProjectItem): ProjectItem {
  return {
    ...emptyProject,
    ...project,
    goals: Array.isArray(project.goals) ? project.goals : [],
    metrics: Array.isArray(project.metrics) ? project.metrics : [],
    team: Array.isArray(project.team) ? project.team : [],
    deliverables: Array.isArray(project.deliverables) ? project.deliverables : [],
    tools: Array.isArray(project.tools) ? project.tools : [],
    images: Array.isArray(project.images) ? project.images : [],
    documents: Array.isArray(project.documents) ? project.documents : [],
    sortOrder: Number.isFinite(Number(project.sortOrder)) ? Number(project.sortOrder) : 0,
  }
}

export function ProjectsEditor() {
  const [items, setItems] = useState<ProjectItem[]>([])
  const [draft, setDraft] = useState<ProjectItem>(emptyProject)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      const data = await adminFetch<ProjectItem[]>('/api/admin/projects')
      setItems(data.map(normalizeProject))
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat projects' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      load(false)
    })
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
        sortOrder: Number.isFinite(Number(draft.sortOrder)) ? Number(draft.sortOrder) : 0,
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
        description="Konten ini akan muncul di card homepage dan halaman detail project."
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
          <Field label="Slug" hint="Dipakai untuk URL /projects/slug.">
            <Input
              value={draft.slug}
              onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })}
            />
          </Field>
          <Field label="Subtitle">
            <Input
              value={draft.subtitle}
              onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })}
              placeholder="Short case-study tagline"
            />
          </Field>
          <Field label="Kategori">
            <Input
              value={draft.category}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              placeholder="AI & NLP"
            />
          </Field>
          <Field label="Timeline">
            <Input
              value={draft.timeline}
              onChange={(event) => setDraft({ ...draft, timeline: event.target.value })}
              placeholder="12 weeks"
            />
          </Field>
          <Field label="Role">
            <Input
              value={draft.role}
              onChange={(event) => setDraft({ ...draft, role: event.target.value })}
              placeholder="Product Manager"
            />
          </Field>
          <Field label="Sort Order">
            <Input
              type="number"
              value={draft.sortOrder}
              onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })}
            />
          </Field>
          <Field label="Visibility">
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
                  className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(event) => setDraft({ ...draft, published: event.target.checked })}
                  className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                />
                Published
              </label>
            </div>
          </Field>
        </div>
        <Field label="Deskripsi Card">
          <Textarea
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
        </Field>
        <Field label="Overview Detail">
          <Textarea
            value={draft.overview}
            onChange={(event) => setDraft({ ...draft, overview: event.target.value })}
            className="min-h-32"
          />
        </Field>
      </AdminCard>

      <AdminCard title="Case Study">
        <Field label="Context">
          <Textarea
            value={draft.context}
            onChange={(event) => setDraft({ ...draft, context: event.target.value })}
            className="min-h-32"
          />
        </Field>
        <Field label="Problem">
          <Textarea
            value={draft.problem}
            onChange={(event) => setDraft({ ...draft, problem: event.target.value })}
            className="min-h-32"
          />
        </Field>
        <ListEditor
          label="Goals"
          items={draft.goals}
          onChange={(goals) => setDraft({ ...draft, goals })}
          placeholder="goal"
        />
        <Field label="Approach">
          <Textarea
            value={draft.approach}
            onChange={(event) => setDraft({ ...draft, approach: event.target.value })}
            className="min-h-32"
          />
        </Field>
        <Field label="Solution">
          <Textarea
            value={draft.solution}
            onChange={(event) => setDraft({ ...draft, solution: event.target.value })}
            className="min-h-32"
          />
        </Field>
      </AdminCard>

      <AdminCard title="Impact & Deliverables">
        <Field label="Business Impact">
          <Textarea
            value={draft.businessImpact}
            onChange={(event) => setDraft({ ...draft, businessImpact: event.target.value })}
            className="min-h-32"
          />
        </Field>
        <ListEditor
          label="Metrics"
          items={draft.metrics}
          onChange={(metrics) => setDraft({ ...draft, metrics })}
          placeholder="metric"
        />
        <ListEditor
          label="Team"
          items={draft.team}
          onChange={(team) => setDraft({ ...draft, team })}
          placeholder="team member"
        />
        <ListEditor
          label="Deliverables"
          items={draft.deliverables}
          onChange={(deliverables) => setDraft({ ...draft, deliverables })}
          placeholder="deliverable"
        />
        <ListEditor
          label="Tools"
          items={draft.tools}
          onChange={(tools) => setDraft({ ...draft, tools })}
          placeholder="tool"
        />
      </AdminCard>

      <AdminCard title="Assets">
        <ListEditor
          label="Image URLs"
          items={draft.images}
          onChange={(images) => setDraft({ ...draft, images })}
          placeholder="image"
        />
        <ListEditor
          label="Documents"
          items={draft.documents}
          onChange={(documents) => setDraft({ ...draft, documents })}
          placeholder="document"
        />
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
                  {!item.published ? (
                    <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      Draft
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-500">
                  {item.category} · {item.slug} · order {item.sortOrder}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(item.id ?? null)
                    setDraft(normalizeProject(item))
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
