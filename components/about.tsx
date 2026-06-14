'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type AboutData = {
  highlights: string[];
  title: string;
  paragraph1: string;
  paragraph2: string;
};

const About = () => {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const response = await fetch('/api/portfolio/about');
        const result = (await response.json()) as AboutData;
        setData(result);
      } catch (error) {
        console.error('Failed to load about data:', error);
      }
    };

    loadAbout();
  }, []);

  if (!data) {
    return (
      <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-slate-500">Loading about content...</p>
        </div>
      </section>
    );
  }

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
              {data.title}
            </h2>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Paragraph 1 */}
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
              {data.paragraph1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
              {data.paragraph2}
            </p>

            {/* Quick Highlights Grid */}
            <div className="grid gap-4 pt-4 sm:gap-6 sm:pt-6">
              {data.highlights.map((highlight, index) => (
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