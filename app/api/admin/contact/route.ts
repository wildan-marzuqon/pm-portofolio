import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

const CONTACT_ID = 'contact-main'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const contact = await prisma.contact.findFirst({
      include: {
        socialLinks: { orderBy: { sortOrder: 'asc' } },
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Admin contact GET failed:', error)
    return NextResponse.json({ error: 'Failed to load contact' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { heading, description, email, copyright, socialLinks } = body

    await prisma.contact.upsert({
      where: { id: CONTACT_ID },
      update: { heading, description, email, copyright },
      create: { id: CONTACT_ID, heading, description, email, copyright },
    })

    await prisma.contactSocialLink.deleteMany({ where: { contactId: CONTACT_ID } })

    if (Array.isArray(socialLinks) && socialLinks.length > 0) {
      await prisma.contactSocialLink.createMany({
        data: socialLinks.map(
          (
            link: { label: string; href: string; sortOrder?: number },
            index: number,
          ) => ({
            contactId: CONTACT_ID,
            label: link.label,
            href: link.href,
            sortOrder: link.sortOrder ?? index,
          }),
        ),
      })
    }

    const contact = await prisma.contact.findFirst({
      where: { id: CONTACT_ID },
      include: { socialLinks: { orderBy: { sortOrder: 'asc' } } },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Admin contact PUT failed:', error)
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
  }
}
