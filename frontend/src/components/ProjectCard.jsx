import React from 'react';
import { ArrowUpRight, ChevronDown, Github, Globe } from 'lucide-react';
import { ProjectPreview } from './ProjectPreview';

const StatusBadge = ({ status }) =>
  status === 'live' ? (
    <span className="pill border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
      Live
    </span>
  ) : (
    <span className="pill border-dashed">
      <span className="h-1.5 w-1.5 rounded-full border border-zinc-400 dark:border-zinc-600" />
      In Progress
    </span>
  );

export const ProjectCard = ({ project, onOpenDetails }) => {
  const { name, mark, logo, tagline, status, summary, stack, links } = project;
  const primaryLink = links.live || links.source;

  return (
    <article className="card flex flex-col overflow-hidden p-4 transition hover:border-zinc-400 dark:hover:border-zinc-600">
      <div className="relative">
        <ProjectPreview mark={mark} name={name} logo={logo} />

        <div className="absolute right-3 top-3 flex gap-2">
          {links.source && (
            <a
              href={links.source}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white
                         transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              <Github size={13} />
              Source
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white
                         transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              <Globe size={13} />
              Website
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight">{name}</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{tagline}</p>
          </div>
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${name}`}
              className="mt-1 shrink-0 text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ArrowUpRight size={20} />
            </a>
          )}
        </div>

        <div className="mt-3">
          <StatusBadge status={status} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {summary}
        </p>

        <button
          type="button"
          onClick={onOpenDetails}
          className="mt-3 inline-flex w-fit items-center gap-1 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ChevronDown
            size={14}
            className="transition-transform -rotate-90"
          />
          Show more
        </button>

        <div className="mt-6 flex flex-wrap gap-2 pt-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700
                         dark:border-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
