import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const rows = await prisma.experience.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(
      rows.map((experience) => ({
        title: experience.title,
        company: experience.company,
        date: experience.date,
        achievements: experience.achievements,
      })),
    )
  } catch (error) {
    console.error('Failed to load portfolio experience:', error)

    return NextResponse.json([])
  }
}
