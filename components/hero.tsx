'use client';

import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-6 py-16 sm:px-8 lg:px-12">
        {/* Top Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 sm:mb-10">
          <span className="text-sm font-semibold text-blue-700 sm:text-base">
            Product Manager • AI & Digital Products
          </span>
        </div>

        {/* Name */}
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-blue-500 sm:text-base sm:mb-3">
          Wildan Marzuqon
        </p>

        {/* Main Headline */}
        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl lg:mb-8 xl:text-7xl">
          Building AI-Powered Products and Digital Experiences
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:mb-12 lg:text-lg">
          Saya adalah Product Manager yang menjembatani teknologi AI dan kebutuhan pengguna. Berpengalaman mengelola siklus produk end-to-end—mulai dari discovery, NLP & Chatbot development, hingga delivery produk digital yang berdampak nyata.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:gap-4 lg:mb-20">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-800 hover:shadow-lg sm:px-8 sm:py-4 lg:px-10"
          >
            View Projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => window.open('#resume', '_blank')}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:px-8 sm:py-4 lg:px-10"
          >
            Download Resume
            <Download size={18} />
          </button>
        </div>

        {/* Core Pillars */}
        <div className="w-full">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Pillar 1: Focus */}
            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-6 transition-all hover:border-blue-200 hover:shadow-md sm:p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 sm:text-sm">
                Focus
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl lg:mt-3">
                AI Products
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Mendesain dan mengembangkan produk yang memanfaatkan teknologi AI untuk solusi nyata.
              </p>
            </div>

            {/* Pillar 2: Strength */}
            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-6 transition-all hover:border-blue-200 hover:shadow-md sm:p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 sm:text-sm">
                Strength
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl lg:mt-3">
                End-to-End Delivery
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Mengelola proyek dari discovery hingga launch dengan fokus pada impact dan user satisfaction.
              </p>
            </div>

            {/* Pillar 3: Approach */}
            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-6 transition-all hover:border-blue-200 hover:shadow-md sm:p-7 lg:p-8 sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 sm:text-sm">
                Approach
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl lg:mt-3">
                User-Centered
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Setiap keputusan produk dimulai dari pemahaman mendalam tentang kebutuhan pengguna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;