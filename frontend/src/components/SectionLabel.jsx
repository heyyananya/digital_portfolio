import React from 'react';

/** The dark rounded chip that heads each section, e.g. "My Projects". */
export const SectionLabel = ({ children }) => (
  <span
    className="inline-block rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white
               dark:bg-zinc-100 dark:text-zinc-900"
  >
    {children}
  </span>
);
