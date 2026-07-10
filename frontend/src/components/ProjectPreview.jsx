import React from 'react';
import { CleanLogo } from './CleanLogo';

/**
 * The project's own logo where one exists, otherwise a monogram plate.
 * Either way it sits beside a faux dashboard window so the grid stays consistent.
 */
export const ProjectPreview = ({ mark, name, logo }) => (
  <div
    className="relative flex h-52 items-center justify-center sm:justify-start gap-5 overflow-hidden rounded-xl border border-zinc-200
               bg-zinc-50 px-6 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div className="dot-grid absolute inset-0 opacity-50" aria-hidden="true" />

    <div
      className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-zinc-200/60 blur-2xl dark:bg-zinc-800/60"
      aria-hidden="true"
    />

    {logo ? (
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800">
        <CleanLogo
          src={logo}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
        />
      </div>
    ) : (
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-zinc-100">
        <span className="font-display text-2xl font-bold text-white dark:text-zinc-900">{mark}</span>
      </div>
    )}

    {/* Faux browser dashboard mockup on the right */}
    <div className="relative hidden flex-1 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:block">
      <div className="mb-3 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
      <div className="space-y-2" aria-hidden="true">
        <div className="h-2 w-3/4 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-2 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-3 flex gap-2" aria-hidden="true">
        <div className="h-8 flex-1 rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-8 flex-1 rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-8 flex-1 rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  </div>
);
