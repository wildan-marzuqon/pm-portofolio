export async function GET() {
  return Response.json({
    highlights: [
      'MBA Graduate (Focus on UX & Product Value Strategy)',
      'End-to-End AI & Chatbot Product Lifecycle',
      'Data-Driven Analysis & Systems Architecture',
    ],
    title:
      'Bridging the gap between complex AI technology, human user experience, and business strategy.',
    paragraph1:
      'Saya adalah seorang Product Manager dan System Analyst yang berfokus pada pengembangan produk digital berbasis AI, chatbot, dan otomasi proses bisnis. Berpengalaman dalam memimpin tim lintas fungsional dari tahap awal riset hingga produk berhasil diluncurkan ke pasar.',
    paragraph2:
      'Dengan latar belakang akademis magister bisnis (MBA) yang mendalami perilaku pengguna dan analisis nilai produk, saya selalu mengombinasikan pendekatan data-driven dengan empati mendalam terhadap kebutuhan pengguna (user-centered design) untuk menciptakan solusi yang berdampak nyata.',
  });
}
