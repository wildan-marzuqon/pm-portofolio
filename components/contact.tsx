'use client';

import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/wildanmarzuqon',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/wildanmarzuqon',
    },
  ];

  return (
    <footer className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="mb-10 flex items-center gap-3 sm:mb-12 lg:mb-14">
          <div className="h-1 w-12 bg-blue-700" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
            Contact
          </p>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
          Let&apos;s build something impactful together.
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-8 sm:text-lg sm:leading-relaxed lg:mt-10">
          Apakah Anda sedang mencari Product Manager untuk memimpin inisiatif AI, melakukan system analysis, atau sekadar ingin berdiskusi tentang pengembangan produk? Mari terhubung.
        </p>

        {/* Email CTA */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <a
            href="mailto:hello@wildanmarzuqon.com"
            className="group inline-flex items-center gap-3 text-lg font-semibold text-slate-900 transition-all hover:text-blue-700 sm:text-xl lg:text-2xl"
          >
            <Mail size={28} className="text-blue-700 group-hover:scale-110 transition-transform sm:size-8" />
            <span className="relative">
              hello@wildanmarzuqon.com
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-700 transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-16">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">
            Find me elsewhere
          </p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-base font-semibold text-slate-700 transition-all hover:text-blue-700 sm:text-lg"
                aria-label={link.label}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-700 transition-all duration-300 group-hover:w-full" />
                </span>
                <ExternalLink
                  size={18}
                  className="transition-transform group-hover:scale-110 group-hover:-translate-y-1"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-16">
          <p className="text-sm text-slate-500 sm:text-base">
            © 2024 Wildan Marzuqon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;