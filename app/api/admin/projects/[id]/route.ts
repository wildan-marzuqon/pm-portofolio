import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, routeContext: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const { id } = await routeContext.params
    const body = await request.json()
    const {
      title,
      slug,
      subtitle,
      description,
      overview,
      category,
      context: projectContext,
      problem,
      goals,
      approach,
      solution,
      businessImpact,
      metrics,
      timeline,
      role,
      team,
      deliverables,
      tools,
      images,
      documents,
      featured,
      published,
      sortOrder,
    } = body

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        subtitle: subtitle ?? '',
        description,
        overview: overview ?? '',
        category,
        context: projectContext ?? '',
        problem: problem ?? '',
        goals: Array.isArray(goals) ? goals : [],
        approach: approach ?? '',
        solution: solution ?? '',
        businessImpact: businessImpact ?? '',
        metrics: Array.isArray(metrics) ? metrics : [],
        timeline: timeline ?? '',
        role: role ?? '',
        team: Array.isArray(team) ? team : [],
        deliverables: Array.isArray(deliverables) ? deliverables : [],
        tools: Array.isArray(tools) ? tools : [],
        images: Array.isArray(images) ? images : [],
        documents: Array.isArray(documents) ? documents : [],
        featured: featured ?? false,
        published: published ?? true,
        sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Admin projects PUT failed:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, routeContext: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const { id } = await routeContext.params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin projects DELETE failed:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
