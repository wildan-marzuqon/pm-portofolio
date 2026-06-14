export async function GET() {
  return Response.json({
    badge: 'Product Manager • AI & Digital Products',
    name: 'Wildan Marzuqon',
    headline: 'Building AI-Powered Products and Digital Experiences',
    description:
      'Saya adalah Product Manager yang menjembatani teknologi AI dan kebutuhan pengguna. Berpengalaman mengelola siklus produk end-to-end—mulai dari discovery, NLP & Chatbot development, hingga delivery produk digital yang berdampak nyata.',
    pillars: [
      {
        label: 'Focus',
        title: 'AI Products',
        text: 'Mendesain dan mengembangkan produk yang memanfaatkan teknologi AI untuk solusi nyata.',
      },
      {
        label: 'Strength',
        title: 'End-to-End Delivery',
        text: 'Mengelola proyek dari discovery hingga launch dengan fokus pada impact dan user satisfaction.',
      },
      {
        label: 'Approach',
        title: 'User-Centered',
        text: 'Setiap keputusan produk dimulai dari pemahaman mendalam tentang kebutuhan pengguna.',
      },
    ],
  });
}
