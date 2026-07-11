import React from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { ScrollReveal } from '../components/ScrollReveal';
import { skillGroups } from '../data/portfolio';

export const Skills = () => (
  <section id="skills" className="relative px-5 py-16 sm:px-6 sm:py-24">
    <div className="mx-auto max-w-5xl">
      <ScrollReveal>
        <div className="text-center">
          <SectionLabel>My Stack</SectionLabel>
          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
            Tools I reach for
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            The technologies behind the projects below — chosen because the problem asked for them, not
            because they were trending.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <ScrollReveal key={group.title} delay={index * 100}>
            <div className="card p-6 h-full">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700
                               dark:border-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
