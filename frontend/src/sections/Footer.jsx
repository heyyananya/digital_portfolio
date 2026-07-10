import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import { openEmail } from '../utils/contact';

// The extra bottom padding clears the dock, which is bottom-anchored on mobile.
export const Footer = () => (
  <footer className="border-t border-zinc-200 px-6 pb-28 pt-10 dark:border-zinc-800 sm:pb-10">
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
      <p className="text-center text-sm text-zinc-500 sm:text-left">
        © {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
      </p>

      <div className="flex items-center gap-4 text-zinc-400">
        <button
          type="button"
          onClick={() => openEmail('Hello Ananya')}
          aria-label="Send me an email"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Mail size={17} />
        </button>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Linkedin size={17} />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Github size={17} />
        </a>
      </div>
    </div>
  </footer>
);
