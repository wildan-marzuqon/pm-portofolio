// Langkah 3A: Kita 'impor' (panggil) komponennya
import Hero from '../components/hero'
import About from '../components/about'
import Experience from '../components/experience'
import Projects from '../components/projects'
import Contact from '../components/contact'

// Langkah 3B: Ini adalah fungsi utama halamannya
export default function Home() {
  return (
    // Kita hapus p-24, diganti dengan w-full (lebar penuh) dan min-h-screen saja
    <main className="w-full bg-white text-black min-h-screen flex flex-col">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}