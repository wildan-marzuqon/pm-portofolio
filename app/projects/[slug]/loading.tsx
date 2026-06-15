export default function ProjectDetailLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
          <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-16">
            <div>
              <div className="h-4 w-28 animate-pulse rounded bg-blue-100" />
              <div className="mt-5 h-14 max-w-3xl animate-pulse rounded bg-slate-200" />
              <div className="mt-4 h-8 max-w-2xl animate-pulse rounded bg-slate-100" />
            </div>
            <div className="grid gap-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-20 animate-pulse rounded-lg border border-slate-200 bg-slate-100" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
