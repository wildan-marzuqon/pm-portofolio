export async function GET() {
  return Response.json([
    {
      title: 'AI Product Manager',
      company: 'Tech & AI Solutions Corp',
      date: '2024 - Present',
      achievements: [
        'Memimpin pengembangan end-to-end produk chatbot NLP untuk efisiensi operasional divisi koleksi keuangan, meningkatkan response rate otomatis hingga 40%.',
        'Mengelola product backlog, menyusun PRD (Product Requirement Document), dan berkolaborasi erat dengan tim AI Engineer dan UI/UX Designer.',
      ],
    },
    {
      title: 'System Analyst & Project Manager',
      company: 'Digital Transformation Academy',
      date: '2022 - 2024',
      achievements: [
        'Merancang arsitektur sistem dan memvalidasi skema database untuk platform manajemen operasional skala besar.',
        'Memimpin tim developer menggunakan metodologi Agile/Scrum, memastikan delivery proyek 15% lebih cepat dari target lini masa.',
      ],
    },
  ]);
}
