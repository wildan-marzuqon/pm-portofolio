'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Compass, Layers3, Sparkles } from 'lucide-react';

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
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="h-80 animate-pulse rounded-lg border border-blue-100 bg-white" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm shadow-blue-100/60">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-700 text-white">
                <Sparkles size={16} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
                About Me
              </p>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {data.title}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
                <Compass size={22} className="text-blue-700" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Direction
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Product clarity
                </p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
                <Layers3 size={22} className="text-blue-700" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Focus
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Useful systems
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/50 sm:p-8 lg:p-10">
            <div className="space-y-6 border-b border-slate-200 pb-8">
              <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                {data.paragraph1}
              </p>

              <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                {data.paragraph2}
              </p>
            </div>

            <div className="grid gap-4 pt-8 sm:grid-cols-2">
              {data.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group flex min-h-28 items-start gap-4 rounded-lg border border-slate-200 bg-slate-50/80 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/70"
                >
                  <span className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-white shadow-sm transition-transform group-hover:scale-105">
                    <CheckCircle2 size={19} />
                  </span>
                  <p className="text-sm font-semibold leading-7 text-slate-900 sm:text-base">
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
