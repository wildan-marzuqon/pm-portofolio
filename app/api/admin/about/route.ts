import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

const ABOUT_ID = 'about-main'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const about = await prisma.about.findFirst()
    return NextResponse.json(about)
  } catch (error) {
    console.error('Admin about GET failed:', error)
    return NextResponse.json({ error: 'Failed to load about' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, paragraph1, paragraph2, highlights } = body

    const about = await prisma.about.upsert({
      where: { id: ABOUT_ID },
      update: { title, paragraph1, paragraph2, highlights: highlights ?? [] },
      create: {
        id: ABOUT_ID,
        title,
        paragraph1,
        paragraph2,
        highlights: highlights ?? [],
      },
    })

    return NextResponse.json(about)
  } catch (error) {
    console.error('Admin about PUT failed:', error)
    return NextResponse.json({ error: 'Failed to save about' }, { status: 500 })
  }
}
