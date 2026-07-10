import React, { useEffect, useState } from 'react';
import { Code2, FolderGit2, Github, Home, Linkedin, Mail, Moon, Sun, User, FileDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/portfolio';
import { openEmail, openWhatsApp } from '../utils/contact';

const SECTIONS = [
  { id: 'top', label: 'Home', icon: Home, always: true },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2, always: true },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const BUTTON =
  'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ' +
  'sm:h-11 sm:w-11 focus-visible:ring-offset-0';

const IDLE =
  'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 ' +
  'border border-zinc-200 dark:border-zinc-800';

const ACTIVE = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900';

const Divider = () => (
  <span
    className="mx-0.5 h-6 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800 sm:mx-1"
    aria-hidden="true"
  />
);

// High-fidelity tooltip wrapper with responsive caret positioning
const Tooltip = ({ label, children, always = true }) => (
  <span className={`group relative flex items-center justify-center ${always ? '' : 'hidden sm:flex'}`}>
    {children}
    {/* Floating tooltip block */}
    <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 scale-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 sm:bottom-auto sm:top-full sm:mb-0 sm:mt-2">
      <span className="relative flex flex-col items-center sm:flex-col-reverse">
        {/* Dark capsule label */}
        <span className="rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-white shadow-md border border-zinc-800/80 dark:bg-zinc-900 whitespace-nowrap">
          {label}
        </span>
        {/* Caret pointing down on mobile, pointing up on desktop */}
        <span className="h-1.5 w-2.5 bg-zinc-950 [clip-path:polygon(0_0,50%_100%,100%_0)] dark:bg-zinc-900 sm:[clip-path:polygon(50%_0,0_100%,100%_100%)]" />
      </span>
    </span>
  </span>
);

export const Dock = ({ theme, onToggleTheme }) => {
  const [active, setActive] = useState('top');

  // Highlight whichever section currently owns the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-auto sm:top-5">
      <nav
        aria-label="Primary"
        className="flex max-w-full items-center gap-0.5 rounded-full border border-zinc-200
                   bg-white/85 px-1.5 py-1.5 shadow-lg shadow-zinc-900/5 backdrop-blur-md
                   sm:gap-1 sm:px-2 sm:py-2
                   dark:border-zinc-800 dark:bg-zinc-950/85 dark:shadow-black/40"
      >
        {SECTIONS.map(({ id, label, icon: Icon, always }) => (
          <Tooltip key={id} label={label} always={always}>
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? 'page' : undefined}
              className={`${BUTTON} ${active === id ? ACTIVE : IDLE}`}
            >
              <Icon size={17} />
            </a>
          </Tooltip>
        ))}

        <Divider />

        <Tooltip label="GitHub">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className={`${BUTTON} ${IDLE} hover:text-zinc-900 dark:hover:text-white`}
          >
            <Github size={18} />
          </a>
        </Tooltip>

        <Tooltip label="LinkedIn">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className={`${BUTTON} ${IDLE} text-[#0A66C2] hover:text-[#0A66C2] dark:text-[#3B9AE1] dark:hover:text-[#3B9AE1]`}
          >
            <Linkedin size={18} />
          </a>
        </Tooltip>

        <Tooltip label="WhatsApp">
          <button
            type="button"
            onClick={() => openWhatsApp()}
            aria-label="Message me on WhatsApp"
            className={`${BUTTON} ${IDLE} text-[#25D366] hover:text-[#25D366] dark:text-[#25D366] dark:hover:text-[#25D366]`}
          >
            <FaWhatsapp size={19} />
          </button>
        </Tooltip>

        <Tooltip label="Email">
          <button
            type="button"
            onClick={() => openEmail('Hello Ananya')}
            aria-label="Send me an email"
            className={`${BUTTON} ${IDLE} text-[#EA580C] hover:text-[#EA580C] dark:text-[#FB923C] dark:hover:text-[#FB923C]`}
          >
            <Mail size={18} />
          </button>
        </Tooltip>

        <Divider />

        <Tooltip label="Resume">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Resume"
            className={`${BUTTON} ${IDLE} text-teal-600 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-400`}
          >
            <FileDown size={18} />
          </a>
        </Tooltip>

        <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={isDark}
            className={`${BUTTON} ${IDLE}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </Tooltip>
      </nav>
    </div>
  );
};
