'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    'MBA Graduate (Focus on UX & Product Value Strategy)',
    'End-to-End AI & Chatbot Product Lifecycle',
    'Data-Driven Analysis & Systems Architecture',
  ];

  return (
    <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="mb-12 flex items-center gap-3 sm:mb-14 lg:mb-16">
          <div className="h-1 w-12 bg-blue-700" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
            About Me
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left Column: Philosophy */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl lg:text-4xl xl:text-4xl">
              Bridging the gap between complex AI technology, human user experience, and business strategy.
            </h2>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Paragraph 1 */}
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
              Saya adalah seorang Product Manager dan System Analyst yang berfokus pada pengembangan produk digital berbasis AI, chatbot, dan otomasi proses bisnis. Berpengalaman dalam memimpin tim lintas fungsional dari tahap awal riset hingga produk berhasil diluncurkan ke pasar.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
              Dengan latar belakang akademis magister bisnis (MBA) yang mendalami perilaku pengguna dan analisis nilai produk, saya selalu mengombinasikan pendekatan data-driven dengan empati mendalam terhadap kebutuhan pengguna (user-centered design) untuk menciptakan solusi yang berdampak nyata.
            </p>

            {/* Quick Highlights Grid */}
            <div className="grid gap-4 pt-4 sm:gap-6 sm:pt-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2
                    size={24}
                    className="mt-0.5 flex-shrink-0 text-blue-700 sm:size-6"
                  />
                  <p className="text-sm font-semibold leading-relaxed text-slate-900 sm:text-base">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;