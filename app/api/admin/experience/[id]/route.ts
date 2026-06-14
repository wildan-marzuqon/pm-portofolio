import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const { id } = await context.params
    const body = await request.json()
    const { title, company, date, achievements, sortOrder } = body

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        company,
        date,
        achievements: achievements ?? [],
        sortOrder: sortOrder ?? 0,
      },
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Admin experience PUT failed:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const { id } = await context.params
    await prisma.experience.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin experience DELETE failed:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
