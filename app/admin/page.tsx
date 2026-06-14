import type { Metadata } from 'next'
import { AdminCms } from '@/components/admin/admin-cms'

export const metadata: Metadata = {
  title: 'Portfolio CMS',
  description: 'Kelola konten portfolio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminCms />
}
