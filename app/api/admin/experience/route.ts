import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Admin experience GET failed:', error)
    return NextResponse.json({ error: 'Failed to load experience' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, company, date, achievements, sortOrder } = body

    const count = await prisma.experience.count()

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        date,
        achievements: achievements ?? [],
        sortOrder: sortOrder ?? count,
      },
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Admin experience POST failed:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
