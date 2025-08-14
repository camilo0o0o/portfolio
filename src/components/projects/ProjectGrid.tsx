'use client';

import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  activeCategory: string;
}

export default function ProjectGrid({ projects, activeCategory }: ProjectGridProps) {
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isVisible={true}
        />
      ))}
    </div>
  );
} 