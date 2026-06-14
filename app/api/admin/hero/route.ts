import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

const HERO_ID = 'hero-main'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const hero = await prisma.hero.findFirst({
      include: {
        pillars: { orderBy: { sortOrder: 'asc' } },
      },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Admin hero GET failed:', error)
    return NextResponse.json({ error: 'Failed to load hero' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { badge, name, headline, description, pillars } = body

    await prisma.hero.upsert({
      where: { id: HERO_ID },
      update: { badge, name, headline, description },
      create: { id: HERO_ID, badge, name, headline, description },
    })

    await prisma.heroPillar.deleteMany({ where: { heroId: HERO_ID } })

    if (Array.isArray(pillars) && pillars.length > 0) {
      await prisma.heroPillar.createMany({
        data: pillars.map(
          (
            pillar: { label: string; title: string; text: string; sortOrder?: number },
            index: number,
          ) => ({
            heroId: HERO_ID,
            label: pillar.label,
            title: pillar.title,
            text: pillar.text,
            sortOrder: pillar.sortOrder ?? index,
          }),
        ),
      })
    }

    const hero = await prisma.hero.findFirst({
      where: { id: HERO_ID },
      include: { pillars: { orderBy: { sortOrder: 'asc' } } },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Admin hero PUT failed:', error)
    return NextResponse.json({ error: 'Failed to save hero' }, { status: 500 })
  }
}
