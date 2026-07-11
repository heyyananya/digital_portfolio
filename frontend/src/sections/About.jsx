import React from 'react';
import { GraduationCap, ArrowUpRight, Award } from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';

const STATS = [
  { value: '4', label: 'Projects built' },
  { value: '2', label: 'Shipped to production' },
];

const EDUCATION = [
  {
    institution: 'Pandit Deendayal Energy University (PDEU)',
    url: 'https://pdeu.ac.in/',
    location: 'Gandhinagar, Gujarat',
    degree: 'B.Tech in Information & Communication Technology (ICT)',
    duration: '2024 – Present',
    cgpa: '8.63',
  },
  {
    institution: 'Ganpat University',
    url: 'https://www.ganpatuniversity.ac.in/',
    location: 'Mehsana, Gujarat',
    degree: 'Diploma in Computer Engineering',
    duration: '2021 – 2024',
    cgpa: '9.82',
  },
];

const CERTIFICATES = [
  {
    title: 'Complete Web Development Course',
    issuer: 'Udemy',
    url: 'https://ude.my/UC-089b2fc9-fff2-4d95-8dfe-3649ff5f5735',
    instructor: 'Hitesh Choudhary',
    date: 'May 27, 2026',
    detail: '100 hours of comprehensive full stack web development training.',
    credentialId: 'UC-089b2fc9-fff2-4d95-8dfe-3649ff5f5735',
  },
  {
    title: 'Deep Learning: Essentials for Development',
    issuer: 'Pandit Deendayal Energy University (PDEU) & Soft Computing Research Society',
    url: 'https://pdeu.ac.in/',
    date: 'April 04 – 05, 2025',
    detail: 'Two-Day Workshop organized by the School of Technology (SoT) and the Departments of ICT, ECE, and Mathematics.',
  },
];

export const About = () => (
  <section id="about" className="relative px-5 py-16 sm:px-6 sm:py-24">
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <SectionLabel>About Me</SectionLabel>
        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
          A little about who I am
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-5 text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        <p>
          I'm a full stack developer who likes the parts of the job most people skip. Receipt numbers
          that must restart at 1 every financial year without ever colliding. Prescriptions that have
          to land in exactly the right place on a clinic's own letterhead. Four user roles that each
          see a different truth about the same appointment.
        </p>
        <p>
          My work sits mostly in JavaScript — React and Next.js on the front, Node and Express on the
          back — with PostgreSQL underneath, usually hand-written SQL rather than an ORM. I care about
          schemas that hold up, authentication that isn't an afterthought, and interfaces that stay
          out of the way of the person doing their job.
        </p>
      </div>

      {/* Education Timeline section */}
      <div className="mx-auto mt-16 max-w-2xl">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Education & Credentials
        </h3>
        <div className="mt-6 space-y-4">
          {EDUCATION.map((edu) => (
            <div 
              key={edu.institution} 
              className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <GraduationCap size={20} />
                </div>
                <div className="min-w-0">
                  <a 
                    href={edu.url} 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-display font-semibold text-zinc-950 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition"
                  >
                    {edu.institution}
                    <ArrowUpRight size={14} className="opacity-60" />
                  </a>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                    {edu.degree}
                  </div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {edu.duration} &middot; {edu.location}
                  </div>
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  CGPA: {edu.cgpa}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Workshops section */}
      <div className="mx-auto mt-12 max-w-2xl">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Certifications & Workshops
        </h3>
        <div className="mt-6 space-y-4">
          {CERTIFICATES.map((cert) => (
            <div 
              key={cert.title} 
              className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <span className="font-display font-semibold text-zinc-950 dark:text-zinc-50">
                    {cert.title}
                  </span>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                    {cert.issuer} {cert.instructor && `· Instructor: ${cert.instructor}`}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    {cert.detail}
                  </div>
                  {cert.credentialId && (
                    <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-1.5">
                      Credential ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  {cert.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {STATS.map((stat) => (
          <div key={stat.label} className="card p-6 text-center">
            <div className="font-display text-4xl font-bold tracking-tight">{stat.value}</div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
