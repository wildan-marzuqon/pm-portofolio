'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, Input, Textarea } from './ui'

type HeroPillar = {
  label: string
  title: string
  text: string
  sortOrder: number
}

type HeroData = {
  badge: string
  name: string
  headline: string
  description: string
  pillars: HeroPillar[]
}

const emptyHero: HeroData = {
  badge: '',
  name: '',
  headline: '',
  description: '',
  pillars: [],
}

export function HeroEditor() {
  const [form, setForm] = useState<HeroData>(emptyHero)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetch<HeroData & { pillars?: HeroPillar[] } | null>('/api/admin/hero')
        if (data) {
          setForm({
            badge: data.badge ?? '',
            name: data.name ?? '',
            headline: data.headline ?? '',
            description: data.description ?? '',
            pillars: data.pillars ?? [],
          })
        }
      } catch (error) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat hero' })
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
      const saved = await adminFetch<HeroData & { pillars?: HeroPillar[] }>('/api/admin/hero', {
        method: 'PUT',
        body: JSON.stringify(form),
      })

      setForm({
        badge: saved.badge,
        name: saved.name,
        headline: saved.headline,
        description: saved.description,
        pillars: saved.pillars ?? [],
      })
      setMessage({ type: 'success', text: 'Hero berhasil disimpan.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menyimpan hero' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat hero...</p>
  }

  return (
    <div className="space-y-4">
      {message ? <Alert type={message.type} message={message.text} /> : null}

      <AdminCard title="Hero Section" description="Konten utama di bagian atas portfolio.">
        <Field label="Badge">
          <Input
            value={form.badge}
            onChange={(event) => setForm({ ...form, badge: event.target.value })}
          />
        </Field>
        <Field label="Nama">
          <Input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </Field>
        <Field label="Headline">
          <Textarea
            value={form.headline}
            onChange={(event) => setForm({ ...form, headline: event.target.value })}
          />
        </Field>
        <Field label="Deskripsi">
          <Textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </Field>
      </AdminCard>

      <AdminCard
        title="Pillars"
        description="Tiga poin utama di bawah hero."
        actions={
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setForm({
                ...form,
                pillars: [
                  ...form.pillars,
                  { label: '', title: '', text: '', sortOrder: form.pillars.length },
                ],
              })
            }
          >
            + Pillar
          </Button>
        }
      >
        {form.pillars.map((pillar, index) => (
          <div key={index} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500">Pillar {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setForm({
                    ...form,
                    pillars: form.pillars.filter((_, i) => i !== index),
                  })
                }
              >
                Hapus
              </Button>
            </div>
            <Field label="Label">
              <Input
                value={pillar.label}
                onChange={(event) => {
                  const pillars = [...form.pillars]
                  pillars[index] = { ...pillar, label: event.target.value }
                  setForm({ ...form, pillars })
                }}
              />
            </Field>
            <Field label="Title">
              <Input
                value={pillar.title}
                onChange={(event) => {
                  const pillars = [...form.pillars]
                  pillars[index] = { ...pillar, title: event.target.value }
                  setForm({ ...form, pillars })
                }}
              />
            </Field>
            <Field label="Text">
              <Textarea
                value={pillar.text}
                onChange={(event) => {
                  const pillars = [...form.pillars]
                  pillars[index] = { ...pillar, text: event.target.value }
                  setForm({ ...form, pillars })
                }}
              />
            </Field>
          </div>
        ))}
      </AdminCard>

      <Button type="button" onClick={save} disabled={saving}>
        {saving ? 'Menyimpan...' : 'Simpan Hero'}
      </Button>
    </div>
  )
}
