import React, { useState } from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projects } from '../data/portfolio';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <SectionLabel>My Projects</SectionLabel>
          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
            Check out my latest work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            Two systems running in production and two in active development. Click "Show more" on any card to read
            how it works.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onOpenDetails={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};
