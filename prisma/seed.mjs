import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.NEON_DATABASE_URL ??
  process.env.NEON_URL

if (!connectionString) {
  throw new Error('Database connection string is not configured.')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

const HERO_ID = 'hero-main'
const ABOUT_ID = 'about-main'
const CONTACT_ID = 'contact-main'

async function seedHero() {
  await prisma.heroPillar.deleteMany({ where: { heroId: HERO_ID } })

  await prisma.hero.upsert({
    where: { id: HERO_ID },
    update: {
      badge: 'Product Manager • AI & Digital Products',
      name: 'Wildan Marzuqon',
      headline: 'Building AI-Powered Products and Digital Experiences',
      description:
        'Saya adalah Product Manager yang menjembatani teknologi AI dan kebutuhan pengguna. Berpengalaman mengelola siklus produk end-to-end—mulai dari discovery, NLP & Chatbot development, hingga delivery produk digital yang berdampak nyata.',
    },
    create: {
      id: HERO_ID,
      badge: 'Product Manager • AI & Digital Products',
      name: 'Wildan Marzuqon',
      headline: 'Building AI-Powered Products and Digital Experiences',
      description:
        'Saya adalah Product Manager yang menjembatani teknologi AI dan kebutuhan pengguna. Berpengalaman mengelola siklus produk end-to-end—mulai dari discovery, NLP & Chatbot development, hingga delivery produk digital yang berdampak nyata.',
    },
  })

  await prisma.heroPillar.createMany({
    data: [
      {
        heroId: HERO_ID,
        label: 'Focus',
        title: 'AI Products',
        text: 'Mendesain dan mengembangkan produk yang memanfaatkan teknologi AI untuk solusi nyata.',
        sortOrder: 0,
      },
      {
        heroId: HERO_ID,
        label: 'Strength',
        title: 'End-to-End Delivery',
        text: 'Mengelola proyek dari discovery hingga launch dengan fokus pada impact dan user satisfaction.',
        sortOrder: 1,
      },
      {
        heroId: HERO_ID,
        label: 'Approach',
        title: 'User-Centered',
        text: 'Setiap keputusan produk dimulai dari pemahaman mendalam tentang kebutuhan pengguna.',
        sortOrder: 2,
      },
    ],
  })
}

async function seedAbout() {
  await prisma.about.upsert({
    where: { id: ABOUT_ID },
    update: {
      title:
        'Bridging the gap between complex AI technology, human user experience, and business strategy.',
      paragraph1:
        'Saya adalah seorang Product Manager dan System Analyst yang berfokus pada pengembangan produk digital berbasis AI, chatbot, dan otomasi proses bisnis. Berpengalaman dalam memimpin tim lintas fungsional dari tahap awal riset hingga produk berhasil diluncurkan ke pasar.',
      paragraph2:
        'Dengan latar belakang akademis magister bisnis (MBA) yang mendalami perilaku pengguna dan analisis nilai produk, saya selalu mengombinasikan pendekatan data-driven dengan empati mendalam terhadap kebutuhan pengguna (user-centered design) untuk menciptakan solusi yang berdampak nyata.',
      highlights: [
        'MBA Graduate (Focus on UX & Product Value Strategy)',
        'End-to-End AI & Chatbot Product Lifecycle',
        'Data-Driven Analysis & Systems Architecture',
      ],
    },
    create: {
      id: ABOUT_ID,
      title:
        'Bridging the gap between complex AI technology, human user experience, and business strategy.',
      paragraph1:
        'Saya adalah seorang Product Manager dan System Analyst yang berfokus pada pengembangan produk digital berbasis AI, chatbot, dan otomasi proses bisnis. Berpengalaman dalam memimpin tim lintas fungsional dari tahap awal riset hingga produk berhasil diluncurkan ke pasar.',
      paragraph2:
        'Dengan latar belakang akademis magister bisnis (MBA) yang mendalami perilaku pengguna dan analisis nilai produk, saya selalu mengombinasikan pendekatan data-driven dengan empati mendalam terhadap kebutuhan pengguna (user-centered design) untuk menciptakan solusi yang berdampak nyata.',
      highlights: [
        'MBA Graduate (Focus on UX & Product Value Strategy)',
        'End-to-End AI & Chatbot Product Lifecycle',
        'Data-Driven Analysis & Systems Architecture',
      ],
    },
  })
}

async function seedExperience() {
  await prisma.experience.deleteMany()

  await prisma.experience.createMany({
    data: [
      {
        title: 'AI Product Manager',
        company: 'Tech & AI Solutions Corp',
        date: '2024 - Present',
        achievements: [
          'Memimpin pengembangan end-to-end produk chatbot NLP untuk efisiensi operasional divisi koleksi keuangan, meningkatkan response rate otomatis hingga 40%.',
          'Mengelola product backlog, menyusun PRD (Product Requirement Document), dan berkolaborasi erat dengan tim AI Engineer dan UI/UX Designer.',
        ],
        sortOrder: 0,
      },
      {
        title: 'System Analyst & Project Manager',
        company: 'Digital Transformation Academy',
        date: '2022 - 2024',
        achievements: [
          'Merancang arsitektur sistem dan memvalidasi skema database untuk platform manajemen operasional skala besar.',
          'Memimpin tim developer menggunakan metodologi Agile/Scrum, memastikan delivery proyek 15% lebih cepat dari target lini masa.',
        ],
        sortOrder: 1,
      },
    ],
  })
}

async function seedContact() {
  await prisma.contactSocialLink.deleteMany({ where: { contactId: CONTACT_ID } })

  await prisma.contact.upsert({
    where: { id: CONTACT_ID },
    update: {
      heading: "Let's build something impactful together.",
      description:
        'Apakah Anda sedang mencari Product Manager untuk memimpin inisiatif AI, melakukan system analysis, atau sekadar ingin berdiskusi tentang pengembangan produk? Mari terhubung.',
      email: 'hello@wildanmarzuqon.com',
      copyright: '© 2024 Wildan Marzuqon. All rights reserved.',
    },
    create: {
      id: CONTACT_ID,
      heading: "Let's build something impactful together.",
      description:
        'Apakah Anda sedang mencari Product Manager untuk memimpin inisiatif AI, melakukan system analysis, atau sekadar ingin berdiskusi tentang pengembangan produk? Mari terhubung.',
      email: 'hello@wildanmarzuqon.com',
      copyright: '© 2024 Wildan Marzuqon. All rights reserved.',
    },
  })

  await prisma.contactSocialLink.createMany({
    data: [
      {
        contactId: CONTACT_ID,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/wildanmarzuqon',
        sortOrder: 0,
      },
      {
        contactId: CONTACT_ID,
        label: 'GitHub',
        href: 'https://github.com/wildanmarzuqon',
        sortOrder: 1,
      },
    ],
  })
}

async function seedProjects() {
  const projects = [
    {
      slug: 'nlp-collection-chatbot',
      title: 'NLP Collection Chatbot',
      subtitle: 'Automating borrower conversations with intent-aware NLP flows.',
      description:
        'Chatbot berbasis NLP untuk otomasi respons koleksi keuangan, meningkatkan efisiensi operasional dan response rate otomatis.',
      overview:
        'Produk chatbot yang membantu tim collection menangani percakapan berulang, mengklasifikasikan intent nasabah, dan mengarahkan kasus kompleks ke agent manusia dengan konteks yang lebih lengkap.',
      category: 'AI & NLP',
      context:
        'Tim collection menerima volume percakapan tinggi dari berbagai kanal, sementara sebagian besar pertanyaan dan respons nasabah memiliki pola yang berulang.',
      problem:
        'Agent menghabiskan banyak waktu untuk menangani percakapan dasar, response time tidak konsisten, dan tim sulit melihat pola intent yang paling sering muncul.',
      goals: [
        'Mengurangi beban percakapan repetitif untuk agent collection.',
        'Meningkatkan konsistensi jawaban pada skenario umum.',
        'Menyediakan insight intent nasabah untuk iterasi strategi collection.',
      ],
      approach:
        'Saya memulai dari discovery bersama tim operasional, memetakan conversation journey, menyusun intent taxonomy, lalu memprioritaskan flow berdasarkan volume dan risiko bisnis.',
      solution:
        'Chatbot NLP dengan intent detection, fallback routing, human handoff, dan dashboard ringkas untuk melihat intent, containment rate, serta percakapan yang butuh perbaikan.',
      businessImpact:
        'Membantu tim menangani volume percakapan lebih besar tanpa menambah kapasitas agent secara linear, sekaligus mempercepat respons awal ke nasabah.',
      metrics: ['40% automated response rate uplift', '28% faster first response time', '18 top intents mapped'],
      timeline: '12 weeks, from discovery to controlled rollout',
      role: 'Product Manager',
      team: ['AI Engineer', 'Backend Engineer', 'UI/UX Designer', 'Collection Operations Lead'],
      deliverables: ['Product Requirement Document', 'Intent taxonomy', 'Conversation flow map', 'UAT scenario list', 'Rollout checklist'],
      tools: ['Figma', 'Jira', 'PostgreSQL', 'NLP intent classifier', 'Metabase'],
      images: ['/globe.svg', '/window.svg'],
      documents: ['PRD summary', 'Conversation flow deck', 'UAT checklist'],
      featured: true,
      published: true,
      sortOrder: 0,
    },
    {
      slug: 'product-discovery-platform',
      title: 'Product Discovery Platform',
      subtitle: 'A structured workspace for validating ideas before they enter delivery.',
      description:
        'Platform internal untuk mengelola discovery, validasi ide produk, dan prioritas backlog berbasis data pengguna.',
      overview:
        'Platform internal yang menyatukan ide produk, evidence dari riset, scoring prioritas, dan keputusan go/no-go agar proses discovery lebih transparan.',
      category: 'Product Strategy',
      context:
        'Ide produk datang dari banyak stakeholder dengan format yang berbeda-beda, sehingga diskusi prioritas sering bergantung pada urgency jangka pendek.',
      problem:
        'Tim sulit membandingkan peluang produk secara objektif karena data riset, estimasi effort, dan business value tersebar di banyak dokumen.',
      goals: [
        'Membuat pipeline ide produk yang mudah ditelusuri.',
        'Membantu stakeholder melihat alasan prioritas secara transparan.',
        'Mengurangi ide yang masuk delivery tanpa validasi cukup.',
      ],
      approach:
        'Saya merancang scoring framework berbasis desirability, viability, feasibility, dan strategic fit, lalu menguji alurnya bersama product owner dan business team.',
      solution:
        'Workspace discovery dengan intake form, evidence library, scoring model, status workflow, dan summary yang bisa dipakai untuk product review.',
      businessImpact:
        'Meningkatkan kualitas keputusan prioritas dan membantu tim fokus pada peluang dengan evidence paling kuat.',
      metrics: ['35% shorter prioritization cycle', '4 scoring dimensions standardized', '24 discovery items reviewed in pilot'],
      timeline: '8 weeks, from workflow audit to internal pilot',
      role: 'Product Manager & System Analyst',
      team: ['Product Owner', 'Business Analyst', 'Frontend Engineer', 'Backend Engineer'],
      deliverables: ['Discovery workflow map', 'Scoring framework', 'MVP backlog', 'Admin dashboard spec'],
      tools: ['Figma', 'Notion', 'Jira', 'Google Sheets', 'PostgreSQL'],
      images: ['/window.svg', '/file.svg'],
      documents: ['Discovery framework', 'MVP backlog', 'Stakeholder review notes'],
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      slug: 'operational-dashboard',
      title: 'Operational Dashboard',
      subtitle: 'Real-time operational visibility for faster product decisions.',
      description:
        'Dashboard analitik real-time untuk memantau KPI operasional dan mendukung keputusan produk berbasis metrik.',
      overview:
        'Dashboard operasional yang menggabungkan metrik utama dari beberapa sumber data untuk membantu leadership melihat performa harian dan anomali lebih cepat.',
      category: 'Data & Analytics',
      context:
        'Laporan operasional dibuat manual dari beberapa spreadsheet dan sistem internal, sehingga insight sering terlambat saat kondisi berubah cepat.',
      problem:
        'Tim membutuhkan satu sumber kebenaran untuk KPI operasional, tetapi definisi metrik dan cadence pelaporan belum konsisten.',
      goals: [
        'Menyatukan KPI utama dalam satu dashboard yang mudah dipantau.',
        'Mengurangi pekerjaan manual dalam pelaporan rutin.',
        'Mempercepat deteksi issue operasional yang berdampak ke user.',
      ],
      approach:
        'Saya memfasilitasi metric definition workshop, memvalidasi sumber data, lalu menyusun dashboard hierarchy dari executive summary hingga drill-down operasional.',
      solution:
        'Dashboard real-time dengan KPI cards, trend chart, segment breakdown, dan alert sederhana untuk metrik yang melewati threshold.',
      businessImpact:
        'Mempercepat proses review operasional dan mengurangi waktu yang dihabiskan untuk menyusun laporan manual.',
      metrics: ['60% less manual reporting effort', '12 KPI definitions aligned', 'Daily review time reduced by 30 minutes'],
      timeline: '10 weeks, from metric alignment to dashboard launch',
      role: 'Product Manager',
      team: ['Data Analyst', 'Backend Engineer', 'Operations Manager'],
      deliverables: ['Metric dictionary', 'Dashboard wireframe', 'Data validation checklist', 'Launch training material'],
      tools: ['Metabase', 'PostgreSQL', 'Figma', 'dbt', 'Google Analytics'],
      images: ['/globe.svg', '/file.svg'],
      documents: ['Metric dictionary', 'Dashboard launch guide', 'Data QA checklist'],
      featured: false,
      published: true,
      sortOrder: 2,
    },
    {
      slug: 'ai-assistant-workflow',
      title: 'AI Assistant Workflow',
      subtitle: 'Contextual AI recommendations embedded in daily operational tasks.',
      description:
        'Orkestrasi workflow AI assistant untuk mendukung tim operasional dengan rekomendasi kontekstual dan otomasi tugas.',
      overview:
        'Workflow AI assistant yang memberikan rekomendasi langkah berikutnya, ringkasan konteks, dan template respons untuk membantu tim operasional menyelesaikan tugas lebih cepat.',
      category: 'AI & NLP',
      context:
        'Tim operasional perlu berpindah antar sistem untuk memahami konteks kasus sebelum mengambil keputusan atau mengirim respons ke user.',
      problem:
        'Proses mencari konteks memakan waktu, kualitas rekomendasi antar agent bervariasi, dan knowledge base jarang digunakan karena tidak muncul di momen kerja.',
      goals: [
        'Mengurangi waktu pencarian konteks sebelum agent bertindak.',
        'Membuat rekomendasi operasional lebih konsisten.',
        'Mendorong penggunaan knowledge base di dalam workflow harian.',
      ],
      approach:
        'Saya memetakan task flow agent, mengidentifikasi decision points, lalu mendesain AI prompt dan guardrail bersama engineer agar rekomendasi tetap relevan dan aman.',
      solution:
        'AI assistant workflow dengan context retrieval, recommended next action, response draft, dan feedback loop untuk mengevaluasi kualitas rekomendasi.',
      businessImpact:
        'Membantu agent menyelesaikan kasus lebih cepat dengan konteks yang lebih lengkap, sekaligus memberi data feedback untuk peningkatan knowledge base.',
      metrics: ['22% shorter handling time in pilot', '15 reusable prompt templates', '80% recommendation usefulness score'],
      timeline: '14 weeks, from prototype to pilot rollout',
      role: 'AI Product Manager',
      team: ['AI Engineer', 'Prompt Engineer', 'Operations SME', 'Frontend Engineer'],
      deliverables: ['Workflow blueprint', 'Prompt library', 'Guardrail checklist', 'Pilot evaluation report'],
      tools: ['Figma', 'OpenAI API', 'Jira', 'PostgreSQL', 'LangSmith'],
      images: ['/window.svg', '/globe.svg'],
      documents: ['Workflow blueprint', 'Prompt evaluation sheet', 'Pilot report'],
      featured: true,
      published: true,
      sortOrder: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        overview: project.overview,
        category: project.category,
        context: project.context,
        problem: project.problem,
        goals: project.goals,
        approach: project.approach,
        solution: project.solution,
        businessImpact: project.businessImpact,
        metrics: project.metrics,
        timeline: project.timeline,
        role: project.role,
        team: project.team,
        deliverables: project.deliverables,
        tools: project.tools,
        images: project.images,
        documents: project.documents,
        featured: project.featured,
        published: project.published,
        sortOrder: project.sortOrder,
      },
      create: project,
    })
  }
}

async function main() {
  await seedHero()
  await seedAbout()
  await seedExperience()
  await seedContact()
  await seedProjects()

  console.log('Database seeded successfully.')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
