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
    const { title, slug, description, category, featured } = body

    const project = await prisma.project.update({
      where: { id },
      data: { title, slug, description, category, featured: featured ?? false },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Admin projects PUT failed:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const { id } = await context.params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin projects DELETE failed:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
