'use client';

import React from 'react';

const Experience = () => {
  const experiences = [
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
  ];

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