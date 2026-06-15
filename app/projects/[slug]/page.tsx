import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BriefcaseBusiness, CalendarDays, FileText, Target, Users } from 'lucide-react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

type RouteProps = {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  })
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project || !project.published) {
    return {
      title: 'Project not found',
    }
  }

  return {
    title: `${project.title} | Project Case Study`,
    description: project.description,
  }
}

function DetailSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-slate-200 py-10 sm:py-12">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">{title}</h2>
      <div className="mt-5 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
        {children}
      </div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  const visibleItems = items.filter(Boolean)

  if (!visibleItems.length) return null

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {visibleItems.map((item) => (
        <li key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium leading-7 text-slate-700 shadow-sm">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function ProjectDetailPage({ params }: RouteProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project || !project.published) {
    notFound()
  }

  const stats = [
    { label: 'Timeline', value: project.timeline, icon: CalendarDays },
    { label: 'Role', value: project.role, icon: BriefcaseBusiness },
    { label: 'Team', value: project.team.filter(Boolean).join(', '), icon: Users },
  ].filter((item) => item.value)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to projects
          </Link>

          <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
                {project.category}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.subtitle ? (
                <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600">
                  {project.subtitle}
                </p>
              ) : null}
            </div>

            <div className="grid gap-3">
              {stats.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12 lg:py-16">
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          {project.metrics.filter(Boolean).length ? (
            <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Target size={20} className="text-blue-700" />
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
                  Impact Metrics
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                {project.metrics.filter(Boolean).map((metric) => (
                  <p key={metric} className="rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-800">
                    {metric}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {project.tools.filter(Boolean).length ? (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
                Tools
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.filter(Boolean).map((tool) => (
                  <span key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <article className="rounded-lg border border-slate-200 bg-white px-6 shadow-sm sm:px-8 lg:px-10">
          {project.overview ? (
            <DetailSection title="Overview">
              <p>{project.overview}</p>
            </DetailSection>
          ) : null}

          {project.context ? (
            <DetailSection title="Context">
              <p>{project.context}</p>
            </DetailSection>
          ) : null}

          {project.problem ? (
            <DetailSection title="Problem">
              <p>{project.problem}</p>
            </DetailSection>
          ) : null}

          {project.goals.filter(Boolean).length ? (
            <DetailSection title="Product Goals">
              <BulletList items={project.goals} />
            </DetailSection>
          ) : null}

          {project.approach ? (
            <DetailSection title="Approach">
              <p>{project.approach}</p>
            </DetailSection>
          ) : null}

          {project.solution ? (
            <DetailSection title="Solution">
              <p>{project.solution}</p>
            </DetailSection>
          ) : null}

          {project.businessImpact ? (
            <DetailSection title="Business Impact">
              <p>{project.businessImpact}</p>
            </DetailSection>
          ) : null}

          {project.deliverables.filter(Boolean).length ? (
            <DetailSection title="Deliverables">
              <BulletList items={project.deliverables} />
            </DetailSection>
          ) : null}

          {project.images.filter(Boolean).length ? (
            <DetailSection title="Artifacts">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.images.filter(Boolean).map((image, index) => (
                  <div key={`${image}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                    {/* CMS accepts arbitrary image URLs, so this stays as a plain image element. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`${project.title} artifact ${index + 1}`}
                      className="h-36 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </DetailSection>
          ) : null}

          {project.documents.filter(Boolean).length ? (
            <DetailSection title="Documents">
              <div className="grid gap-3 sm:grid-cols-2">
                {project.documents.filter(Boolean).map((document) => (
                  <div key={document} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <FileText size={18} className="flex-shrink-0 text-blue-700" />
                    <span className="text-sm font-semibold text-slate-800">{document}</span>
                  </div>
                ))}
              </div>
            </DetailSection>
          ) : null}
        </article>
      </section>
    </main>
  )
}
