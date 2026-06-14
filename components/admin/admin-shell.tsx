'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { clearAdminToken } from '@/lib/admin-fetch'
import { Button } from './ui'

export type AdminSection = 'hero' | 'about' | 'experience' | 'projects' | 'contact'

const sections: { id: AdminSection; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function AdminShell({
  active,
  onChange,
  onLogout,
  children,
}: {
  active: AdminSection
  onChange: (section: AdminSection) => void
  onLogout: () => void
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">
              Portfolio CMS
            </p>
            <h1 className="text-base font-bold text-slate-900">Kelola Konten</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              Lihat Site
            </Link>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearAdminToken()
                onLogout()
              }}
            >
              <LogOut size={14} />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[180px_1fr]">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((section) => {
              const isActive = active === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onChange(section.id)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {section.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="min-w-0 space-y-4">{children}</main>
      </div>
    </div>
  )
}
