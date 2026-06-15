import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthorized, unauthorizedResponse } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse()

  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
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
    const {
      title,
      slug,
      subtitle,
      description,
      overview,
      category,
      context,
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

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        subtitle: subtitle ?? '',
        description,
        overview: overview ?? '',
        category,
        context: context ?? '',
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

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Admin projects POST failed:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
