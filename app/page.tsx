export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              Product Manager • AI & Digital Products
            </span>

            <div className="space-y-4">
              <p className="text-lg font-medium tracking-[0.25em] text-blue-600 uppercase">
                Wildan Marzuqon
              </p>
              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Building AI-Powered Products and Digital Experiences
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Saya adalah Product Manager yang memiliki pengalaman di bidang AI, chatbot, NLP, dan pengembangan produk digital. Saya berpengalaman mengelola proyek end-to-end, mulai dari discovery hingga delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Contact Me
              </a>
              <a
                href="#certificates"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Certificates
              </a>
            </div>

            <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Focus</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">AI Products</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Strength</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">End-to-End Delivery</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Approach</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">User-Centered</p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Portfolio</p>
              <h2 className="mt-4 text-2xl font-semibold">Product Manager</h2>
              <p className="mt-3 text-blue-50/90">
                Menciptakan solusi digital yang membantu pengguna, tim, dan bisnis tumbuh bersama.
              </p>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">What I do</p>
                <p className="mt-1">Discovery, roadmap, stakeholder alignment, dan product delivery.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Why it matters</p>
                <p className="mt-1">Menghubungkan kebutuhan bisnis, teknologi, dan pengalaman pengguna dalam satu alur.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
