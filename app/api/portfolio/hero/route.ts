import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      include: {
        pillars: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    if (!hero) {
      return NextResponse.json({
        badge: '',
        name: '',
        headline: '',
        description: '',
        pillars: [],
      })
    }

    return NextResponse.json({
      badge: hero.badge,
      name: hero.name,
      headline: hero.headline,
      description: hero.description,
      pillars: hero.pillars.map((pillar) => ({
        label: pillar.label,
        title: pillar.title,
        text: pillar.text,
      })),
    })
  } catch (error) {
    console.error('Failed to load portfolio hero:', error)

    return NextResponse.json({
      badge: '',
      name: '',
      headline: '',
      description: '',
      pillars: [],
    })
  }
}
