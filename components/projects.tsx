'use client';

import React, { useEffect, useState } from 'react';

type ProjectItem = {
  title: string;
  description: string;
  badges: string[];
};

type ProjectsData = {
  filters: string[];
  projects: ProjectItem[];
  skills: string[];
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [data, setData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/portfolio/projects');
        const result = await response.json();

        const normalizedData = Array.isArray(result)
          ? {
              filters: ['All'],
              projects: result.map((project: ProjectItem) => ({
                title: project.title ?? 'Untitled Project',
                description: project.description ?? '',
                badges: Array.isArray(project.badges) ? project.badges : [],
              })),
              skills: [],
            }
          : {
              filters: Array.isArray(result?.filters) ? result.filters : ['All'],
              projects: Array.isArray(result?.projects) ? result.projects : [],
              skills: Array.isArray(result?.skills) ? result.skills : [],
            };

        setData(normalizedData as ProjectsData);
      } catch (error) {
        console.error('Failed to load projects data:', error);
      }
    };

    loadProjects();
  }, []);

  if (!data) {
    return (
      <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-slate-500">Loading projects content...</p>
        </div>
      </section>
    );
  }

  const filteredProjects =
    activeFilter === 'All'
      ? data.projects
      : data.projects.filter((project) => project.badges.includes(activeFilter));

  return (
    <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="mb-12 flex items-center gap-3 sm:mb-14 lg:mb-16">
          <div className="h-1 w-12 bg-blue-700" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
            Featured Projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 sm:mb-10">
          {['All', ...data.filters.filter((filter) => filter !== 'All')].map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all sm:px-5 sm:py-2.5 sm:text-base ${
                  isActive
                    ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 lg:gap-10 mb-16 sm:mb-20 lg:mb-24">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-lg sm:p-10 lg:p-12"
            >
              {/* Project Title */}
              <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700 sm:text-2xl lg:text-2xl">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="mt-4 leading-relaxed text-slate-600 sm:text-lg sm:mt-5 lg:mt-6">
                {project.description}
              </p>

              {/* Badge Tags */}
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                {project.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-slate-200 sm:my-16 lg:my-20" />

        {/* Core Skills & Tools Section */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-base">
              Core Skills & Tools
            </p>
          </div>

          {/* Skills Badge Grid */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-2.5 sm:text-base"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;