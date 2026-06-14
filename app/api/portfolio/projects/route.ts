import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const rows = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const projects = rows.map((project) => ({
    title: project.title,
    description: project.description,
    badges: [project.category].filter(Boolean),
  }))

  const filters = Array.from(new Set(['All', ...rows.map((project) => project.category).filter(Boolean)]))
  const skills = Array.from(new Set(rows.map((project) => project.category).filter(Boolean)))

  return NextResponse.json({
    filters,
    projects,
    skills,
  })
}