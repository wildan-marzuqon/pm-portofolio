'use client';

import React, { useEffect, useState } from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  achievements: string[];
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const response = await fetch('/api/portfolio/experience');
        const result = (await response.json()) as ExperienceItem[];
        setExperiences(result);
      } catch (error) {
        console.error('Failed to load experience data:', error);
      }
    };

    loadExperience();
  }, []);

  if (!experiences.length) {
    return (
      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-slate-500">Loading experience content...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="mb-12 flex items-center gap-3 sm:mb-14 lg:mb-16">
          <div className="h-1 w-12 bg-blue-700" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
            Career Journey
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="transition-all duration-300 hover:bg-slate-50/80 rounded-xl px-0 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10 border-b border-slate-200 last:border-b-0 hover:border-slate-300"
            >
              {/* Desktop: 2-Column Layout */}
              <div className="hidden lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 lg:items-start">
                {/* Left Column: Date */}
                <div className="pt-1">
                  <p className="text-sm font-medium text-slate-500 tracking-wide">
                    {exp.date}
                  </p>
                </div>

                {/* Right Column: Role & Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-blue-700">
                      {exp.company}
                    </p>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3 pt-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base leading-relaxed text-slate-600">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-700 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile & Tablet: Stacked Layout */}
              <div className="space-y-4 lg:hidden">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-blue-700">
                      {exp.company}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-slate-500 sm:text-base">
                    {exp.date}
                  </p>
                </div>

                {/* Achievements */}
                <ul className="space-y-3 pt-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-700 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;