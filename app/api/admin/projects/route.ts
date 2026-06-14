import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Admin projects GET failed:', error)
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, slug, description, category, featured } = body

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        category,
        featured: featured ?? false,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Admin projects POST failed:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
