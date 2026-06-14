export async function GET() {
  return Response.json({
    heading: 'Let\'s build something impactful together.',
    description:
      'Apakah Anda sedang mencari Product Manager untuk memimpin inisiatif AI, melakukan system analysis, atau sekadar ingin berdiskusi tentang pengembangan produk? Mari terhubung.',
    email: 'hello@wildanmarzuqon.com',
    socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/wildanmarzuqon' },
      { label: 'GitHub', href: 'https://github.com/wildanmarzuqon' },
    ],
    copyright: '© 2024 Wildan Marzuqon. All rights reserved.',
  });
}
