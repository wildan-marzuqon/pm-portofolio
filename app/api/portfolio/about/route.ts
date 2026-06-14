import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const about = await prisma.about.findFirst()

    if (!about) {
      return NextResponse.json({
        highlights: [],
        title: '',
        paragraph1: '',
        paragraph2: '',
      })
    }

    return NextResponse.json({
      highlights: about.highlights,
      title: about.title,
      paragraph1: about.paragraph1,
      paragraph2: about.paragraph2,
    })
  } catch (error) {
    console.error('Failed to load portfolio about:', error)

    return NextResponse.json({
      highlights: [],
      title: '',
      paragraph1: '',
      paragraph2: '',
    })
  }
}
