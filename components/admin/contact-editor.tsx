'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/admin-fetch'
import { AdminCard, Alert, Button, Field, Input, Textarea } from './ui'

type SocialLink = {
  label: string
  href: string
  sortOrder: number
}

type ContactData = {
  heading: string
  description: string
  email: string
  copyright: string
  socialLinks: SocialLink[]
}

const emptyContact: ContactData = {
  heading: '',
  description: '',
  email: '',
  copyright: '',
  socialLinks: [],
}

export function ContactEditor() {
  const [form, setForm] = useState<ContactData>(emptyContact)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetch<ContactData & { socialLinks?: SocialLink[] } | null>(
          '/api/admin/contact',
        )
        if (data) {
          setForm({
            heading: data.heading ?? '',
            description: data.description ?? '',
            email: data.email ?? '',
            copyright: data.copyright ?? '',
            socialLinks: data.socialLinks ?? [],
          })
        }
      } catch (error) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal memuat contact' })
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
      const saved = await adminFetch<ContactData & { socialLinks?: SocialLink[] }>(
        '/api/admin/contact',
        {
          method: 'PUT',
          body: JSON.stringify(form),
        },
      )

      setForm({
        heading: saved.heading,
        description: saved.description,
        email: saved.email,
        copyright: saved.copyright,
        socialLinks: saved.socialLinks ?? [],
      })
      setMessage({ type: 'success', text: 'Contact berhasil disimpan.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Gagal menyimpan contact' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat contact...</p>
  }

  return (
    <div className="space-y-4">
      {message ? <Alert type={message.type} message={message.text} /> : null}

      <AdminCard title="Contact Section">
        <Field label="Heading">
          <Textarea
            value={form.heading}
            onChange={(event) => setForm({ ...form, heading: event.target.value })}
          />
        </Field>
        <Field label="Deskripsi">
          <Textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </Field>
        <Field label="Copyright">
          <Input
            value={form.copyright}
            onChange={(event) => setForm({ ...form, copyright: event.target.value })}
          />
        </Field>
      </AdminCard>

      <AdminCard
        title="Social Links"
        actions={
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setForm({
                ...form,
                socialLinks: [
                  ...form.socialLinks,
                  { label: '', href: '', sortOrder: form.socialLinks.length },
                ],
              })
            }
          >
            + Link
          </Button>
        }
      >
        {form.socialLinks.map((link, index) => (
          <div key={index} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500">Link {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setForm({
                    ...form,
                    socialLinks: form.socialLinks.filter((_, i) => i !== index),
                  })
                }
              >
                Hapus
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Label">
                <Input
                  value={link.label}
                  onChange={(event) => {
                    const socialLinks = [...form.socialLinks]
                    socialLinks[index] = { ...link, label: event.target.value }
                    setForm({ ...form, socialLinks })
                  }}
                />
              </Field>
              <Field label="URL">
                <Input
                  value={link.href}
                  onChange={(event) => {
                    const socialLinks = [...form.socialLinks]
                    socialLinks[index] = { ...link, href: event.target.value }
                    setForm({ ...form, socialLinks })
                  }}
                />
              </Field>
            </div>
          </div>
        ))}
      </AdminCard>

      <Button type="button" onClick={save} disabled={saving}>
        {saving ? 'Menyimpan...' : 'Simpan Contact'}
      </Button>
    </div>
  )
}
