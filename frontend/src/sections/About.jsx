import React from 'react';
import { SectionLabel } from '../components/SectionLabel';

const STATS = [
  { value: '4', label: 'Projects built' },
  { value: '2', label: 'Shipped to production' },
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

      <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
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
