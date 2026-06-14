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
      description:
        'Chatbot berbasis NLP untuk otomasi respons koleksi keuangan, meningkatkan efisiensi operasional dan response rate otomatis.',
      category: 'AI & NLP',
      featured: true,
    },
    {
      slug: 'product-discovery-platform',
      title: 'Product Discovery Platform',
      description:
        'Platform internal untuk mengelola discovery, validasi ide produk, dan prioritas backlog berbasis data pengguna.',
      category: 'Product Strategy',
      featured: true,
    },
    {
      slug: 'operational-dashboard',
      title: 'Operational Dashboard',
      description:
        'Dashboard analitik real-time untuk memantau KPI operasional dan mendukung keputusan produk berbasis metrik.',
      category: 'Data & Analytics',
      featured: false,
    },
    {
      slug: 'ai-assistant-workflow',
      title: 'AI Assistant Workflow',
      description:
        'Orkestrasi workflow AI assistant untuk mendukung tim operasional dengan rekomendasi kontekstual dan otomasi tugas.',
      category: 'AI & NLP',
      featured: true,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        category: project.category,
        featured: project.featured,
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
