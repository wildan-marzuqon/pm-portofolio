import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const contact = await prisma.contact.findFirst({
      include: {
        socialLinks: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    if (!contact) {
      return NextResponse.json({
        heading: '',
        description: '',
        email: '',
        socialLinks: [],
        copyright: '',
      })
    }

    return NextResponse.json({
      heading: contact.heading,
      description: contact.description,
      email: contact.email,
      socialLinks: contact.socialLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
      copyright: contact.copyright,
    })
  } catch (error) {
    console.error('Failed to load portfolio contact:', error)

    return NextResponse.json({
      heading: '',
      description: '',
      email: '',
      socialLinks: [],
      copyright: '',
    })
  }
}
