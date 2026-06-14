'use client'

import { useEffect, useState } from 'react'
import { getAdminToken } from '@/lib/admin-fetch'
import { AdminLogin } from './admin-login'
import { AdminShell, type AdminSection } from './admin-shell'
import { AboutEditor } from './about-editor'
import { ContactEditor } from './contact-editor'
import { ExperienceEditor } from './experience-editor'
import { HeroEditor } from './hero-editor'
import { ProjectsEditor } from './projects-editor'

export function AdminCms() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [section, setSection] = useState<AdminSection>('hero')

  useEffect(() => {
    const checkAuth = async () => {
      if (getAdminToken()) {
        setAuthenticated(true)
        setChecking(false)
        return
      }

      try {
        const response = await fetch('/api/admin/hero')
        if (response.ok) {
          setAuthenticated(true)
        }
      } catch {
        // Require login when admin API is protected.
      } finally {
        setChecking(false)
      }
    }

    checkAuth()
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Memuat CMS...</p>
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />
  }

  return (
    <AdminShell
      active={section}
      onChange={setSection}
      onLogout={() => setAuthenticated(false)}
    >
      {section === 'hero' ? <HeroEditor /> : null}
      {section === 'about' ? <AboutEditor /> : null}
      {section === 'experience' ? <ExperienceEditor /> : null}
      {section === 'projects' ? <ProjectsEditor /> : null}
      {section === 'contact' ? <ContactEditor /> : null}
    </AdminShell>
  )
}
